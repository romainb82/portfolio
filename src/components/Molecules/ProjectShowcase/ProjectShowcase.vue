<template>
    <article class="project-showcase" ref="showcaseRef">
        <!-- Editorial header -->
        <header class="project-header">
            <div class="project-meta">
                <span class="project-num">N°{{ props.number || '00' }}</span>
                <span class="project-divider"></span>
                <span class="project-stack">
                    <span v-for="(tech, i) in props.technologies" :key="tech">
                        {{ tech }}<span v-if="i < props.technologies.length - 1" class="sep"> · </span>
                    </span>
                </span>
            </div>
            <h2 class="project-title">
                <span class="serif italic">{{ props.title }}</span>
                <a class="visit-btn" :href="props.link" target="_blank" rel="noopener noreferrer">
                    {{ $t('projects.visit') }}
                    <MoveUpRight class="visit-arrow" />
                </a>
            </h2>
        </header>

        <!-- Description -->
        <p class="project-description serif" v-html="props.description"></p>

        <!-- Image grid : chaque image s'ouvre en grand -->
        <div class="showcase-grid">
            <button v-for="(img, i) in gallery" :key="img.label" type="button" class="cell" :class="img.cellClass"
                :aria-label="$t('lightbox.open', { label: img.label })" @click="openAt(i)">
                <picture v-if="i === 0">
                    <source media="(max-width: 970px)" :srcset="props.mobileImage || props.mainImage" />
                    <img :src="img.src" :alt="img.alt" loading="lazy" decoding="async">
                </picture>
                <img v-else :src="img.src" :alt="img.alt" loading="lazy" decoding="async">
                <span class="cell-label mono" aria-hidden="true">{{ img.label }}</span>
                <span class="cell-zoom" aria-hidden="true">
                    <Maximize2 />
                </span>
            </button>
        </div>

        <Lightbox v-model:open="lightboxOpen" :images="gallery" :start-index="lightboxIndex" :title="props.title" />
    </article>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Maximize2, MoveUpRight } from 'lucide-vue-next';
import Lightbox, { type LightboxImage } from '@/components/Molecules/Lightbox/Lightbox.vue';

const props = defineProps({
    title: { type: String, required: true },
    technologies: { type: Array as PropType<string[]>, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, required: true },
    mobileImage: { type: String, default: '' },
    secondImage: { type: String, default: '' },
    thirdImage: { type: String, default: '' },
    link: { type: String, required: true },
    number: { type: String, default: '' },
    reverse: { type: Boolean, default: false },
});

gsap.registerPlugin(ScrollTrigger)

const showcaseRef = ref<HTMLElement | null>(null);
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

type GalleryImage = LightboxImage & { cellClass: string }

const gallery = computed<GalleryImage[]>(() => [
    { src: props.mainImage, alt: `${props.title} — desktop / index`, label: 'desktop / index', cellClass: 'cell-main' },
    { src: props.mobileImage || props.mainImage, alt: `${props.title} — mobile / responsive`, label: 'mobile / responsive', cellClass: 'cell-mobile' },
    { src: props.secondImage || props.mainImage, alt: `${props.title} — desktop / detail-01`, label: 'desktop / detail-01', cellClass: 'cell-second' },
    { src: props.thirdImage || props.mainImage, alt: `${props.title} — desktop / detail-02`, label: 'desktop / detail-02', cellClass: 'cell-third' },
])

const openAt = (index: number) => {
    lightboxIndex.value = index
    lightboxOpen.value = true
}

onMounted(() => {
    if (!showcaseRef.value) return

    const ctx = gsap.context(() => {
        gsap.from(showcaseRef.value!.querySelectorAll('.cell'), {
            opacity: 0,
            y: 30,
            scale: 0.97,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: showcaseRef.value,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        })
    }, showcaseRef)

    onUnmounted(() => ctx.revert())
})
</script>

<style scoped lang="scss">
.project-showcase {
    width: 100%;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: var(--ink);
    }

    @media screen and (max-width: 768px) {
        padding: 20px;
    }
}

.serif { font-family: 'Instrument Serif', serif; }
.mono { font-family: 'Fira Code', monospace; }
.italic { font-style: italic; }

/* ── Editorial project header ── */
.project-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);

    .project-meta {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--graphite);

        .project-num {
            color: var(--terracotta);
            font-weight: 500;
        }

        .project-divider {
            display: inline-block;
            width: 24px;
            height: 1px;
            background: var(--graphite);
        }

        .project-stack {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 2px;

            .sep {
                color: var(--terracotta);
                margin: 0 4px;
            }
        }
    }

    .project-title {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;

        .serif {
            font-size: clamp(40px, 5.5vw, 76px);
            font-weight: 400;
            line-height: 0.95;
            letter-spacing: -0.03em;
            color: var(--ink);
        }
    }
}

.visit-btn {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: 1px solid var(--ink);
    background: var(--paper);
    border-radius: 999px;
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink);
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, gap 0.25s ease;

    .visit-arrow {
        width: 14px;
        height: 14px;
        transition: transform 0.25s ease;
    }

    &:hover {
        background: var(--ink);
        color: var(--cream);
        transform: translate(-2px, -2px);
        box-shadow: 3px 3px 0 var(--terracotta);
        gap: 12px;

        .visit-arrow {
            transform: translate(2px, -2px);
        }
    }
}

.project-description {
    font-size: clamp(18px, 1.5vw, 22px);
    line-height: 1.45;
    color: var(--ink);
    font-style: italic;
    max-width: 720px;

    :deep(b) {
        color: var(--terracotta);
        font-weight: 400;
    }
}

/* ── Image showcase grid ── */
.showcase-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(140px, auto);
    gap: 12px;

    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr 1fr;
    }
}

.cell {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    text-align: left;
    font: inherit;
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    cursor: zoom-in;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus-visible {
        outline: 2px solid var(--terracotta);
        outline-offset: 3px;
        border-color: var(--terracotta);
    }

    .cell-zoom {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--cream);
        border: 1px solid var(--border);
        color: var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(-4px) scale(0.9);
        transition: opacity 0.25s ease, transform 0.25s ease;

        svg {
            width: 14px;
            height: 14px;
        }
    }

    /* Sur écran tactile (pas de hover) : affordances toujours visibles */
    @media (hover: none) {
        .cell-label,
        .cell-zoom {
            opacity: 1;
            transform: none;
        }
    }

    picture,
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    .cell-label {
        position: absolute;
        bottom: 8px;
        left: 8px;
        background: var(--ink);
        color: var(--cream);
        font-size: 9px;
        padding: 3px 7px;
        border-radius: 2px;
        text-transform: lowercase;
        letter-spacing: 0.05em;
        opacity: 0;
        transition: opacity 0.25s ease;
    }

    &:hover,
    &:focus-visible {
        border-color: var(--terracotta);
        box-shadow: 3px 3px 0 var(--terracotta);

        img {
            transform: scale(1.04);
        }

        .cell-label,
        .cell-zoom {
            opacity: 1;
            transform: none;
        }
    }
}

.cell-main {
    grid-column: span 4;
    grid-row: span 2;

    @media screen and (max-width: 900px) {
        grid-column: span 3;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 2;
        grid-row: span 1;
        aspect-ratio: 16 / 10;
    }
}

.cell-mobile {
    grid-column: span 2;
    grid-row: span 3;

    @media screen and (max-width: 900px) {
        grid-column: span 1;
        grid-row: span 2;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 1;
        grid-row: span 2;
        aspect-ratio: 3 / 5;
    }
}

.cell-second {
    grid-column: span 2;
    grid-row: span 1;

    @media screen and (max-width: 900px) {
        grid-column: span 2;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 1;
        aspect-ratio: 4 / 3;
    }
}

.cell-third {
    grid-column: span 2;
    grid-row: span 1;

    @media screen and (max-width: 900px) {
        grid-column: span 2;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 1;
        aspect-ratio: 4 / 3;
    }
}
</style>

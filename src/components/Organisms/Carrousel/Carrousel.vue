<template>
    <div ref="wrapperRef" class="carousel-wrapper" :class="{ 'is-animating': isAnimating }" role="region"
        :aria-label="$t('nav.projects')" aria-roledescription="carousel">
        <div class="carousel-container" @pointerdown="onPointerDown" @pointerup="onPointerUp"
            @pointercancel="onPointerCancel">
            <div ref="trackRef" class="carousel" :style="carouselStyle">
                <div v-for="(slide, vIndex) in renderSlides" :key="slide.key" class="carousel-item"
                    :class="{ active: vIndex === activeIndex }" :aria-hidden="vIndex !== activeIndex"
                    :style="{ width: ITEM_WIDTH + 'px', marginRight: vIndex === renderSlides.length - 1 ? 0 : ITEM_GAP + 'px' }"
                    @click="onItemClick(vIndex)">

                    <div class="item-image">
                        <picture>
                            <source media="(max-width: 768px)" :srcset="slide.imageMobile" />
                            <img :src="slide.image" :alt="$t(slide.title)" :loading="vIndex === activeIndex ? 'eager' : 'lazy'"
                                decoding="async" draggable="false" />
                        </picture>
                    </div>

                    <div class="item-content">
                        <h2>{{ $t(slide.title) }}</h2>
                        <p>{{ $t(slide.description) }}</p>
                        <div class="flex flex-row items-end justify-start gap-[10px] w-[80%]">
                            <a class="slide-btn" :href="slide.link" target="_blank" rel="noopener noreferrer"
                                :tabindex="vIndex === activeIndex ? 0 : -1" @click.stop>{{ $t('carousel.btn') }}</a>
                            <a class="slide-btn" :href="slide.link" target="_blank" rel="noopener noreferrer"
                                :aria-label="$t('carousel.btn') + ' — ' + $t(slide.title)"
                                :tabindex="vIndex === activeIndex ? 0 : -1" @click.stop>
                                <MoveRight />
                            </a>
                        </div>
                    </div>

                    <div class="item-content-inactive">
                        <h2>{{ $t(slide.title) }}</h2>
                        <p>{{ $t(slide.description) }}</p>
                        <div class="flex flex-row items-end justify-start gap-[10px] w-[80%]">
                            <a class="slide-btn" :href="slide.link" target="_blank" rel="noopener noreferrer" tabindex="-1"
                                @click.stop>{{ $t('carousel.btn') }}</a>
                            <a class="slide-btn" :href="slide.link" target="_blank" rel="noopener noreferrer" tabindex="-1"
                                :aria-label="$t('carousel.btn') + ' — ' + $t(slide.title)" @click.stop>
                                <MoveRight />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="nav-arrow prev-arrow" :aria-label="$t('carouselNav.prev')" @click="prev">
            <span aria-hidden="true">&#x2190;</span>
        </button>
        <button type="button" class="nav-arrow next-arrow" :aria-label="$t('carouselNav.next')" @click="next">
            <span aria-hidden="true">&#x2192;</span>
        </button>

        <div class="pagination-dots">
            <button v-for="(slide, index) in slides" :key="slide.id" type="button"
                :class="{ active: index === realIndex }" :aria-label="$t('carouselNav.goTo', { n: index + 1 })"
                :aria-current="index === realIndex ? 'true' : undefined" @click="goToReal(index)"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { MoveRight } from "lucide-vue-next";
import gsap from "gsap";
import { prefersReducedMotion } from '@/composables/useScrollTo'

const slides = ref([
    {
        id: 1,
        title: "carousel.slide1.title",
        description: "carousel.slide1.description",
        image: "/projects/goudronnage-occitanie.jpg",
        imageMobile: "/projects/goudronnage-occitanie-mobile.jpg",
        link: "https://goudronnage-occitanie.onrender.com"
    },
    {
        id: 2,
        title: "carousel.slide2.title",
        description: "carousel.slide2.description",
        image: "/projects/blog-maitresse.jpg",
        imageMobile: "/projects/blog-maitresse-mobile.jpg",
        link: "https://blog-maitresse.vercel.app"
    },
    {
        id: 3,
        title: "carousel.slide3.title",
        description: "carousel.slide3.description",
        image: "/projects/portfolio.jpg",
        imageMobile: "/projects/portfolio-mobile.jpg",
        link: "https://portfolio-romain-bessede.vercel.app"
    },
]);

/* ── Boucle infinie ───────────────────────────────────────────────
   On rend 3 copies des slides (A B C | A B C | A B C) et on navigue
   toujours dans la copie du milieu. Quand l'index actif sort de cette
   copie, on le "téléporte" sans animation sur l'équivalent au centre.
   Résultat : le dernier projet est toujours visible à gauche du
   premier, et le premier à droite du dernier.                        */
const COPIES = 3
const n = computed(() => slides.value.length)
const renderSlides = computed(() =>
    Array.from({ length: COPIES }, (_, copy) =>
        slides.value.map(s => ({ ...s, key: `${copy}-${s.id}` }))
    ).flat()
)

const wrapperRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

/* Index virtuel (dans renderSlides). Démarre sur la 2e slide de la copie centrale. */
const activeIndex = ref(n.value + 1);
const realIndex = computed(() => ((activeIndex.value % n.value) + n.value) % n.value)
const windowWidth = ref(0);
const isAnimating = ref(false);
let isTeleporting = false

const AUTOPLAY_DELAY = 5000;
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const ITEM_GAP = 20;
const ITEM_WIDTH = computed(() => {
    if (windowWidth.value <= 768) return windowWidth.value - 40;
    return 650;
});
const totalItemWidth = computed(() => ITEM_WIDTH.value + ITEM_GAP)
const carouselStyle = computed(() => ({
    width: (renderSlides.value.length * totalItemWidth.value - ITEM_GAP) + "px",
    marginLeft: `calc(50% - ${ITEM_WIDTH.value / 2}px)`,
}));

const items = () => (trackRef.value ? Array.from(trackRef.value.querySelectorAll('.carousel-item')) : [])

const next = () => {
    if (isAnimating.value) return;
    stopAutoplay();
    activeIndex.value += 1
};
const prev = () => {
    if (isAnimating.value) return;
    stopAutoplay();
    activeIndex.value -= 1
};
/* Va vers une slide réelle en prenant le chemin le plus court */
const goToReal = (index: number) => {
    if (isAnimating.value || index === realIndex.value) return;
    stopAutoplay();
    let diff = index - realIndex.value
    if (diff > n.value / 2) diff -= n.value
    if (diff < -n.value / 2) diff += n.value
    activeIndex.value += diff
};
const onItemClick = (vIndex: number) => {
    if (vIndex === activeIndex.value || isAnimating.value) return
    stopAutoplay()
    activeIndex.value = vIndex
}

const startAutoplay = () => {
    if (autoplayInterval || prefersReducedMotion()) return;
    autoplayInterval = setInterval(() => {
        if (!isAnimating.value && !document.hidden) activeIndex.value += 1
    }, AUTOPLAY_DELAY);
};
const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};

/* ── Swipe tactile ── */
let pointerStartX: number | null = null
const onPointerDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    pointerStartX = e.clientX
}
const onPointerUp = (e: PointerEvent) => {
    if (pointerStartX === null) return
    const dx = e.clientX - pointerStartX
    pointerStartX = null
    if (Math.abs(dx) < 40) return
    dx < 0 ? next() : prev()
}
const onPointerCancel = () => { pointerStartX = null }

/* État visuel d'une slide : contenu actif visible ou carte "inactive" */
function setSlideState(el: Element, active: boolean) {
    const content = el.querySelectorAll('.item-content > *');
    const inactive = el.querySelector('.item-content-inactive');
    gsap.killTweensOf([content, inactive]);
    gsap.set(content, { opacity: active ? 1 : 0, y: 0 });
    gsap.set(inactive, { opacity: active ? 0 : 1 });
}
function syncAllStates() {
    items().forEach((el, i) => setSlideState(el, i === activeIndex.value))
}

function animateSlideTransition(newSlideEl: Element | undefined, oldSlideEl: Element | undefined) {
    if (newSlideEl) {
        const contentElements = newSlideEl.querySelectorAll('.item-content > *');
        const inactiveContent = newSlideEl.querySelector('.item-content-inactive');
        const image = newSlideEl.querySelector('.item-image img');

        gsap.killTweensOf([contentElements, inactiveContent, image]);
        gsap.set(inactiveContent, { opacity: 0 });
        gsap.set(contentElements, { opacity: 0, y: 30 });
        gsap.to(contentElements, {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
            delay: 0.5, ease: 'power3.out'
        });
        gsap.fromTo(image, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: 'power2.out' });
    }
    if (oldSlideEl) setSlideState(oldSlideEl, false)
}

const handleResize = () => {
    windowWidth.value = window.innerWidth;
    nextTick(() => {
        if (trackRef.value) gsap.set(trackRef.value, { x: -activeIndex.value * totalItemWidth.value });
    })
};

onMounted(() => {
    wrapperRef.value?.addEventListener('mouseenter', stopAutoplay);
    wrapperRef.value?.addEventListener('mouseleave', startAutoplay);
    window.addEventListener("resize", handleResize);

    handleResize();
    nextTick(() => {
        gsap.set(trackRef.value, { x: -activeIndex.value * totalItemWidth.value });

        items().forEach((slide, index) => {
            const content = slide.querySelectorAll('.item-content > *');
            const inactiveContent = slide.querySelector('.item-content-inactive');
            const image = slide.querySelector('.item-image img');

            if (index === activeIndex.value) {
                gsap.set(inactiveContent, { opacity: 0 });
                gsap.set(content, { y: 30, opacity: 0 });
                gsap.to(content, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.3, ease: 'power3.out' });
                gsap.fromTo(image, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: 'power2.out' });
            } else {
                gsap.set(content, { opacity: 0 });
                gsap.set(inactiveContent, { opacity: 1 });
            }
        });

        startAutoplay();
    });
});

onUnmounted(() => {
    wrapperRef.value?.removeEventListener('mouseenter', stopAutoplay);
    wrapperRef.value?.removeEventListener('mouseleave', startAutoplay);
    window.removeEventListener("resize", handleResize);
    stopAutoplay();
});

watch(activeIndex, (newIndex, oldIndex) => {
    if (isTeleporting || !trackRef.value) return

    const all = items()
    animateSlideTransition(all[newIndex], all[oldIndex]);

    gsap.to(trackRef.value, {
        x: -newIndex * totalItemWidth.value,
        duration: 1,
        ease: 'power4.inOut',
        onStart: () => { isAnimating.value = true; },
        onComplete: () => {
            /* Sorti de la copie centrale ? On se replace au centre sans animation. */
            if (newIndex < n.value || newIndex >= 2 * n.value) {
                const centered = newIndex < n.value ? newIndex + n.value : newIndex - n.value
                isTeleporting = true
                activeIndex.value = centered
                nextTick(() => {
                    gsap.set(trackRef.value, { x: -centered * totalItemWidth.value })
                    syncAllStates()
                    isTeleporting = false
                    isAnimating.value = false
                    startAutoplay()
                })
                return
            }
            isAnimating.value = false;
            startAutoplay();
        }
    });
}, { flush: 'sync' });
</script>

<style scoped lang="scss">
$item-width: 650px;
$item-height: 330px;
$gap: 20px;
$inactive-scale: 1;
$inactive-opacity: 0.6;
$transition-speed: 0.8s;
$transition-curve: cubic-bezier(0.65, 0, 0.35, 1);

.carousel-wrapper {
    position: relative;
    width: 100%;
    min-height: calc($item-height + 150px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        min-height: calc(450px + 150px);
    }
}

.carousel-container {
    width: 100%;
    height: 100%;
    touch-action: pan-y;
    user-select: none;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #F2EFE6 25%, black 75%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, #F2EFE6 25%, black 75%, transparent 100%);

    @media screen and (max-width: 768px) {
        mask-image: none;
        -webkit-mask-image: none;
        padding: 0 10px;
    }
}

.carousel {
    display: flex;
    align-items: center;
    height: 100%;

}

.carousel-item {
    width: 100%;
    max-width: $item-width;
    height: $item-height;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    display: flex;
    border: 1px solid var(--border);
    opacity: $inactive-opacity;
    transform: scale($inactive-scale);
    filter: grayscale(0.5);
    cursor: pointer;
    transition:
        transform $transition-speed $transition-curve,
        opacity $transition-speed $transition-curve,
        filter $transition-speed $transition-curve,
        border-color $transition-speed $transition-curve;
    margin: 0;

    @media screen and (max-width: 768px) {
        border-radius: 6px;
        height: 450px;
        max-width: 100%;
    }

    .item-image {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        opacity: 0;
        transition: opacity $transition-speed $transition-curve;

        picture {
            display: block;
            width: 100%;
            height: 100%;
        }

        img {
            /* GSAP va manipuler la 'scale' de cette image */
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .item-content {
        pointer-events: none;
    }

    .item-content-inactive {}
}

.carousel-item.active {
    cursor: default;
    opacity: 1;
    transform: scale(1);
    filter: grayscale(0);
    border-color: var(--ink);
    box-shadow: 6px 6px 0 var(--terracotta);

    .item-image {
        opacity: 1;
    }

    .item-content {
        pointer-events: auto;
    }

    .item-content-inactive {
        pointer-events: none;
    }
}

.item-content {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    width: 60%;
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    background: rgba(26, 26, 26, 0.88);
    color: var(--cream);
    backdrop-filter: blur(8px);

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 65%;
        top: inherit;
        bottom: 0;
    }

    @media screen and (max-width: 375px) {
        height: 85%;
    }

    h2 {
        font-family: 'Instrument Serif', serif;
        font-size: 32px;
        line-height: 1.05;
        font-style: italic;
        color: var(--cream);

        @media screen and (max-width: 970px) {
            font-size: 22px;
        }
    }

    p {
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        line-height: 1.5;
        font-weight: 300;
        color: rgba(250, 248, 242, 0.85);
    }

    .slide-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: var(--cream);
        color: var(--ink);
        font-family: 'Fira Code', monospace;
        height: 42px;
        padding: 10px 18px;
        border-radius: 999px;
        font-weight: 500;
        font-size: 12px;
        width: auto;
        border: none;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, gap 0.25s ease;

        &:hover {
            transform: translate(-2px, -2px);
            box-shadow: 3px 3px 0 var(--terracotta);
        }

        &:active {
            transform: translateY(0);
        }

        @media screen and (max-width: 970px) {
            height: max-content;
            text-wrap: nowrap;
        }

        &:first-of-type {
            flex: 0 0 auto;
        }

        &:last-child {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            flex: 0 0 42px;

            svg {
                width: 16px;
                height: 16px;
                transition: transform 0.25s ease;
            }

            &:hover svg {
                transform: translateX(3px);
            }
        }
    }
}

.item-content-inactive {
    width: 100%;
    height: 100%;
    padding: 28px;
    color: var(--graphite);
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    h2 {
        font-family: 'Instrument Serif', serif;
        font-style: italic;
        font-size: 26px;
        color: var(--ink);
        line-height: 1.1;
    }

    p {
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        font-weight: 300;
        color: var(--graphite);
    }

    .slide-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border: 1px solid var(--border);
        background: var(--paper);
        color: var(--ink);
        font-family: 'Fira Code', monospace;
        height: 36px;
        padding: 8px 16px;
        border-radius: 999px;
        font-weight: 500;
        font-size: 11px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.05em;

        &:first-of-type {
            width: max-content;
        }

        &:last-child {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            flex: 0 0 36px;

            svg {
                width: 14px;
                height: 14px;
            }
        }
    }
}

.nav-arrow {
    border: 1px solid var(--border);
    background: var(--cream);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 56px;
    height: 56px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    span {
        color: var(--ink);
        font-size: 1.25rem;
        transition: color 0.3s ease;
    }

    &:hover {
        border-color: var(--ink);
        background: var(--ink);
        box-shadow: 3px 3px 0 var(--terracotta);

        span {
            color: var(--cream);
        }
    }

    @media screen and (max-width: 768px) {
        top: inherit;
        bottom: 0px;
        transform: inherit !important;
        width: 44px;
        height: 44px;
    }
}

.prev-arrow {
    left: 2rem;

    @media screen and (max-width: 768px) {
        left: 10px;
    }
}

.next-arrow {
    right: 2rem;

    @media screen and (max-width: 768px) {
        right: 10px;
    }
}

.pagination-dots {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    gap: 8px;
    z-index: 20;
    height: 70px;
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        width: 8px;
        height: 8px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: var(--border);
        cursor: pointer;
        transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;

        &:hover {
            background: var(--ink);
            transform: scale(1.2);
        }

        &.active {
            background: var(--terracotta);
            width: 24px;
            border-radius: 999px;
        }
    }
}

.carousel-wrapper.is-animating .nav-arrow {
    opacity: 0.3;
    cursor: wait;
}
</style>

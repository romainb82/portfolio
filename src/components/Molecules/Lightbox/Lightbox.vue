<template>
    <Teleport to="body">
        <Transition name="lb" @after-enter="onOpened">
            <div v-if="open" ref="rootRef" class="lightbox" role="dialog" aria-modal="true" :aria-label="title"
                @click.self="close" @pointerdown="onPointerDown" @pointerup="onPointerUp">
                <div class="lb-top">
                    <div class="lb-meta">
                        <span class="lb-counter mono">{{ pad(index + 1) }} / {{ pad(images.length) }}</span>
                        <span class="lb-sep" aria-hidden="true"></span>
                        <span class="lb-title serif">{{ title }}</span>
                    </div>
                    <button ref="closeRef" type="button" class="lb-btn lb-close" :aria-label="t('lightbox.close')"
                        @click="close">
                        <X />
                        <span class="lb-kbd mono" aria-hidden="true">esc</span>
                    </button>
                </div>

                <button v-if="images.length > 1" type="button" class="lb-btn lb-nav lb-prev"
                    :aria-label="t('lightbox.prev')" @click="prev">
                    <ArrowLeft />
                </button>

                <figure class="lb-figure" @click.self="close">
                    <div class="lb-frame" :class="{ 'is-loading': loading }">
                        <img ref="imgRef" :key="current.src" :src="current.src" :alt="current.alt" class="lb-img"
                            draggable="false" @load="loading = false" />
                    </div>
                    <figcaption class="lb-caption mono">{{ current.label }}</figcaption>
                </figure>

                <button v-if="images.length > 1" type="button" class="lb-btn lb-nav lb-next"
                    :aria-label="t('lightbox.next')" @click="next">
                    <ArrowRight />
                </button>

                <div v-if="images.length > 1" class="lb-thumbs" role="tablist">
                    <button v-for="(img, i) in images" :key="img.src" type="button" class="lb-thumb"
                        :class="{ 'is-active': i === index }" role="tab" :aria-selected="i === index"
                        :aria-label="t('lightbox.goTo', { n: i + 1 })" @click="goTo(i)">
                        <img :src="img.src" :alt="''" loading="lazy" decoding="async" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch, type PropType } from 'vue'
import { ArrowLeft, ArrowRight, X } from 'lucide-vue-next'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'
import { prefersReducedMotion } from '@/composables/useScrollTo'

export interface LightboxImage {
    src: string
    alt: string
    label: string
}

const props = defineProps({
    open: { type: Boolean, default: false },
    images: { type: Array as PropType<LightboxImage[]>, required: true },
    startIndex: { type: Number, default: 0 },
    title: { type: String, default: '' },
})

const emit = defineEmits<{ (e: 'update:open', value: boolean): void; (e: 'close'): void }>()

const { t } = useI18n()

const index = ref(0)
const loading = ref(true)
const rootRef = ref<HTMLElement | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
let lastFocused: HTMLElement | null = null
let pointerStartX: number | null = null

const current = computed(() => props.images[index.value] ?? props.images[0])
const pad = (n: number) => String(n).padStart(2, '0')

const preload = (i: number) => {
    const img = props.images[i]
    if (img) new Image().src = img.src
}

const animateImage = () => {
    if (!imgRef.value || prefersReducedMotion()) return
    gsap.fromTo(imgRef.value, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
}

const goTo = (i: number) => {
    if (!props.images.length) return
    const next = (i + props.images.length) % props.images.length
    if (next === index.value) return
    loading.value = true
    index.value = next
    nextTick(animateImage)
    preload(next + 1)
    preload(next - 1)
}
const next = () => goTo(index.value + 1)
const prev = () => goTo(index.value - 1)

const close = () => {
    emit('update:open', false)
    emit('close')
}

const onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
        case 'Escape': e.preventDefault(); close(); break
        case 'ArrowRight': e.preventDefault(); next(); break
        case 'ArrowLeft': e.preventDefault(); prev(); break
        case 'Tab': trapFocus(e); break
    }
}

/* Garde le focus clavier à l'intérieur de la lightbox tant qu'elle est ouverte */
const trapFocus = (e: KeyboardEvent) => {
    const root = rootRef.value
    if (!root) return
    const focusables = root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

/* Swipe tactile gauche / droite */
const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return
    pointerStartX = e.clientX
}
const onPointerUp = (e: PointerEvent) => {
    if (pointerStartX === null) return
    const dx = e.clientX - pointerStartX
    pointerStartX = null
    if (Math.abs(dx) < 48) return
    dx < 0 ? next() : prev()
}

const onOpened = () => {
    closeRef.value?.focus()
    animateImage()
}

watch(() => props.open, (isOpen) => {
    if (isOpen) {
        lastFocused = document.activeElement as HTMLElement | null
        index.value = Math.min(Math.max(props.startIndex, 0), Math.max(props.images.length - 1, 0))
        loading.value = true
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', onKeydown)
        preload(index.value + 1)
        preload(index.value - 1)
    } else {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', onKeydown)
        lastFocused?.focus?.()
    }
})

onUnmounted(() => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped lang="scss">
.lightbox {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(26, 26, 26, 0.94);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: var(--cream);
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 72px 1fr 72px;
    grid-template-areas:
        "top top top"
        "prev figure next"
        "thumbs thumbs thumbs";
    padding: 20px 24px 24px;
    gap: 12px;
    touch-action: pan-y;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "top top"
            "figure figure"
            "thumbs thumbs"
            "prev next";
        padding: 16px;
    }
}

.lb-top {
    grid-area: top;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(250, 248, 242, 0.14);
}

.lb-meta {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;

    .lb-counter {
        font-size: 12px;
        letter-spacing: 0.12em;
        color: var(--terracotta-light);
        font-weight: 500;
    }

    .lb-sep {
        width: 24px;
        height: 1px;
        background: rgba(250, 248, 242, 0.3);
    }

    .lb-title {
        font-size: clamp(18px, 2vw, 24px);
        font-style: italic;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.lb-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--cream);
    background: rgba(250, 248, 242, 0.06);
    border: 1px solid rgba(250, 248, 242, 0.18);
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

    svg {
        width: 18px;
        height: 18px;
    }

    &:hover,
    &:focus-visible {
        background: var(--cream);
        border-color: var(--cream);
        color: var(--ink);
        transform: translate(-2px, -2px);
        box-shadow: 3px 3px 0 var(--terracotta);
    }

    &:focus-visible {
        outline: 2px solid var(--terracotta);
        outline-offset: 3px;
    }
}

.lb-close {
    height: 44px;
    padding: 0 10px 0 14px;

    .lb-kbd {
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 3px 7px;
        border: 1px solid currentColor;
        border-radius: 4px;
        opacity: 0.7;

        @media screen and (max-width: 768px) {
            display: none;
        }
    }

    @media screen and (max-width: 768px) {
        width: 44px;
        padding: 0;
    }
}

.lb-nav {
    width: 56px;
    height: 56px;
    align-self: center;
    justify-self: center;

    &.lb-prev { grid-area: prev; }
    &.lb-next { grid-area: next; }

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 48px;
        border-radius: 999px;
    }
}

.lb-figure {
    grid-area: figure;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: 0;
}

.lb-frame {
    position: relative;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid rgba(250, 248, 242, 0.2);
    border-radius: 6px;
    background: var(--ink);
    box-shadow: 8px 8px 0 var(--terracotta);
    overflow: hidden;
    display: flex;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(250, 248, 242, 0.08) 50%, transparent 100%);
        background-size: 200% 100%;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
    }

    &.is-loading::after {
        opacity: 1;
        animation: lbShimmer 1.1s linear infinite;
    }

    @media screen and (max-width: 768px) {
        box-shadow: 5px 5px 0 var(--terracotta);
    }
}

.lb-img {
    display: block;
    max-width: min(92vw, 1400px);
    max-height: calc(100vh - 230px);
    width: auto;
    height: auto;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;

    @media screen and (max-width: 768px) {
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 260px);
    }
}

.lb-caption {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: lowercase;
    color: rgba(250, 248, 242, 0.65);
    padding: 4px 10px;
    border: 1px solid rgba(250, 248, 242, 0.14);
    border-radius: 2px;
}

.lb-thumbs {
    grid-area: thumbs;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-top: 6px;
    flex-wrap: wrap;
}

.lb-thumb {
    width: 64px;
    height: 44px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(250, 248, 242, 0.2);
    opacity: 0.55;
    cursor: pointer;
    padding: 0;
    background: var(--ink);
    transition: opacity 0.25s ease, border-color 0.25s ease, transform 0.25s ease;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    &:hover,
    &:focus-visible {
        opacity: 1;
        transform: translateY(-2px);
    }

    &.is-active {
        opacity: 1;
        border-color: var(--terracotta);
        box-shadow: 0 0 0 1px var(--terracotta);
    }
}

@keyframes lbShimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
}

/* Transition d'ouverture / fermeture */
.lb-enter-active,
.lb-leave-active {
    transition: opacity 0.3s ease;

    .lb-figure {
        transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
    }
}

.lb-enter-from,
.lb-leave-to {
    opacity: 0;

    .lb-figure {
        transform: translateY(16px) scale(0.98);
        opacity: 0;
    }
}
</style>

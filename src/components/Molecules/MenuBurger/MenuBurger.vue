<template>
    <Transition name="slide-fade">
        <div v-if="isOpen" id="mobile-menu" class="menu-overlay" role="dialog" aria-modal="true"
            :aria-label="$t('ui.mainNav')">
            <div class="menu-header">

                <button ref="closeRef" type="button" @click="$emit('close')" class="close-button"
                    :aria-label="$t('ui.closeMenu')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <nav class="menu-content" :aria-label="$t('ui.mainNav')">
                <ul>
                    <li><a href="#about" @click.prevent="go('about')">{{ $t('nav.about') }}</a></li>
                    <li><a href="#project" @click.prevent="go('project')">{{ $t('nav.projects') }}</a></li>
                    <li><a href="#contacts" @click.prevent="go('contacts')">{{ $t('nav.contacts') }}</a></li>
                </ul>
            </nav>

            <div class="menu-footer" role="group" :aria-label="$t('ui.lang')">
                <button type="button" :class="{ 'is-selected': locale === 'fr' }" :aria-pressed="locale === 'fr'"
                    lang="fr" @click="setLang('fr')">{{ $t('lang.fr') }}</button>
                <button type="button" :class="{ 'is-selected': locale === 'en' }" :aria-pressed="locale === 'en'"
                    lang="en" @click="setLang('en')">{{ $t('lang.en') }}</button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { scrollToSection } from '@/composables/useScrollTo'

const { locale } = useI18n()
const props = defineProps<{
    isOpen: boolean
}>();

const emit = defineEmits(['close']);
const closeRef = ref<HTMLButtonElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
}

/* Ferme le menu puis défile vers la section (après la transition de fermeture) */
const go = (id: string) => {
    emit('close')
    setTimeout(() => scrollToSection(id), 50)
}

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeydown)
        nextTick(() => closeRef.value?.focus())
    } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeydown)
    }
});

onUnmounted(() => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
})

const setLang = (lang: 'fr' | 'en') => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
</script>

<style scoped lang="scss">
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--paper);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    color: var(--ink);
    font-family: 'Open Sans', sans-serif;
}

.menu-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .close-button {
        background: var(--cream);
        border: 1px solid var(--border);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ink);
        cursor: pointer;
        transition: border-color 0.25s ease, background 0.25s ease;

        svg {
            width: 22px;
            height: 22px;
        }

        &:hover {
            background: var(--ink);
            border-color: var(--ink);
            color: var(--cream);
        }
    }
}

.menu-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    ul {
        list-style: none;
        padding: 0 12px;
        text-align: left;

        li {
            margin: 1.4rem 0;

            a {
                font-family: 'Instrument Serif', serif;
                font-style: italic;
                font-size: clamp(48px, 12vw, 88px);
                font-weight: 400;
                color: var(--ink);
                text-decoration: none;
                line-height: 1;
                letter-spacing: -0.03em;
                position: relative;
                display: inline-block;
                transition: color 0.25s ease, padding-left 0.25s ease;

                &::before {
                    content: '→';
                    position: absolute;
                    left: -1.2em;
                    opacity: 0;
                    color: var(--terracotta);
                    transition: opacity 0.25s ease, transform 0.25s ease;
                    transform: translateX(-10px);
                }

                &:hover {
                    color: var(--terracotta);

                    &::before {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            }
        }
    }
}

.menu-footer {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    padding: 20px 12px;
    border-top: 1px solid var(--border);
    align-items: center;

    button {
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        padding: 6px 12px;
        border: none;
        background: transparent;
        border-radius: 999px;
        color: var(--graphite);
        cursor: pointer;
        transition: background 0.25s ease, color 0.25s ease;

        &:hover {
            color: var(--ink);
        }
    }

    .is-selected {
        background: var(--ink);
        color: var(--cream);
        text-decoration: none;
    }
}

/* --- Animation de transition --- */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
}
</style>
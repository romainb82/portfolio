<template>
    <Transition name="slide-fade">
        <div v-if="isOpen" class="menu-overlay">
            <div class="menu-header">

                <button @click="$emit('close')" class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <nav class="menu-content">
                <ul>
                    <li><a href="#about" @click="$emit('close')">{{ $t('nav.about') }}</a></li>
                    <li><a href="#project" @click="$emit('close')">{{ $t('nav.projects') }}</a></li>
                    <li><a href="#contacts" @click="$emit('close')">{{ $t('nav.contacts') }}</a></li>

                </ul>
            </nav>

            <div class="menu-footer">
                <p :class="{ 'is-selected': locale === 'fr' }" @click="setLang('fr')">{{ $t('lang.fr') }}</p>
                <p :class="{ 'is-selected': locale === 'en' }" @click="setLang('en')">{{ $t('lang.en') }}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const props = defineProps<{
    isOpen: boolean
}>();

const emit = defineEmits(['close']);

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

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
    background-color: #121212;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 16px 24px; 
    color: white;
    @apply font-openSans;
}

.menu-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .logo {
        font-size: 24px;
    }

    .close-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;

        svg {
            width: 45px;
            height: 45px;
        }
    }
}

.menu-content {
    flex-grow: 1; 
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        list-style: none;
        padding: 0;
        text-align: center;

        li {
            margin: 2rem 0;

            a {
                font-size: 36px; 
                font-weight: 300;
                color: white;
                text-decoration: none;
            }
        }
    }
}

.menu-footer {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding-bottom: 2rem;
    font-size: 18px;

    .is-selected {
        text-decoration: underline;
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
<template>
    <Transition name="slide-fade">
        <div v-if="isOpen" class="menu-overlay">
            <div class="menu-header">
                <div class="logo">
                    <p>Romain <br> Bessede</p>
                </div>
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
                    <li><RouterLink to="" @click="$emit('close')">About</RouterLink></li>
                    <li><RouterLink to="" @click="$emit('close')">Projects</RouterLink></li>
                    <li><RouterLink to="" @click="$emit('close')">Articles</RouterLink></li>
                    <li><RouterLink to="" @click="$emit('close')">Contacts</RouterLink></li>
                </ul>
            </nav>

            <div class="menu-footer">
                <p class="is-selected">FR</p>
                <p>EN</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue';

// On définit les "props" que le composant peut recevoir
const props = defineProps<{
  isOpen: boolean
}>();

// On définit les événements que le composant peut émettre
const emit = defineEmits(['close']);

// Bloque le scroll de la page lorsque le menu est ouvert pour une meilleure UX
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
</script>

<style scoped lang="scss">
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #121212; // Un fond sombre
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 16px 24px; // Padding réduit pour mobile
    color: white;
    @apply font-openSans;
}

.menu-header {
    display: flex;
    justify-content: space-between;
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
    flex-grow: 1; // Prend tout l'espace vertical disponible
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
                font-size: 36px; // Liens plus grands et plus cliquables
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
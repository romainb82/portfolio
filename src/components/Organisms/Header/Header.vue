<template>
    <header ref="headerRef">
        <div class="logo" ref="logoRef">
            <p>Romain <br /> Bessede</p>
        </div>

        <nav class="menu" ref="menuRef">
            <ul>
                <li><a href="#about" @click.prevent="scrollToSection('about')">About</a></li>
                <li><a href="#project" @click.prevent="scrollToSection('project')">Projects</a></li>
                <li><a href="#contacts" @click.prevent="scrollToSection('contacts')">Contacts</a></li>
            </ul>
        </nav>

        <div class="menu-lang">
            <p class="is-selected">FR</p>
            <p>EN</p>
        </div>

        <div class="menu-burger" :class="{ open: isMenuOpen }" @click="toggleMenu" ref="burgerRef">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-menu-icon lucide-menu">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
            </svg>
        </div>
    </header>

    <MenuBurger :is-open="isMenuOpen" @close="isMenuOpen = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import gsap from "gsap";
import MenuBurger from "@/components/Molecules/MenuBurger/MenuBurger.vue";

const isMenuOpen = ref(false);
const headerRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const burgerRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    // Animation d'apparition au chargement
    gsap.from(headerRef.value, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    });
    gsap.from(logoRef.value, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
    });
    gsap.from(menuRef.value, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
    });
});

// Animation rotation burger à l'ouverture/fermeture
watch(isMenuOpen, (open) => {
    if (burgerRef.value) {
        gsap.to(burgerRef.value, {
            rotate: open ? 90 : 0,
            duration: 0.5,
            ease: "power2.inOut",
        });
    }
});

const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        const yOffset = headerRef.value?.offsetHeight || 0;
        const y = el.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        isMenuOpen.value = false;
    }
};
</script>

<style scoped lang='scss'>
@import url('./HeaderStyle.scss')
</style>
<template>
    <header ref="headerRef" :class="{ 'is-hidden': isHidden, 'is-scrolled': isScrolled }">
        <a class="logo" href="#hero" ref="logoRef" @click.prevent="goTop" :aria-label="'Romain Bessede — ' + $t('ui.backToTop')">
            <p>Romain <br /> Bessede</p>
        </a>

        <nav class="menu" ref="menuRef" :aria-label="$t('ui.mainNav')">
            <ul>
                <li v-for="item in navItems" :key="item.id">
                    <a :href="'#' + item.id" :class="{ 'is-active': activeSection === item.id }"
                        :aria-current="activeSection === item.id ? 'true' : undefined"
                        @click.prevent="goTo(item.id)">{{ $t(item.labelKey) }}</a>
                </li>
            </ul>
        </nav>

        <div class="menu-lang" role="group" :aria-label="$t('ui.lang')">
            <button type="button" :class="{ 'is-selected': locale === 'fr' }" :aria-pressed="locale === 'fr'"
                lang="fr" @click="setLang('fr')">{{ $t('lang.fr') }}</button>
            <button type="button" :class="{ 'is-selected': locale === 'en' }" :aria-pressed="locale === 'en'"
                lang="en" @click="setLang('en')">{{ $t('lang.en') }}</button>
        </div>

        <button type="button" class="menu-burger" :class="{ open: isMenuOpen }" ref="burgerRef"
            :aria-label="isMenuOpen ? $t('ui.closeMenu') : $t('ui.openMenu')" :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu" @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
            </svg>
        </button>
    </header>

    <MenuBurger :is-open="isMenuOpen" @close="isMenuOpen = false" />
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import MenuBurger from "@/components/Molecules/MenuBurger/MenuBurger.vue";
import { useI18n } from 'vue-i18n'
import { scrollToSection } from '@/composables/useScrollTo'

const navItems = [
    { id: 'about', labelKey: 'nav.about' },
    { id: 'project', labelKey: 'nav.projects' },
    { id: 'contacts', labelKey: 'nav.contacts' },
]

const isMenuOpen = ref(false);
const isHidden = ref(false)
const isScrolled = ref(false)
const activeSection = ref<string | null>(null)
const headerRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const burgerRef = ref<HTMLElement | null>(null);
const { locale } = useI18n()

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const goTo = (id: string) => {
    scrollToSection(id)
    isMenuOpen.value = false
}
const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/* Header qui s'efface quand on descend, revient dès qu'on remonte */
let lastY = 0
let ticking = false
const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
        const y = window.scrollY
        isScrolled.value = y > 24
        const delta = y - lastY
        if (y < 120 || isMenuOpen.value) isHidden.value = false
        else if (delta > 6) isHidden.value = true
        else if (delta < -6) isHidden.value = false
        lastY = y
        ticking = false
    })
}

/* Section courante → lien de nav actif */
let observer: IntersectionObserver | null = null
const observeSections = () => {
    const targets = navItems.map(i => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    if (!targets.length) return
    observer = new IntersectionObserver((entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length) activeSection.value = visible[0].target.id
        else if (window.scrollY < 200) activeSection.value = null
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] })
    targets.forEach(t => observer!.observe(t))
}

onMounted(() => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang) locale.value = savedLang as 'fr' | 'en'

    gsap.from(headerRef.value, { y: -50, opacity: 0, duration: 1, ease: "power3.out", clearProps: 'transform,opacity' });
    gsap.from(logoRef.value, { x: -50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out", clearProps: 'all' });
    gsap.from(menuRef.value, { x: 50, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out", clearProps: 'all' });

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    observeSections()
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    observer?.disconnect()
})

watch(isMenuOpen, (open) => {
    if (open) isHidden.value = false
    if (burgerRef.value) {
        gsap.to(burgerRef.value, { rotate: open ? 90 : 0, duration: 0.5, ease: "power2.inOut" });
    }
});

const setLang = (lang: 'fr' | 'en') => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
</script>

<style scoped lang='scss'>
@import url('./HeaderStyle.scss')
</style>

<template>
    <a class="skip-link" href="#main" @click.prevent="focusMain">{{ $t('ui.skip') }}</a>
    <div class="scroll-progress" aria-hidden="true"></div>
    <Header></Header>
    <main id="main" ref="mainRef" tabindex="-1">
        <RouterView></RouterView>
    </main>
    <Footer></Footer>
    <BackToTop />
</template>
<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Organisms/Header/Header.vue';
import Footer from '@/components/Organisms/Footer/Footer.vue';
import BackToTop from '@/components/Atoms/BackToTop/BackToTop.vue';

const mainRef = ref<HTMLElement | null>(null)

const focusMain = () => {
    mainRef.value?.focus()
    mainRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Progression de lecture exposée en variable CSS pour la barre en haut de page */
let ticking = false
const updateProgress = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        doc.style.setProperty('--scroll-progress', p.toFixed(4))
        ticking = false
    })
}

onMounted(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()
})
onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateProgress)
})
</script>
<style scoped lang='scss'>
main:focus {
    outline: none;
}
</style>

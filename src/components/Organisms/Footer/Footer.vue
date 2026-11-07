<template>
    <footer ref="footerRef" class="footer">
        <span class="footer-label">{{ $t('footer.label') }}</span>

        <div class="container-information">
            <div class="container-name">
                <h2 class="title">{{ $t('footer.name') }}</h2>
                <div class="container-bottom">
                    <h2 class="title">{{ $t('footer.surname') }}</h2>
                    <span class="description">{{ $t('footer.role') }}</span>
                </div>
            </div>

            <div id="contacts" class="container-contact">
                <span>{{ $t('footer.talk') }}</span>
                <nav class="menu">
                    <ul>
                        <li><a href="mailto:romain@web-premiere.fr">romain@web-premiere.fr</a></li>
                        <li><a href="#about" @click.prevent="scrollToSection('about')">{{ $t('footer.menu.about') }}</a></li>
                        <li><a href="#project" @click.prevent="scrollToSection('project')">{{
                            $t('footer.menu.projects') }}</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="container-social">
            <ButtonSocial v-for="social in socialNetwork" :icon="social.icon" :label="social.label" :link="social.link"
                variant="dark" :key="social.id">
            </ButtonSocial>
        </div>

        <div class="footer-bottom">
            <span>{{ $t('footer.rights') }}</span>
            <span>{{ $t('footer.made') }}</span>
        </div>
    </footer>
</template>
<script setup lang='ts'>

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted } from 'vue';

import ButtonSocial from '@/components/Atoms/ButtonSocial/ButtonSocial.vue';
import { scrollToSection } from '@/composables/useScrollTo';

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref<HTMLElement | null>(null);


import { Github, Linkedin, Mail, Instagram } from 'lucide-vue-next';

const socialNetwork = [
    { id: 1, label: 'Github', icon: Github, link: 'https://github.com/romainb82' },
    { id: 2, label: 'Linkedin', icon: Linkedin, link: 'https://www.linkedin.com/in/romain-bessede-688249203/' },
    { id: 3, label: 'Email', icon: Mail, link: 'mailto:romain@web-premiere.fr' },
    { id: 4, label: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/roooomain___/' }
]



onMounted(() => {
    if (footerRef.value) {
        gsap.from(footerRef.value, {
            scrollTrigger: {
                trigger: footerRef.value,
                start: "top 75%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,

            duration: 1,
            ease: "power2.out"
        });
    }
});
</script>
<style scoped lang='scss'>
@import url('./FooterStyle.scss')
</style>

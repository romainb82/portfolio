<template>
    <footer ref="footerRef" class="footer">
        <div class="flex flex-row items-center justify-between w-full container-information">
            <div class="flex flex-col items-start justify-start gap-[60px] container-name">
                <span class="title">{{ $t('footer.name') }}</span>
                <div class="flex flex-row items-center gap-[80px] container-bottom">
                    <span class="description">{{ $t('footer.role') }}</span>
                    <span class="title">{{ $t('footer.surname') }}</span>
                </div>
            </div>
            <div id="contacts" class="flex flex-col items-start justify-start gap-[20px] container-contact">
                <span>{{ $t('footer.contacts_title') }}</span>
                <div class="flex flex-row items-center gap-[80px]">
                    <nav class="menu">
                        <ul>
                            <li><a href="#about" @click.prevent="scrollToSection('about')">{{ $t('footer.menu.about')
                            }}</a></li>
                            <li><a href="#project" @click.prevent="scrollToSection('project')">{{
                                $t('footer.menu.projects') }}</a></li>
                            <li><a href="#contacts" @click.prevent="scrollToSection('contacts')">{{
                                $t('footer.menu.contacts') }}</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="skill-card bg-black text-grey-50 border-white/30">
                    <h3>{{ t('footer.skill_card.label') }}</h3>
                    <p class="techno-list">
                        <span class="techno-item" v-for="option in cardSite">
                            {{ option.label }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center justify-between w-full container-social">
            <ButtonSocial v-for="social in socialNetwork" :icon="social.icon" :label="social.label" :link="social.link" :key="social.id">
                
            </ButtonSocial>
        </div>
    </footer>
</template>
<script setup lang='ts'>

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue';
const { t } = useI18n()

import ButtonSocial from '@/components/Atoms/ButtonSocial/ButtonSocial.vue';

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);


import { Github, Linkedin, Send, Mail , Facebook, Instagram } from 'lucide-vue-next';

const socialNetwork = [
    { id: 1, label: 'Github', icon: Github, link: '#' },
    { id: 2, label: 'Linkedin', icon: Linkedin, link: '#' },
    { id: 2, label: 'Email', icon: Mail, link: '#' },
    { id: 2, label: 'Telegram', icon: Send, link: '#' },
    { id: 4, label: 'Facebook', icon: Facebook, link: '#' },
    { id: 5, label: 'Instagram', icon: Instagram, link: '#' }
]



const cardSite = [
    {
        id: 1,
        label: t('footer.skill_card.techno[0]')
    },
    {
        id: 1,
        label: t('footer.skill_card.techno[1]')
    },
    {
        id: 1,
        label: t('footer.skill_card.techno[2]')
    },
]


const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        const yOffset = headerRef.value?.offsetHeight || 0;
        const y = el.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

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
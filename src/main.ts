import { createApp, watch } from 'vue';
import App from '@/App.vue';
import router from './router';
import { createPinia } from 'pinia';
import gsap from 'gsap';
import '@/assets/Style/index.scss';
import { i18n } from '@/lang/i18n'
import { prefersReducedMotion } from '@/composables/useScrollTo'

/* Accessibilité : si l'utilisateur préfère moins d'animations, GSAP joue tout quasi instantanément */
if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(100)
}

/* L'attribut lang du document suit la langue choisie (lecteurs d'écran, césure, SEO) */
watch(i18n.global.locale, (lang) => {
    document.documentElement.lang = lang
    document.title = i18n.global.t('ui.title')
}, { immediate: true })

const app = createApp(App);
app.use(i18n)
app.use(createPinia());
app.use(router);
app.mount('#app');

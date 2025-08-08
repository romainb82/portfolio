import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import '@/assets/Style/index.scss';

import { createI18n } from 'vue-i18n'

import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

const userLang = localStorage.getItem('lang') || navigator.language.slice(0, 2)
const defaultLang = ['fr', 'en'].includes(userLang) ? userLang : 'en'

const i18n = createI18n({
    legacy: false,
    locale: defaultLang,
    fallbackLocale: 'en',
    messages: {
        fr,
        en
    }
})


const app = createApp(App);
app.use(i18n)
app.use(createPinia());
app.use(router);
app.mount('#app');

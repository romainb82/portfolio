import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/Style/index.scss';
import { i18n } from '@/lang/i18n'



const app = createApp(App);
app.use(i18n)
app.use(createPinia());
app.use(router);
app.mount('#app');

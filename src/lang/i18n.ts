import { createI18n } from 'vue-i18n'
const userLang = localStorage.getItem('lang') || navigator.language.slice(0, 2)
const defaultLang = ['fr', 'en'].includes(userLang) ? userLang : 'en'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: 'en',
  messages: {
    fr,
    en
  }
})

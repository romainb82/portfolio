import { reactive, computed } from 'vue'

const state = reactive({
  lang: 'FR', // Langue par défaut
  translations: {
    FR: {
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contacts',
      heroTitle: 'Full-stack',
      heroDescription: 'Mon objectif est d’écrire du code <em>maintenable</em>, <em>propre</em> et <em>compréhensible</em>.',
    },
    EN: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      heroTitle: 'Full-stack',
      heroDescription: 'My goal is to write <em>maintainable</em>, <em>clean</em>, and <em>understandable</em> code.',
    },
  },
})

export const useI18n = () => {
  const t = computed(() => state.translations[state.lang])
  const setLang = (newLang) => {
    state.lang = newLang
  }
  return { lang: state.lang, t, setLang }
}
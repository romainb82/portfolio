import { reactive, computed } from 'vue'

const state = reactive({
  lang: 'FR',
  translations: {
    FR: {
      annee: "ans",
      mois: "mois",
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contacts',
      heroTitle: 'Full-stack',
      heroSubTitle: 'Développeur',
      heroDescription: 'Mon objectif est d’écrire du code <em>maintenable</em>, <em>propre</em> et <em>compréhensible</em> pour que le développement soit agréable.',
      aboutMe: '... /À propos de moi ...',
      hello: 'Bonjour ! Je suis Romain, je suis un <em>développeur full-stack</em>. Plus de <strong>3 ans</strong> d\'expérience.',
      favoriteTech: 'Quelques-unes de <em>mes technologies préférées</em>,<br />sujets, ou outils avec lesquels j\'ai travaillé :',
      frontEnd: 'Front-end',
      styles: 'Styles',
      backEnd: 'Back-end',
      work: 'Expérience',
      totalExp: 'Expérience totale'
    },
    EN: {
      annee: "years",
      mois: "months",
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      heroTitle: 'Full-stack',
      heroSubTitle: 'Developer',
      heroDescription: 'My goal is to write <em>maintainable</em>, <em>clean</em>, and <em>understandable</em> code to process development was enjoyable.',
      aboutMe: '... /About me ...',
      hello: 'Hello! I\'m Romain, I\'m a <em>full-stack developer</em>. More than <strong>3 years</strong> experience.',
      favoriteTech: 'Some of <em>my favorite technologies</em>,<br />topics, or tools that I worked with:',
      frontEnd: 'Front-end',
      styles: 'Styles',
      backEnd: 'Back-end',
      work: 'Work',
      totalExp: 'Total experience'
    },
  },
})

export const useI18n = () => {
  const t = computed(() => state.translations[state.lang])
  const setLang = (newLang) => {
    if (state.lang !== newLang) {
      state.lang = newLang
    }
  }
  return { lang: computed(() => state.lang), t, setLang }
}
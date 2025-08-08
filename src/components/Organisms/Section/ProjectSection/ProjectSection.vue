<template>
  <section id="project" class="container-project" ref="section">
    <span class="title opacity-0" ref="title">{{ $t('projects.section') }}</span>
    <div class="flex flex-col items-start gap-[100px] w-full">
      <ProjectShowcase v-for="(project, index) in projects" :key="project.id" :title="$t(project.titleKey)"
        :reverse="index % 2 !== 0" :technologies="project.technologies" :description="$t(project.descriptionKey)"
        :mainImage="project.mainImage" :link="project.link" :ref="el => showcasesRefs[index] = el" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProjectShowcase from '@/components/Molecules/ProjectShowcase/ProjectShowcase.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    id: 'kana-master',
    titleKey: 'projects.kanaMaster.title',
    descriptionKey: 'projects.kanaMaster.description',
    technologies: ['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS'],
    mainImage: 'https://static.vecteezy.com/ti/vecteur-libre/p2/1434757-admin-panel-neumorphic-dashboard-ui-kit-vectoriel.jpg',
    link: 'https://apps.apple.com/fr/app/kana-master/id6450567086'
  },
  {
    id: 'portfolio-v3',
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    technologies: ['Vue 3', 'TypeScript', 'GSAP', 'SCSS', 'Vite'],
    mainImage: 'https://static.vecteezy.com/ti/vecteur-libre/p2/1434757-admin-panel-neumorphic-dashboard-ui-kit-vectoriel.jpg',
    link: 'https://github.com/romainb82/portfolio'
  },
])


const section = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const showcasesRefs: any = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  if (!section.value || !title.value) return

  gsap.fromTo(
    title.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section.value,
        start: 'top 85%',
      },
    }
  )

  if (showcasesRefs.value.length) {
    gsap.fromTo(
      showcasesRefs.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.value,
          start: 'top 85%',
        },
      }
    )
  }
})
</script>


<style scoped lang='scss'>
.container-project {
  width: 100%;
  height: max-content;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  padding: 0px 52px;
  padding-bottom: 150px !important;
  overflow-x: clip;

  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }

  @media screen and (max-width: 426px) {
    align-items: flex-start;
  }

  @media screen and (max-width: 375px) {
    padding: 0px 10px;
  }

  @media screen and (max-width: 425px) {
    padding-bottom: 50px !important;
  }

  .title {
    @apply font-openSans text-white;
    font-size: 24px;
    font-weight: 500;
    text-wrap: nowrap;
  }
}
</style>
<template>
  <section id="project" class="container-project" ref="section">
    <span class="title opacity-0" ref="title">{{ $t('projects.section') }}</span>
    <div class="flex flex-col items-start gap-[100px] w-full">
      <ProjectShowcase v-for="(project, index) in projects" :key="project.id" :title="$t(project.titleKey)"
        :reverse="index % 2 !== 0" :technologies="project.technologies" :description="$t(project.descriptionKey)"
        :mainImage="project.mainImage" :mobileImage="project.mobileImage" :secondImage="project.secondImage"
        :thirdImage="project.thirdImage" :link="project.link" :ref="el => showcasesRefs[index] = el" />
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
    id: 'goudronnage-occitanie',
    titleKey: 'projects.goudronnageOccitanie.title',
    descriptionKey: 'projects.goudronnageOccitanie.description',
    technologies: ['Vue.js', 'Supabase', 'Render'],
    mainImage: '/projects/goudronnage-occitanie.jpg',
    mobileImage: '/projects/goudronnage-occitanie-mobile.jpg',
    secondImage: '/projects/goudronnage-occitanie-2.jpg',
    thirdImage: '/projects/goudronnage-occitanie-3.jpg',
    link: 'https://goudronnage-occitanie.onrender.com'
  },
  {
    id: 'blog-maitresse',
    titleKey: 'projects.blogMaitresse.title',
    descriptionKey: 'projects.blogMaitresse.description',
    technologies: ['Vue.js', 'Supabase', 'Vercel'],
    mainImage: '/projects/blog-maitresse.jpg',
    mobileImage: '/projects/blog-maitresse-mobile.jpg',
    secondImage: '/projects/blog-maitresse-2.jpg',
    thirdImage: '/projects/blog-maitresse-3.jpg',
    link: 'https://blog-maitresse.vercel.app'
  },
  {
    id: 'portfolio-v3',
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    technologies: ['Vue 3', 'TypeScript', 'GSAP', 'SCSS', 'Vite'],
    mainImage: '/projects/portfolio.jpg',
    mobileImage: '/projects/portfolio-mobile.jpg',
    secondImage: '/projects/portfolio-2.jpg',
    thirdImage: '/projects/portfolio-3.jpg',
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
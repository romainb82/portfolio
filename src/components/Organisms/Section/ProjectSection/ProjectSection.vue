<template>
  <section id="project" class="projects" ref="section">
    <header class="projects-header">
      <span class="section-label" ref="title">{{ $t('projects.chapter') }}</span>
      <div class="header-row">
        <h2 class="projects-title">
          <span class="syne">{{ $t('projects.titleA') }}</span>
          <span class="serif italic">{{ $t('projects.titleB') }}</span>
        </h2>
        <p class="projects-intro" v-html="$t('projects.intro')"></p>
      </div>
    </header>

    <div class="projects-stack">
      <ProjectShowcase v-for="(project, index) in projects" :key="project.id" :title="$t(project.titleKey)"
        :reverse="index % 2 !== 0" :technologies="project.technologies" :description="$t(project.descriptionKey)"
        :mainImage="project.mainImage" :mobileImage="project.mobileImage" :secondImage="project.secondImage"
        :thirdImage="project.thirdImage" :link="project.link" :number="String(index + 1).padStart(2, '0')"
        :ref="el => showcasesRefs[index] = el" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProjectShowcase from '@/components/Molecules/ProjectShowcase/ProjectShowcase.vue'

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

  gsap.fromTo(title.value,
    { opacity: 0, y: 20 },
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
    gsap.fromTo(showcasesRefs.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
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
.projects {
  width: 100%;
  padding: 0 52px 150px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media screen and (max-width: 768px) {
    padding: 0 20px 80px;
    gap: 32px;
  }

  @media screen and (max-width: 375px) {
    padding: 0 10px 50px;
  }
}

.serif { font-family: 'Instrument Serif', serif; }
.syne { font-family: 'Syne', sans-serif; }
.italic { font-style: italic; }

.projects-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);

  .header-row {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 40px;
    align-items: end;

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .projects-title {
    font-size: clamp(48px, 7vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: var(--ink);
    display: flex;
    flex-direction: column;

    .syne {
      font-weight: 700;
      text-transform: uppercase;
    }

    .serif {
      font-style: italic;
      font-weight: 400;
      color: var(--terracotta);
      margin-top: 0.05em;
    }
  }

  .projects-intro {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(18px, 1.6vw, 24px);
    line-height: 1.4;
    color: var(--ink);
    font-style: italic;
    max-width: 480px;
    letter-spacing: -0.01em;

    strong {
      color: var(--terracotta);
      font-weight: 400;
    }
  }
}

.projects-stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
}
</style>

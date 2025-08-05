<template>
  <section id="project" class="container-project" ref="section">
    <span class="title opacity-0" ref="title">… /Projects …</span>
    <div class="flex flex-col items-start gap-[100px] w-full">
      <ProjectShowcase
        v-for="(project, index) in 2"
        :key="index"
        :title="'Kana Master'"
        :reverse="index === 1"
        :technologies="['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS']"
        description="Kana Master is an <b>iOS application designed</b> for learning Katakana and Hiragana. It includes various tests and practical exercises that help in learning and memorizing Japanese characters. The app also offers audio training for correct pronunciation and demonstrates how to properly draw each character."
        mainImage="https://static.vecteezy.com/ti/vecteur-libre/p2/1434757-admin-panel-neumorphic-dashboard-ui-kit-vectoriel.jpg"
        link=""
        :ref="el => showcasesRefs[index] = el"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProjectShowcase from '@/components/Molecules/ProjectShowcase/ProjectShowcase.vue'

gsap.registerPlugin(ScrollTrigger)

const section = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const showcasesRefs: any = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  if (!section.value || !title.value) return

  // Animation du titre
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

  // Animation des ProjectShowcase seulement s'ils existent
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

    .title {
        @apply font-openSans text-white;
        font-size: 24px;
        font-weight: 500;
        text-wrap: nowrap;
    }
}
</style>
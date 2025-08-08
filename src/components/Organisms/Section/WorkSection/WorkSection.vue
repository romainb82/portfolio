<template>
    <section id="work" class="container-work" ref="sectionWork">
        <div class="flex flex-row items-start justify-end container-row w-full">
            <span class="title" ref="title">{{ t('work.title') }}</span>
        </div>

        <div class="flex flex-col items-start justify-start container-row w-full">
            <div v-for="(row, index) in experienceRows" :key="index" class="experience-row w-full" ref="rowEls">
                <ExperienceRow :dateRange="row.dateRange" :duration="t(row.duration)" :company="row.company"
                    :title="t(row.title)" :technologies="row.technologies" />
            </div>
        </div>

        <div class="flex flex-col items-end justify-start container-row w-full" ref="summary">
            <span class="sub-text">{{ t('work.summaryTitle') }}</span>
            <span class="sub-text">{{ t('work.summaryDuration') }}</span>
        </div>
    </section>


</template>


<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceRow from '@/components/Atoms/ExperienceRow/ExperienceRow.vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

gsap.registerPlugin(ScrollTrigger)

const sectionWork = ref(null)
const title = ref(null)
const summary = ref<HTMLDivElement | null>(null)
const rowEls = ref([])

const experienceRows = [
    {
        dateRange: '2023 - 2025',
        duration: 'work.experiences[0].duration',
        company: 'Sopra Steria - Albi',
        title: 'work.experiences[0].title',
        technologies: 'Java',
    },
    {
        dateRange: '2022 - 2023',
        duration: 'work.experiences[1].duration',
        company: 'Mecachrome - Montauban',
        title: 'work.experiences[1].title',
        technologies: 'PHP, Symfony, Batch',
    },
    {
        dateRange: '10 Janviers 2022 - 19 Février 2022',
        duration: 'work.experiences[2].duration',
        company: 'Pro a Pro Distribution - Montauban',
        title: 'work.experiences[2].title',
        technologies: 'PHP',
    },
    {
        dateRange: '31 Juin 2021 - 2 Juillet 2022',
        duration: 'work.experiences[3].duration',
        company: 'APEM SAS - Caussade',
        title: 'work.experiences[3].title',
        technologies: 'Office 365',
    },
]

onMounted(() => {
    if (!title.value || !sectionWork.value || !summary.value) return

    nextTick(() => {

        gsap.to(title.value, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionWork.value,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        })

        gsap.from(rowEls.value, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionWork.value,
                start: 'top 75%',
            },
        })
        if (summary.value) {
            gsap.from(summary.value?.children, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: summary.value,
                    start: 'top 85%',
                },
            })
        }

    })

})

</script>
<style scoped lang='scss'>
.container-work {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    height: max-content;
    padding: 0px 52px;
    padding-bottom: 150px !important;

    @media screen and (max-width: 768px) {
        padding: 0px 20px;
    }

    @media screen and (max-width: 375px) {
        padding: 0px 10px;
    }

      @media screen and (max-width: 425px) {
          padding-bottom: 50px !important;
    }

    .container-row {

        .title {
            @apply font-firaCode text-white;
            font-weight: 700;
            font-size: 132px;
            line-height: 90px;
            width: max-content;
            text-wrap: nowrap;
            opacity: 0;

            @media screen and (max-width: 850px) {
                font-size: 14vw;
                line-height: 10vw;
            }

        }

        .sub-text {
            @apply font-openSans text-grey-50;
            font-size: 16px;
            font-weight: 300;

            &:last-child {
                @apply font-firaCode text-white;
                font-style: italic;
            }
        }
    }


}
</style>
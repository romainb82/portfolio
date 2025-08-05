<template>
    <section id="work" class="container-work" ref="sectionWork">
        <div class="flex flex-row items-start justify-end container-row w-full">
            <span class="title" ref="title">Work</span>
        </div>

        <div class="flex flex-col items-start justify-start container-row w-full">
            <div v-for="(row, index) in experienceRows" :key="index" class="experience-row w-full" ref="rowEls">
                <ExperienceRow :dateRange="row.dateRange" :duration="row.duration" :company="row.company"
                    :title="row.title" :technologies="row.technologies" />
            </div>
        </div>

        <div class="flex flex-col items-end justify-start container-row w-full" ref="summary">
            <span class="sub-text">Work experience</span>
            <span class="sub-text">3 years 2 months</span>
        </div>
    </section>


</template>


<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceRow from '@/components/Atoms/ExperienceRow/ExperienceRow.vue'

gsap.registerPlugin(ScrollTrigger)

// Refs
const sectionWork = ref(null)
const title = ref(null)
const summary = ref<HTMLDivElement | null>(null)
const rowEls = ref([])

// Data pour les expériences
const experienceRows = [
    {
        dateRange: '2023 - 2025',
        duration: '2 years',
        company: 'Sopra Steria - Albi',
        title: 'Alternant Développeur logiciel',
        technologies: 'Java',
    },
    {
        dateRange: '2022 - 2023',
        duration: '1 year',
        company: 'Mecachrome - Montauban',
        title: 'Alternant Développeur logiciel',
        technologies: 'PHP, Symfony, Batch',
    },
    {
        dateRange: '10 Janviers 2022 - 19 Février 2022',
        duration: '1 Month',
        company: 'Pro a Pro Distribution - Montauban',
        title: 'Stagiaire informatique',
        technologies: 'PHP',
    },
    {
        dateRange: '31 Juin 2021 - 2 Juillet 2022',
        duration: '1 year 1 months',
        company: 'APEM SAS - Caussade',
        title: 'Stagiaire informatique',
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

        // ExperienceRows
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
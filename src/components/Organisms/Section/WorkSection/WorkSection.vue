<template>
    <section id="work" class="work" ref="sectionWork">
        <header class="work-header">
            <span class="section-label" ref="title">{{ t('work.chapter') }}</span>
            <div class="header-row">
                <h2 class="work-title">
                    <span class="syne">{{ t('work.titleA') }}</span>
                    <span class="serif italic">{{ t('work.titleB') }}</span>
                </h2>
                <div class="summary" ref="summary">
                    <span class="summary-label">{{ t('work.total') }}</span>
                    <span class="summary-duration">{{ t('work.summaryDuration') }}</span>
                </div>
            </div>
        </header>

        <ol class="timeline">
            <li v-for="(row, index) in experienceRows" :key="index" class="timeline-item" ref="rowEls">
                <div class="timeline-marker">
                    <span class="marker-num mono">{{ String(index + 1).padStart(2, '0') }}</span>
                    <div class="marker-line"></div>
                </div>
                <article class="editorial-card exp-card editorial-card--soft">
                    <div class="exp-meta">
                        <span class="exp-period mono">{{ t(row.dateRange) }}</span>
                        <span class="exp-duration">— {{ t(row.duration) }}</span>
                    </div>
                    <h3 class="exp-company">{{ row.company }}</h3>
                    <p class="exp-role serif italic">{{ t(row.title) }}</p>
                    <div class="exp-tech">
                        <span class="tech-chip" v-for="tech in row.technologies.split(', ')" :key="tech">{{ tech
                            }}</span>
                    </div>
                </article>
            </li>
        </ol>
    </section>
</template>


<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

gsap.registerPlugin(ScrollTrigger)

const sectionWork = ref(null)
const title = ref(null)
const summary = ref<HTMLDivElement | null>(null)
const rowEls = ref<HTMLElement[]>([])

const experienceRows = [
    {
        dateRange: 'work.dates[0]',
        duration: 'work.experiences[0].duration',
        company: 'Web Premiere - Castres',
        title: 'work.experiences[0].title',
        technologies: 'PrestaShop, PHP',
    },
    {
        dateRange: 'work.dates[1]',
        duration: 'work.experiences[1].duration',
        company: 'Sopra Steria - Albi',
        title: 'work.experiences[1].title',
        technologies: 'Java',
    },
    {
        dateRange: 'work.dates[2]',
        duration: 'work.experiences[2].duration',
        company: 'Mecachrome - Montauban',
        title: 'work.experiences[2].title',
        technologies: 'PHP, Symfony, Batch',
    },
    {
        dateRange: 'work.dates[3]',
        duration: 'work.experiences[3].duration',
        company: 'Pro a Pro Distribution - Montauban',
        title: 'work.experiences[3].title',
        technologies: 'PHP',
    },
    {
        dateRange: 'work.dates[4]',
        duration: 'work.experiences[4].duration',
        company: 'APEM SAS - Caussade',
        title: 'work.experiences[4].title',
        technologies: 'Office 365',
    },
]

onMounted(() => {
    if (!title.value || !sectionWork.value || !summary.value) return

    nextTick(() => {
        gsap.from(title.value, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionWork.value,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        })

        gsap.from(rowEls.value, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionWork.value,
                start: 'top 75%',
            },
        })

        if (summary.value) {
            gsap.from(summary.value?.children, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
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
.work {
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
.mono { font-family: 'Fira Code', monospace; }
.italic { font-style: italic; }

/* ── Header ── */
.work-header {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--border);

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
        gap: 24px;
    }

    .work-title {
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

    .summary {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
        text-align: right;

        @media screen and (max-width: 500px) {
            align-items: flex-start;
            text-align: left;
        }

        .summary-label {
            font-family: 'Fira Code', monospace;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--graphite);
        }

        .summary-duration {
            font-family: 'Instrument Serif', serif;
            font-size: 36px;
            font-style: italic;
            color: var(--ink);
            letter-spacing: -0.02em;
            line-height: 1;
        }
    }
}

/* ── Timeline ── */
.timeline {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
}

.timeline-item {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 16px;
    align-items: stretch;
    position: relative;

    @media screen and (max-width: 600px) {
        grid-template-columns: 36px 1fr;
        gap: 12px;
    }
}

.timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 28px;

    .marker-num {
        font-size: 12px;
        color: var(--graphite);
        font-weight: 500;
        background: var(--paper);
        padding: 4px 6px;
        border: 1px solid var(--border);
        border-radius: 4px;
        margin-bottom: 8px;
    }

    .marker-line {
        flex: 1;
        width: 1px;
        background: var(--border);
        background-image: linear-gradient(180deg, var(--border) 50%, transparent 50%);
        background-size: 1px 8px;
        background-repeat: repeat-y;
        margin-top: 4px;
    }
}

.timeline-item:last-child .marker-line {
    display: none;
}

.exp-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px 28px;

    @media screen and (max-width: 500px) {
        padding: 18px 20px;
    }

    .exp-meta {
        display: flex;
        align-items: baseline;
        gap: 12px;
        flex-wrap: wrap;
        padding-bottom: 8px;
        border-bottom: 1px dashed var(--border);
        margin-bottom: 4px;

        .exp-period {
            font-size: 12px;
            color: var(--terracotta);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .exp-duration {
            font-family: 'Fira Code', monospace;
            font-size: 11px;
            color: var(--graphite);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
    }

    .exp-company {
        font-family: 'Syne', sans-serif;
        font-size: clamp(20px, 2vw, 26px);
        font-weight: 700;
        color: var(--ink);
        letter-spacing: -0.02em;
        line-height: 1.1;
    }

    .exp-role {
        font-size: clamp(16px, 1.4vw, 19px);
        color: var(--graphite);
        font-weight: 400;
    }

    .exp-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
    }

    .tech-chip {
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        font-weight: 500;
        color: var(--ink);
        background: var(--paper);
        border: 1px solid var(--border);
        padding: 4px 10px;
        border-radius: 4px;
        transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    &:hover .tech-chip {
        background: var(--terracotta);
        border-color: var(--terracotta);
        color: var(--cream);
    }
}
</style>

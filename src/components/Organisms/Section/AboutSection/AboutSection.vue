<template>
    <section id="about" class="about" ref="sectionAbout">
        <header class="about-header">
            <span class="section-label">{{ $t('about.chapter') }}</span>
            <div class="header-row">
                <h2 class="about-title">
                    <span class="serif italic">{{ $t('about.titleA') }}</span>
                    <span class="syne">{{ $t('about.titleB') }}</span>
                </h2>
                <p class="about-intro" v-html="$t('about.intro')"></p>
            </div>
        </header>

        <div class="editorial-grid">
            <!-- Big photo card -->
            <article class="editorial-card photo-card" ref="cards">
                <div class="photo-frame">
                    <img class="photo" src="/pp.jpg" :alt="$t('about.caption')" loading="lazy" decoding="async">
                </div>
                <div class="photo-caption">
                    <span class="caption-label">{{ $t('about.figLabel') }}</span>
                    <span class="caption-text serif">{{ $t('about.caption') }}</span>
                </div>
            </article>

            <!-- Skill blocks in editorial style -->
            <article class="editorial-card skill-block" ref="cards">
                <div class="block-head">
                    <span class="block-num mono">01</span>
                    <h3 class="block-title serif">{{ $t('about.skills.frontend') }}</h3>
                </div>
                <ul class="block-list">
                    <li v-for="t in frontend" :key="t">{{ t }}</li>
                </ul>
            </article>

            <article class="editorial-card skill-block" ref="cards">
                <div class="block-head">
                    <span class="block-num mono">02</span>
                    <h3 class="block-title serif">{{ $t('about.skills.style') }}</h3>
                </div>
                <ul class="block-list">
                    <li v-for="t in style" :key="t">{{ t }}</li>
                </ul>
            </article>

            <article class="editorial-card skill-block skill-block--wide" ref="cards">
                <div class="block-head">
                    <span class="block-num mono">03</span>
                    <h3 class="block-title serif">{{ $t('about.skills.backend') }}</h3>
                </div>
                <ul class="block-list">
                    <li v-for="t in backend" :key="t">{{ t }}</li>
                </ul>
            </article>

            <article class="editorial-card skill-block" ref="cards">
                <div class="block-head">
                    <span class="block-num mono">04</span>
                    <h3 class="block-title serif">{{ $t('about.skills.devops') }}</h3>
                </div>
                <ul class="block-list">
                    <li v-for="t in devops" :key="t">{{ t }}</li>
                </ul>
            </article>

            <!-- Favorite + Github CTA -->
            <a class="editorial-card favorite-card editorial-card--soft" ref="cards" href="https://github.com/romainb82"
                target="_blank" rel="noopener noreferrer">
                <p class="favorite-text" v-html="$t('about.favorite')"></p>
                <div class="github-cta">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20"
                        fill="currentColor">
                        <path
                            d="M512 76C276.5 76 80 272.5 80 508c0 190.5 123.2 351.8 294.2 408.7 21.5 4 29.3-9.3 29.3-20.7 0-10.2-.4-44.2-.6-80.2-119.7 26-145-50-145-50-19.6-49.7-47.9-62.9-47.9-62.9-39.2-26.8 3-26.3 3-26.3 43.4 3 66.2 44.6 66.2 44.6 38.5 65.9 101.1 46.9 125.7 35.9 3.9-27.9 15-46.9 27.3-57.7-95.6-10.9-196.2-47.8-196.2-212.5 0-47 16.8-85.4 44.4-115.5-4.5-10.9-19.2-54.8 4.3-114.2 0 0 36-11.5 117.9 44 34.2-9.5 70.9-14.2 107.4-14.4 36.4.2 73.2 4.9 107.4 14.4 81.8-55.6 117.7-44 117.7-44 23.6 59.4 8.9 103.3 4.3 114.2 27.6 30.1 44.3 68.5 44.3 115.5 0 165.2-100.8 201.4-196.7 212.1 15.4 13.2 29.1 39.2 29.1 79 0 57-.5 103-0.5 117 0 11.5 7.6 25 29.5 20.7C820.9 859.8 944 698.5 944 508 944 272.5 747.5 76 512 76z" />
                    </svg>
                    <span>github.com/romainb82</span>
                    <MoveUpRight class="cta-arrow" />
                </div>
            </a>
        </div>
    </section>
</template>

<script setup lang='ts'>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const sectionAbout = ref(null)
const cards = ref<HTMLElement[]>([])

const frontend = ['JavaScript', 'TypeScript', 'Vue', 'React', 'Angular']
const style = ['CSS', 'SCSS']
const backend = ['Node', 'Express', 'Symfony', 'Java', 'MySQL', 'PostgreSQL', 'MongoDB', 'Vertica']
const devops = ['Nginx', 'Docker', 'GitHub Actions', 'CI/CD', 'Bash', 'Vite']

gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    gsap.from(sectionAbout.value, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: sectionAbout.value,
            start: 'top 85%',
        },
    })

    gsap.from(cards.value, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: cards.value[0],
            start: 'top 90%',
        },
    })
});
</script>

<style scoped lang='scss'>
.about {
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

/* ── Editorial header ── */
.about-header {
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

    .about-title {
        font-size: clamp(48px, 7vw, 96px);
        line-height: 0.95;
        letter-spacing: -0.04em;
        color: var(--ink);

        .serif {
            font-style: italic;
            font-weight: 400;
            color: var(--terracotta);
        }

        .syne {
            display: block;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 0.1em;
        }
    }

    .about-intro {
        font-family: 'Instrument Serif', serif;
        font-size: clamp(20px, 1.8vw, 26px);
        line-height: 1.4;
        color: var(--ink);
        font-style: italic;
        max-width: 480px;
        letter-spacing: -0.01em;

        :deep(b) {
            color: var(--terracotta);
            font-style: italic;
            font-weight: 400;
        }
    }
}

/* ── Bento grid ── */
.editorial-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(160px, auto);
    gap: 16px;

    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
    }
}

/* ── Photo card ── */
.photo-card {
    grid-column: span 2;
    grid-row: span 2;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 380px;

    @media screen and (max-width: 500px) {
        grid-column: span 1;
        grid-row: span 1;
    }

    .photo-frame {
        flex: 1;
        overflow: hidden;
        border-radius: 4px;
        background: var(--paper);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 60%, rgba(26, 26, 26, 0.05) 100%);
            pointer-events: none;
        }
    }

    .photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    &:hover .photo {
        transform: scale(1.04);
    }

    .photo-caption {
        display: flex;
        align-items: baseline;
        gap: 8px;
        padding: 4px 8px;

        .caption-label {
            font-family: 'Fira Code', monospace;
            font-size: 11px;
            text-transform: uppercase;
            color: var(--graphite);
            letter-spacing: 0.08em;
        }

        .caption-text {
            font-size: 16px;
            color: var(--ink);
            font-style: italic;
        }
    }
}

/* ── Skill blocks ── */
.skill-block {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    gap: 14px;

    &--wide {
        grid-column: span 2;

        @media screen and (max-width: 500px) {
            grid-column: span 1;
        }
    }

    .block-head {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--border);

        .block-num {
            font-size: 11px;
            color: var(--terracotta);
            font-weight: 500;
        }

        .block-title {
            font-size: 22px;
            color: var(--ink);
            font-style: italic;
        }
    }

    .block-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;

        li {
            font-family: 'Fira Code', monospace;
            font-size: 13px;
            color: var(--ink);
            display: flex;
            align-items: center;
            transition: color 0.25s ease, transform 0.25s ease;

            &::before {
                content: '+';
                color: var(--terracotta);
                margin-right: 8px;
                font-weight: 500;
            }

            &:hover {
                color: var(--terracotta);
                transform: translateX(3px);
            }
        }
    }
}

/* ── Favorite / Github card ── */
.favorite-card {
    grid-column: span 4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    background: var(--ink);
    color: var(--cream);
    border-color: var(--ink);
    cursor: pointer;

    @media screen and (max-width: 1024px) {
        grid-column: span 2;
    }

    @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media screen and (max-width: 500px) {
        grid-column: span 1;
    }

    &:hover {
        background: var(--terracotta);
        border-color: var(--terracotta);
        box-shadow: 4px 4px 0 var(--ink);
    }

    .favorite-text {
        font-family: 'Instrument Serif', serif;
        font-size: clamp(18px, 1.6vw, 22px);
        line-height: 1.4;
        color: var(--cream);
        font-style: italic;
        max-width: 600px;

        :deep(b) {
            color: var(--terracotta-light);
            font-weight: 400;
        }
    }

    &:hover .favorite-text :deep(b) {
        color: var(--cream);
    }

    .github-cta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 12px 18px;
        background: rgba(250, 248, 242, 0.08);
        border: 1px solid rgba(250, 248, 242, 0.2);
        border-radius: 999px;
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        flex-shrink: 0;
        transition: background 0.25s ease, gap 0.25s ease;

        svg {
            color: var(--cream);
            flex-shrink: 0;
        }

        .cta-arrow {
            width: 14px;
            height: 14px;
            transition: transform 0.25s ease;
        }
    }

    &:hover .github-cta {
        background: var(--cream);
        border-color: var(--cream);
        color: var(--ink);

        svg {
            color: var(--ink);
        }

        .cta-arrow {
            transform: translate(2px, -2px);
        }
    }
}
</style>

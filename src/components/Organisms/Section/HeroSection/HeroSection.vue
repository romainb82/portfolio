<template>
    <section id="hero" class="hero">
        <!-- Editorial header -->
        <div class="hero-top">
            <div class="hero-meta">
                <span class="meta-item">{{ $t('hero.issue') }}</span>
                <span class="meta-item">{{ $t('hero.kicker') }}</span>
            </div>
            <div class="hero-meta hero-meta--right">
                <span class="meta-item">{{ $t('hero.location') }}</span>
                <span class="meta-item dot-live"><span class="live-dot"></span> {{ $t('hero.available') }}</span>
            </div>
        </div>

        <!-- Massive editorial title -->
        <h1 class="hero-title">
            <span class="line line-1">
                <span class="mono-bracket">{</span>
                <em class="serif">{{ $t('hero.line1a') }}</em><span class="dash">—</span><em class="serif">{{ $t('hero.line1b') }}</em>
            </span>
            <span class="line line-2">
                {{ $t('hero.line2') }}
                <span class="cursor">▍</span>
            </span>
            <span class="line line-3">
                <span class="mono-bracket">}</span>
                <span class="signature">{{ $t('hero.signature') }}</span>
            </span>
        </h1>

        <!-- Editorial intro grid -->
        <div class="hero-grid">
            <article class="editorial-card hero-quote">
                <span class="quote-mark">"</span>
                <p class="quote-text" v-html="$t('hero.description')"></p>
                <div class="quote-sign">
                    <span>{{ $t('hero.quoteSign') }}</span>
                    <span class="quote-year">2026</span>
                </div>
            </article>

            <article class="editorial-card hero-cta-card editorial-card--soft">
                <span class="section-label">{{ $t('hero.explore') }}</span>
                <h3 class="cta-title serif">{{ $t('hero.ctaTitle') }}</h3>
                <a class="cta-btn" href="#project" id="btn-project">
                    <span>{{ $t('hero.btn') }}</span>
                    <MoveRight class="arrow" />
                </a>
            </article>

            <article class="editorial-card hero-stats">
                <div class="stat">
                    <span class="stat-value mono">3+</span>
                    <span class="stat-label">{{ $t('hero.stats.years') }}</span>
                </div>
                <div class="divider"></div>
                <div class="stat">
                    <span class="stat-value mono">15+</span>
                    <span class="stat-label">{{ $t('hero.stats.tech') }}</span>
                </div>
                <div class="divider"></div>
                <div class="stat">
                    <span class="stat-value mono">3</span>
                    <span class="stat-label">{{ $t('hero.stats.projects') }}</span>
                </div>
            </article>
        </div>

        <!-- Social row -->
        <div class="hero-socials">
            <span class="socials-label">{{ $t('hero.socials') }}</span>
            <div class="social-row">
                <ButtonSocial v-for="social in socialNetwork" :icon="social.icon" :label="social.label"
                    :link="social.link" :key="social.id">
                </ButtonSocial>
            </div>
        </div>

        <Carrousel id="Carrousel"></Carrousel>
    </section>
</template>

<script setup lang='ts'>
import gsap from 'gsap';
import ButtonSocial from '@/components/Atoms/ButtonSocial/ButtonSocial.vue';
import { MoveRight } from 'lucide-vue-next';
import Carrousel from '@/components/Organisms/Carrousel/Carrousel.vue';
import { onMounted } from 'vue';
import { Github, Linkedin, Mail, Instagram } from 'lucide-vue-next';

const socialNetwork = [
    { id: 1, label: 'Github', icon: Github, link: 'https://github.com/romainb82' },
    { id: 2, label: 'Linkedin', icon: Linkedin, link: 'https://www.linkedin.com/in/romain-bessede-688249203/' },
    { id: 3, label: 'Email', icon: Mail, link: 'mailto:romain@web-premiere.fr' },
    { id: 4, label: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/roooomain___/' }
]

onMounted(() => {
    const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' }
    });

    tl.from('.hero-top', { y: -20, opacity: 0 })
        .from('.hero-title .line', { y: 60, opacity: 0, stagger: 0.12, duration: 1 }, "<0.1")
        .from('.hero-grid > *', { y: 40, opacity: 0, stagger: 0.1 }, "<0.3")
        .from('.hero-socials', { y: 20, opacity: 0 }, "<0.2")
        .from('#Carrousel', { y: 40, opacity: 0 }, "<0.1");
});
</script>

<style scoped lang='scss'>
.hero {
    width: 100%;
    padding: 60px 52px 150px;
    display: flex;
    flex-direction: column;
    gap: 64px;

    @media screen and (max-width: 768px) {
        padding: 40px 20px 80px;
        gap: 40px;
    }

    @media screen and (max-width: 375px) {
        padding: 30px 10px 50px;
    }
}

/* ── Editorial top header ── */
.hero-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);

    .hero-meta {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;

        &--right {
            justify-content: flex-end;
        }
    }

    .meta-item {
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.1em;
        color: var(--graphite);
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .live-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--forest);
        box-shadow: 0 0 8px var(--forest);
        animation: livePulse 1.8s ease-in-out infinite;
    }

    @media screen and (max-width: 600px) {
        .hero-meta--right {
            justify-content: flex-start;
        }
    }
}

@keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
}

/* ── Massive editorial title ── */
.hero-title {
    margin: 0;
    line-height: 0.92;
    color: var(--ink);
    font-weight: 400;
    /* Le titre se dimensionne par rapport à sa propre largeur (cqw)
       pour que « DÉVELOPPEUR » ne déborde jamais du viewport */
    container-type: inline-size;
    max-width: 100%;

    .line {
        display: block;
    }

    .line-1 {
        font-family: 'Instrument Serif', serif;
        font-size: clamp(36px, 9cqw, 130px);
        font-style: italic;
        letter-spacing: -0.03em;
        display: flex;
        align-items: baseline;
        gap: 0.25em;
        flex-wrap: wrap;

        em {
            font-style: italic;
            font-family: 'Instrument Serif', serif;
        }

        .dash {
            font-family: 'Instrument Serif', serif;
            font-style: normal;
        }
    }

    .line-2 {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        /* ~13.7em de large (11 lettres + curseur) : 7.2cqw tient dans 100% du conteneur */
        font-size: clamp(20px, 7.2cqw, 160px);
        letter-spacing: -0.05em;
        white-space: nowrap;
        color: var(--ink);
        text-transform: uppercase;
        margin-top: -0.1em;

        .cursor {
            color: var(--terracotta);
            display: inline-block;
            margin-left: 0.05em;
            animation: blink 1.1s steps(2, start) infinite;
        }
    }

    .line-3 {
        display: flex;
        align-items: center;
        gap: 16px;
        font-family: 'Instrument Serif', serif;
        font-size: clamp(28px, 4.5vw, 60px);
        font-style: italic;
        color: var(--graphite);
        margin-top: 0.2em;

        .signature {
            font-family: 'Fira Code', monospace;
            font-size: clamp(13px, 1.4vw, 18px);
            color: var(--graphite);
            font-style: normal;
            letter-spacing: -0.01em;
        }
    }

    .mono-bracket {
        font-family: 'Fira Code', monospace;
        color: var(--terracotta);
        font-style: normal;
        font-size: 0.7em;
        font-weight: 300;
    }
}

@keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
}

/* ── Bento grid intro ── */
.hero-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.2fr;
    gap: 16px;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}

.hero-quote {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 36px 32px;
    position: relative;

    @media screen and (max-width: 1024px) {
        grid-column: span 2;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 1;
    }

    .quote-mark {
        font-family: 'Instrument Serif', serif;
        font-size: 96px;
        line-height: 0.6;
        color: var(--terracotta);
        font-style: italic;
    }

    .quote-text {
        font-family: 'Instrument Serif', serif;
        font-size: clamp(20px, 2vw, 26px);
        line-height: 1.35;
        color: var(--ink);
        font-style: italic;
        letter-spacing: -0.01em;

        :deep(b) {
            font-style: italic;
            color: var(--terracotta);
            font-weight: 400;
        }
    }

    .quote-sign {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        color: var(--graphite);
        text-transform: uppercase;
        letter-spacing: 0.1em;

        .quote-year {
            color: var(--graphite);
        }
    }
}

.hero-cta-card {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    background: var(--terracotta);
    border-color: var(--terracotta);
    color: var(--cream);

    &:hover {
        box-shadow: 4px 4px 0 var(--ink);
        border-color: var(--ink);
    }

    :deep(.section-label) {
        color: rgba(250, 248, 242, 0.7);

        &::before {
            background: rgba(250, 248, 242, 0.5);
        }
    }

    .cta-title {
        font-family: 'Instrument Serif', serif;
        font-size: clamp(22px, 2.2vw, 28px);
        font-style: italic;
        line-height: 1.15;
        color: var(--cream);
    }

    .cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        align-self: flex-start;
        padding: 12px 22px;
        background: var(--cream);
        color: var(--ink);
        border-radius: 999px;
        font-family: 'Fira Code', monospace;
        font-weight: 500;
        font-size: 13px;
        transition: transform 0.25s ease, gap 0.25s ease;

        .arrow {
            width: 16px;
            height: 16px;
            transition: transform 0.25s ease;
        }

        &:hover {
            transform: translateY(-2px);
            gap: 14px;

            .arrow {
                transform: translateX(3px);
            }
        }
    }
}

.hero-stats {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    @media screen and (max-width: 1024px) {
        grid-column: span 2;
        flex-direction: row;
        align-items: center;
    }

    @media screen and (max-width: 600px) {
        grid-column: span 1;
        flex-direction: column;
    }

    .stat {
        display: flex;
        align-items: baseline;
        gap: 12px;
        flex: 1;

        .stat-value {
            font-family: 'Instrument Serif', serif;
            font-size: clamp(40px, 4vw, 52px);
            color: var(--ink);
            font-style: italic;
            line-height: 1;
        }

        .stat-label {
            font-family: 'Fira Code', monospace;
            font-size: 11px;
            color: var(--graphite);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
    }

    .divider {
        height: 1px;
        background: var(--border);
        width: 100%;

        @media screen and (max-width: 1024px) {
            width: 1px;
            height: 40px;
        }

        @media screen and (max-width: 600px) {
            width: 100%;
            height: 1px;
        }
    }
}

/* ── Social row ── */
.hero-socials {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .socials-label {
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--graphite);
        font-weight: 500;
    }

    .social-row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
}
</style>

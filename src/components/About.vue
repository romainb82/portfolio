<script setup>
import "@/assets/css/about.css"

import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
    <section class="about" id="about">
        <div class="about-grid">
            <div class="about-text">
                <h2>... /About me ...</h2>
                <p>Hello! I'm Romain, I'm a <em>full-stack developer</em>.<br />
                    More than <strong>3 years</strong> experience.
                </p>
                <p>Some of <em>my favorite technologies</em>,<br />
                    topics, or tools that I worked with:
                </p>
            </div>

            <div class="about-tags">
                <div class="tag-block">
                    <h3>Front-end</h3>
                    <p>TypeScript / Vue / React / Angular / Vite</p>
                </div>

                <div class="tag-block">
                    <h3>Styles</h3>
                    <p>CSS / SCSS / Tailwind </p>
                </div>

                <div class="tag-block">
                    <h3>Back-end</h3>
                    <p>Node / Express / Symfony / Java / MySQL / PostgreSQL / MongoDB / Vertica</p>
                </div>

                <div class="tag-block">
                    <h3>DevOps</h3>
                    <p>Docker / Nginx / GitHub Actions / CI/CD / Bash</p>
                </div>
            </div>

            <div class="about-photo">
                <img src="@/assets/pp.jpg" alt="Photo of Romain"/>
            </div>
        </div>
    </section>
    </template>

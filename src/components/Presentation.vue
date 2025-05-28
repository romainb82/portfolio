<script setup>
import "@/assets/css/presentation.css"

import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
    <section class="hero">
        <div class="hero-text">
            <div class="line">
                <h1 class="title">{{ t.heroTitle }}</h1>
                <div class="project-button-container">
                    <div class="project-button">
                        <span class="project-label">{{ t.projects }}</span>
                    </div>
                    <a href="#projects" class="arrow-circle">→</a>
                </div>
            </div>
            <div class="text-container">
                <p class="description" v-html="t.heroDescription"></p>
                <h2 class="subtitle" v-html="t.heroSubTitle"></h2>
            </div>
        </div>
        <div class="socials">
            <a href="https://github.com/romainb82">
                <img src="@/assets/Github_Icons.svg" alt="GitHub icon" class="social-icon" />
                Github
            </a>
            <a href="https://www.linkedin.com/in/romain-bessede-688249203">
                <img src="@/assets/Linkedin_Icons.svg" alt="LinkedIn icon" class="social-icon" />
                LinkedIn
            </a>
            <a href="#" class="telegram">
                <img src="@/assets/Telegram_Icons.svg" alt="Telegram icon" class="social-icon" />
                Telegram
            </a>
            <a href="#">
                <img src="@/assets/Facebook_Icons.svg" alt="Facebook icon" class="social-icon" />
                Facebook
            </a>
            <a href="#">
                <img src="@/assets/Instagram_Icons.svg" alt="Instagram icon" class="social-icon" />
                Instagram
            </a>
        </div>
        <!-- Mettre carousel ici -->
    </section>
</template>
<script setup>
import "@/assets/css/about.css"

import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
    <section class="about" id="about">
      <div class="about-container">
        <!-- Left Column (Text and Skills) -->
        <div class="left-column">
            <div class="about-text">
                <h2 v-html="t.aboutMe"></h2>
                <p v-html="t.hello"></p>
            </div>

            <!-- Skill Tags -->
            <div class="about-tags">
                <div class="tag-block light">
                    <h3 v-html="t.frontEnd"></h3>
                    <p>JavaScript / TypeScript / Vue / React / Angular</p>
                </div>

                <div class="tag-block">
                    <h3 v-html="t.styles"></h3>
                    <p>CSS / SCSS</p>
                </div>

                <div class="tag-block">
                    <h3 v-html="t.backEnd"></h3>
                    <p>Node / Express / Symfony / Java / MySQL / PostgreSQL / MongoDB / Vertica</p>
                </div>

                <div class="tag-block">
                    <h3>DevOps</h3>
                    <p>Docker / Nginx / GitHub Actions / CI/CD / Bash / Vite</p>
                </div>
            </div>

            <div class="about-text">
                <p v-html="t.favoriteTech"></p>
            </div>
          </div>

        <!-- Right Column (Photo) -->
        <!-- Photo -->
        <div class="about-photo">
          <img src="@/assets/pp.jpg" alt="Photo de Romain" />
        </div>
      </div>
    </section>
  </template>
  
<script setup>
import "@/assets/header.css"
import { useI18n } from '@/i18n'

const { lang, t, setLang } = useI18n()

const toggleLang = () => {
  setLang(lang === 'FR' ? 'EN' : 'FR')
}
</script>

<template>
  <header>
    <nav class="header-nav">
      <div class="name">
        <p>Romain</p>
        <p>BESSEDE</p>
      </div>
      <ul class="menu">
        <li><a href="#about">{{ t.about }}</a></li>
        <li><a href="#projects">{{ t.projects }}</a></li>
        <li><a href="#contact">{{ t.contact }}</a></li>
      </ul>
      <div class="lang-container" @click="toggleLang">
        <div class="lang-circle"></div>
        <div class="lang-selector">
          <span :class="{ 'active-lang': lang === 'FR', 'inactive-lang': lang !== 'FR' }">FR</span>
          <span :class="{ 'active-lang': lang === 'EN', 'inactive-lang': lang !== 'EN' }">EN</span>
        </div>
      </div>
    </nav>
  </header>
</template>
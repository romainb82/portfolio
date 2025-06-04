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
      <div class="lang-container">
        <div class="lang-circle"></div>
        <div class="lang-selector">
          <span
            :class="{ 'active-lang': lang === 'FR', 'inactive-lang': lang !== 'FR' }"
            @click="toggleLang('FR')"
          >
            FR
          </span>
          <span
            :class="{ 'active-lang': lang === 'EN', 'inactive-lang': lang !== 'EN' }"
            @click="toggleLang('EN')"
          >
            EN
          </span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useI18n } from '@/i18n'

const { lang, t, setLang } = useI18n()

const toggleLang = (selectedLang) => {
  setLang(selectedLang) // Change la langue directement
}
</script>

<style scoped lang="scss">
@use '@/assets/css/header.scss' as *;
</style>
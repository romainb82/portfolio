<template>
  <section class="work">
    <h2 class="section-title" v-html="t.work"></h2>

    <table class="experience-table">
      <tbody>
        <tr
          v-for="(job, index) in jobs"
          :key="index"
          :class="{ highlighted: hoveredRow === index }"
          @mouseenter="hoveredRow = index"
          @mouseleave="hoveredRow = null"
        >
          <td class="date">
            {{ job.period }}<br />
            <span>{{ job.duration }}</span>
          </td>
          <td class="company">{{ job.company }}</td>
          <td class="role">{{ job.role }}</td>
        </tr>
      </tbody>
    </table>

    <div class="total-exp">
        <div class="containerCV">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13ZM8 12H16V14H8V12ZM8 16H14V18H8V16Z"/>
                </svg>
              </div>
              <a href="/CV_Romain_BESSEDE.pdf" download class="circle">                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M5.63589 19.7784L4.22169 18.3644L15.657 6.92908L10.0712 6.92908V4.92908L19.0712 4.92908L19.0712 13.9291H17.0712L17.0712 8.34326L5.63589 19.7784Z">
                  </path>
                </svg>
            </a>
            </div>
        <div class="yearExp">
            {{ t.totalExp }}<br /><em>3 {{ t.annee }} 2 {{ t.mois }}</em>
        </div>
    </div>


  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const hoveredRow = ref(null)

const jobs = [
  {
    period: '2023-2025',
    duration: '2 years',
    company: 'Sopra Steria - Albi',
    role: 'Alternant Développeur logiciel | Java',
  },
  {
    period: '2022 - 2023',
    duration: '1 year',
    company: 'Mecachrome - Montauban',
    role: 'Alternant Développeur logiciel | PHP Symfony, Batch',
  },
  {
    period: '10 Janvier 2022 - 19 Février 2022',
    duration: '1 month',
    company: 'Pro a Pro Distribution - Montauban',
    role: 'Stagiaire informatique | PHP',
  },
  {
    period: '31 Juin 2021 - 2 Juillet 2022',
    duration: '1 month',
    company: 'APEM SAS - Caussade',
    role: 'Stagiaire informatique | Office 365',
  },
]
</script>

<style scoped lang="scss">
@use '@/assets/css/work.scss' as *;
</style>
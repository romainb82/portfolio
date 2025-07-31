<template>
    <section id="work" class="container-work">
        <div class="flex flex-row items-start justify-end container-row w-full">
            <span class="title">Work</span>
        </div>
        <div class="flex flex-col items-start justify-start container-row w-full">
            <ExperienceRow dateRange="2023 - 2025" duration="2 years" company="Sopra Steria - Albi"
                title="Alternant Développeur logiciel" technologies="Java" />
            <ExperienceRow dateRange="2022 - 2023" duration="1 year" company="Mecachrome - Montauban"
                title="Alternant Développeur logiciel" technologies="PHP, Symfony, Batch" />
            <ExperienceRow dateRange="10 Janviers 2022 - 19 Février 2022" duration="1 Month"
                company="Pro a Pro Distribution - Montauban" title="Stagiaire informatique" technologies="PHP" />
            <ExperienceRow dateRange="31 Juin 2021 - 2 Juillet 2022" duration="1 year 1 months"
                company="APEM SAS - Caussade" title="Stagiaire informatique" technologies="Office 365" />
        </div>
        <div class="flex flex-col items-end justify-start container-row w-full">
            <span class="sub-text">Work experience</span>
            <span class="sub-text">3 years 2 months</span>
        </div>
    </section>

</template>
<script setup lang='ts'>
import ExperienceRow from '@/components/Atoms/ExperienceRow/ExperienceRow.vue';

//Import packages

//Import components

//Import assets

//Import stores

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

    .container-row {

        .title {
            @apply font-firaCode text-white;
            font-weight: 700;
            font-size: 132px;
            line-height: 90px;
            width: max-content;
            text-wrap: nowrap;
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
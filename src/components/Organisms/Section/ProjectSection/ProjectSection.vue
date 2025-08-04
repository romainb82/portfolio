<template>
    <section id="project" class="container-project">
        <span class="title">… /Projects …</span>
        <div class="flex flex-col items-start gap-[100px] w-full">

            <ProjectShowcase title="Kana Master"
                :technologies="['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS']"
                description="Kana Master is an <b>iOS application designed</b> for learning Katakana and Hiragana. It includes various tests and practical exercises that help in learning and memorizing Japanese characters. The app also offers audio training for correct pronunciation and demonstrates how to properly draw each character."
                mainImage="https://static.vecteezy.com/ti/vecteur-libre/p2/1434757-admin-panel-neumorphic-dashboard-ui-kit-vectoriel.jpg"
                link="" />

            <ProjectShowcase title="Kana Master" :reverse="true"
                :technologies="['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS']"
                description="Kana Master is an <b>iOS application designed</b> for learning Katakana and Hiragana. It includes various tests and practical exercises that help in learning and memorizing Japanese characters. The app also offers audio training for correct pronunciation and demonstrates how to properly draw each character."
                mainImage="https://static.vecteezy.com/ti/vecteur-libre/p2/1434757-admin-panel-neumorphic-dashboard-ui-kit-vectoriel.jpg"
                link="" />
        </div>

    </section>

</template>
<script setup lang='ts'>
import ProjectShowcase from '@/components/Molecules/ProjectShowcase/ProjectShowcase.vue';

//Import packages

//Import components

//Import assets

//Import stores

</script>
<style scoped lang='scss'>
.container-project {
    width: 100%;
    height: max-content;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
    padding: 0px 52px;
    padding-bottom: 150px !important;
    overflow-x: clip;

    @media screen and (max-width: 768px) {
        padding: 0px 20px;
    }

     @media screen and (max-width: 426px) {
        align-items: flex-start;
    }

    @media screen and (max-width: 375px) {
        padding: 0px 10px;
    }

    .title {
        @apply font-openSans text-white;
        font-size: 24px;
        font-weight: 500;
        text-wrap: nowrap;
    }
}
</style>
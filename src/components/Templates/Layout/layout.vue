<template>
    <Header></Header>
    <main>
        <RouterView></RouterView>
    </main>
    <Footer></Footer>
</template>
<script setup lang='ts'>
//Import packages
import { RouterView } from 'vue-router';


//Import components
import Header from '@/components/Organisms/Header/Header.vue';
import Footer from '@/components/Organisms/Footer/Footer.vue';

//Import assets

//Import stores

</script>
<style scoped lang='scss'>
</style>
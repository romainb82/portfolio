<template>
    <Header></Header>
    <main>
        <RouterView></RouterView>
    </main>
    <Footer></Footer>
</template>
<script setup lang='ts'>
import { RouterView } from 'vue-router';
import Header from '@/components/Organisms/Header/Header.vue';
import Footer from '@/components/Organisms/Footer/Footer.vue';

</script>
<style scoped lang='scss'>
</style>
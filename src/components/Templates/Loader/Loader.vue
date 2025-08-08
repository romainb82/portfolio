<template>
    <div class="loader">
        <h1 class="name-container">
            <span v-for="(letter, index) in 'Romain'" :key="index" class="letter-wrapper">
                <span class="letter">{{ letter }}</span>
            </span>
        </h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import router from "@/router";

onMounted(() => {
    gsap.from(".letter", {
        y: "100%", 
        duration: 1.2,
        stagger: 0.1, 
        ease: "power4.out", 
        onComplete: () => {
            gsap.to(".loader", {
                duration: 0.6,
                opacity: 0,
                delay: 0.5,
                pointerEvents: "none",
                onComplete: () => {
                    sessionStorage.setItem('loaderScreen', 'true');
                    router.push({ name: 'HomePage' });
                }
            });
        }
    });
});
</script>

<style scoped lang="scss">

.loader {
    @apply bg-black;
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.name-container {
    @apply text-white;
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 12vw, 8rem);
    font-weight: 800;
    display: flex; 
}

.letter-wrapper {
    display: inline-block;
    overflow: hidden; 
    padding-bottom: 0.1em; 
}

.letter {
    display: inline-block;
    transform: translateZ(0); 
}
</style>
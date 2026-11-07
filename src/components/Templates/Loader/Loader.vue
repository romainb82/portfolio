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

onMounted(async () => {
    /* On attend la police (Instrument Serif) avant d'animer : sinon les lettres
       sont mesurées avec la police de secours puis sautent / se chevauchent. */
    try { await document.fonts.ready } catch { /* navigateur sans Font Loading API */ }

    gsap.set(".letter", { visibility: "visible" });
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
    background: var(--paper);
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.name-container {
    color: var(--ink);
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: clamp(3rem, 12vw, 8rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1;
    display: flex;
    /* Le masque est sur le mot entier : les débords de l'italique ne sont
       plus coupés lettre par lettre (ce qui donnait un effet de chevauchement). */
    overflow: hidden;
    padding: 0.05em 0.15em 0.12em;
}

.letter-wrapper {
    display: inline-block;
}

.letter {
    display: inline-block;
    /* invisible tant que la police n'est pas prête, GSAP l'affiche au démarrage */
    visibility: hidden;
    transform: translateZ(0); 
    will-change: transform;
}
</style>
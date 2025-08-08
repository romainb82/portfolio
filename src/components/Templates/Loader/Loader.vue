<template>
    <div class="loader" ref="loaderRef">
        <svg class="initials-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
            <path ref="pathR" d="M10 90 L10 10 L50 10 Q70 10 70 40 Q70 60 50 60 L10 60" fill="none" stroke="white"
                stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
            <path ref="pathRInner" d="M50 60 L70 90" fill="none" stroke="white" stroke-width="6" stroke-linejoin="round"
                stroke-linecap="round" />
            <path ref="pathB" d="M90 90 L90 10 L130 10 Q150 10 150 30 Q150 50 130 50 L90 50" fill="none" stroke="white"
                stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
            <path ref="pathBInner" d="M90 50 L130 50 Q150 50 150 70 Q150 90 130 90 L90 90" fill="none" stroke="white"
                stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import router from "@/router";

const loaderRef = ref<HTMLElement | null>(null);
const pathR = ref<SVGPathElement | null>(null);
const pathRInner = ref<SVGPathElement | null>(null);
const pathB = ref<SVGPathElement | null>(null);
const pathBInner = ref<SVGPathElement | null>(null);

onMounted(() => {
    const paths = [pathR.value, pathRInner.value, pathB.value, pathBInner.value];

    paths.forEach((path) => {
        if (path) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length.toString();
            path.style.strokeDashoffset = length.toString();
        }
    });

    const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.inOut" },
        onComplete: () => {
            if (loaderRef.value) {
                gsap.to(loaderRef.value, {
                    duration: 0.8,
                    opacity: 0,
                    pointerEvents: "none",
                    onComplete: () => {
                        loaderRef.value!.style.display = "none";
                        sessionStorage.setItem('loaderScreen', 'true');
                        router.push({ name: 'LayoutPage' });
                    },
                });
            }
        },
    });

    tl.to(pathR.value, { strokeDashoffset: 0 })
        .to(pathRInner.value, { strokeDashoffset: 0 }, ">0.2")
        .to(pathB.value, { strokeDashoffset: 0 }, ">0.2")
        .to(pathBInner.value, { strokeDashoffset: 0 }, ">0.2")
        .to({}, { duration: 0.5 });
});
</script>

<style scoped lang="scss">
.loader {
    position: fixed;
    inset: 0;
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    user-select: none;
    width: 100%;
    height: 100vh;
}

.initials-svg {
    width: 200px;
    height: 100px;
    stroke: white;
    stroke-width: 6;
    fill: none;
    user-select: none;
}
</style>

<template>
    <div id="carousel-wrapper" class="carousel-wrapper" :class="{ 'is-animating': isAnimating }">
        <div class="carousel-container">
            <div class="carousel" :style="carouselStyle">
                <div v-for="(slide, index) in slides" :key="slide.id" :class="getItemClass(index)"
                    :style="{ width: ITEM_WIDTH + 'px', marginRight: index === slides.length - 1 ? 0 : ITEM_GAP + 'px' }">

                    <div class="item-image">
                        <img :src="slide.image" alt="Slide Image" />
                    </div>

                    <div class="item-content">
                        <h2>{{ slide.title }}</h2>
                        <p>{{ slide.description }}</p>
                        <div class="flex flex-row items-end justify-start gap-[10px] w-[80%]">
                            <button>Read more</button>
                            <button>
                                <MoveRight />
                            </button>
                        </div>
                    </div>

                    <div class="item-content-inactive">
                        <h2>{{ slide.title }}</h2>
                        <p>{{ slide.description }}</p>
                        <div class="flex flex-row items-end justify-start gap-[10px] w-[80%]">
                            <button>Read more</button>
                            <button>
                                <MoveRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button @click="prev" class="nav-arrow prev-arrow">
            <span>&#x2190;</span>
        </button>
        <button @click="next" class="nav-arrow next-arrow">
            <span>&#x2192;</span>
        </button>

        <div class="pagination-dots">
            <span v-for="(slide, index) in slides" :key="index" :class="{ active: index === activeIndex }"
                @click="goTo(index)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { MoveRight } from "lucide-vue-next";
import gsap from "gsap";

const slides = ref([
    { id: 1, title: "The simplest example is kafka + golang", description: "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.", image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, title: "Exploring Vue 3 Composition API", description: "A deep dive into the new features and benefits of the Vue 3 Composition API for building scalable applications.", image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, title: "Mastering SCSS for Modern Web Design", description: "Learn advanced SCSS techniques to create responsive, maintainable, and beautiful stylesheets.", image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, title: "Introduction to Docker Containers", description: "Understand the fundamentals of containerization with Docker and how it streamlines development.", image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, "title": "Building Real-time Apps with WebSockets", "description": "A practical guide to implementing real-time communication in your web applications using WebSockets.", "image": "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
]);
const activeIndex = ref(1);
const windowWidth = ref(0);

const isAnimating = ref(false);

const AUTOPLAY_DELAY = 5000;
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const ITEM_GAP = 20;
const ITEM_WIDTH = computed(() => {
    if (windowWidth.value <= 768) return windowWidth.value - 40;
    return 650;
});
const carouselStyle = computed(() => {
    const totalItemWidth = ITEM_WIDTH.value + ITEM_GAP;
    return {
        width: (slides.value.length * totalItemWidth - ITEM_GAP) + "px",
        marginLeft: `calc(50% - ${ITEM_WIDTH.value / 2}px)`,
    };
});
const isActive = (index: number) => index === activeIndex.value;
const getItemClass = (index: number) => {
    let classes = 'carousel-item';
    if (isActive(index)) classes += ' active';
    return classes;
};

const next = () => {
    if (isAnimating.value) return;
    stopAutoplay();
    activeIndex.value = (activeIndex.value + 1) % slides.value.length;
};
const prev = () => {
    if (isAnimating.value) return;
    stopAutoplay();
    activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length;
};
const goTo = (index: number) => {
    if (isAnimating.value || index === activeIndex.value) return;
    stopAutoplay();
    activeIndex.value = index;
};


const startAutoplay = () => {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(() => {
        if (!isAnimating.value) {
            activeIndex.value = (activeIndex.value + 1) % slides.value.length;
        }
    }, AUTOPLAY_DELAY);
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};


function animateSlideTransition(newSlideEl: Element | null, oldSlideEl: Element | null) {
    if (newSlideEl) {
        const contentElements = newSlideEl.querySelectorAll('.item-content > *');
        const inactiveContent = newSlideEl.querySelector('.item-content-inactive');
        const image = newSlideEl.querySelector('.item-image img');

        gsap.killTweensOf([contentElements, inactiveContent, image]);

        gsap.set(inactiveContent, { opacity: 0 });

        gsap.set(contentElements, { opacity: 0, y: 30 });
        gsap.to(contentElements, {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
            delay: 0.5, ease: 'power3.out'
        });

        gsap.fromTo(image,
            { scale: 1.15 },
            { scale: 1, duration: 1.2, ease: 'power2.out' }
        );
    }

    if (oldSlideEl) {
        const oldContentElements = oldSlideEl.querySelectorAll('.item-content > *');
        const oldInactiveContent = oldSlideEl.querySelector('.item-content-inactive');

        gsap.killTweensOf([oldContentElements, oldInactiveContent]);

        gsap.set(oldContentElements, { opacity: 0, y: 30 });
        gsap.set(oldInactiveContent, { opacity: 1 });
    }
}

const handleResize = () => { windowWidth.value = window.innerWidth; };
onUnmounted(() => {
    if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
        stopAutoplay();
    }
});


onMounted(() => {
    const wrapper = document.getElementById('carousel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAutoplay);
        wrapper.addEventListener('mouseleave', startAutoplay);
    }
    window.addEventListener("resize", handleResize);

    handleResize();
    nextTick(() => {

        const initialOffset = activeIndex.value * (ITEM_WIDTH.value + ITEM_GAP);
        gsap.set('.carousel', { x: -initialOffset });

        const allItems = document.querySelectorAll('.carousel-item');
        allItems.forEach((slide, index) => {
            const content = slide.querySelectorAll('.item-content > *');
            const inactiveContent = slide.querySelector('.item-content-inactive');
            const image = slide.querySelector('.item-image img');

            if (index === activeIndex.value) {
                gsap.set(inactiveContent, { opacity: 0 });
                gsap.set(content, { y: 30, opacity: 0 });
                gsap.to(content, {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.3, ease: 'power3.out'
                });
                gsap.fromTo(image, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: 'power2.out' });
            } else {
                gsap.set(content, { opacity: 0 });
                gsap.set(inactiveContent, { opacity: 1 });
            }
        });


        startAutoplay();
    });
});


watch(activeIndex, (newIndex, oldIndex) => {
    const offset = newIndex * (ITEM_WIDTH.value + ITEM_GAP);

    gsap.to('.carousel', {
        x: -offset,
        duration: 1,
        ease: 'power4.inOut',
        onStart: () => {
            isAnimating.value = true;
        },
        onComplete: () => {
            isAnimating.value = false;
            startAutoplay();
        }
    });

    const allItems = document.querySelectorAll('.carousel-item');
    animateSlideTransition(allItems[newIndex], allItems[oldIndex]);
});
</script>

<style scoped lang="scss">
$item-width: 650px;
$item-height: 300px;
$gap: 20px;
$inactive-scale: 1;
$inactive-opacity: 0.6;
$transition-speed: 0.8s;
$transition-curve: cubic-bezier(0.65, 0, 0.35, 1);

.carousel-wrapper {
    position: relative;
    width: 100%;
    min-height: calc($item-height + 150px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        min-height: calc(450px + 150px);
    }
}

.carousel-container {
    width: 100%;
    height: 100%;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);

    @media screen and (max-width: 768px) {
        mask-image: none;
        -webkit-mask-image: none;
        padding: 0 10px;
    }
}

.carousel {
    display: flex;
    align-items: center;
    height: 100%;

}

.carousel-item {
    width: 100%;
    max-width: $item-width;
    height: $item-height;
    flex-shrink: 0;
    border-radius: 40px;
    overflow: hidden;
    position: relative;
    display: flex;
    opacity: $inactive-opacity;
    transform: scale($inactive-scale);
    filter: brightness(0.6);
    transition:
        transform $transition-speed $transition-curve,
        opacity $transition-speed $transition-curve,
        filter $transition-speed $transition-curve;
    margin: 0;

    @media screen and (max-width: 768px) {
        border-radius: 20px;
        height: 450px;
        max-width: 100%;
    }

    .item-image {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        opacity: 0;
        transition: opacity $transition-speed $transition-curve;

        img {
            /* GSAP va manipuler la 'scale' de cette image */
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .item-content {
        pointer-events: none;
    }

    .item-content-inactive {}
}

.carousel-item.active {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

    .item-image {
        opacity: 1;
    }

    .item-content {
        pointer-events: auto;
    }

    .item-content-inactive {

        pointer-events: none;
    }
}

.item-content {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    width: 65%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    @apply bg-black/50 text-white;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 65%;
        top: inherit;
        bottom: 0;
    }

    @media screen and (max-width: 375px) {
        height: 85%;
    }

    h2 {
        @apply font-firaCode;
        font-size: 32px;
        line-height: 32px;

        @media screen and (max-width: 970px) {
            font-size: 20px;
        }
    }

    p {
        @apply font-openSans;
        font-size: 16px;
        line-height: 22px;
        font-weight: 300;
    }

    button {
        @apply bg-white text-black font-openSans;
        height: 50px;
        padding: 12px 24px;
        border-radius: 9999px;
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        width: 100%;
        border: none;
        cursor: pointer;

        @media screen and (max-width: 970px) {
            height: max-content;
            text-wrap: nowrap;
        }

        &:first-of-type {
            flex: 1;
        }

        &:last-child {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            flex: 0 0 50px;

            svg {
                width: 22px;
                height: 22px;
            }
        }
    }
}

.item-content-inactive {
    width: 100%;
    height: 100%;
    padding: 2rem;
    color: #aaa;
    border: 1px solid #444;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    h2 {
        @apply font-firaCode;
        font-size: 32px;
    }

    p {
        @apply font-openSans;
        font-size: 16px;
        font-weight: 300;
    }

    button {
        border: 1px solid;
        @apply text-white font-openSans border-grey-50/30;
        height: 50px;
        padding: 12px 24px;
        border-radius: 9999px;
        font-style: italic;
        font-weight: 400;
        font-size: 16px;
        width: 100%;
        cursor: pointer;

        &:first-of-type {
            width: max-content;
        }

        &:last-child {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            flex: 0 0 50px;

            svg {
                width: 22px;
                height: 22px;
            }
        }
    }
}

.nav-arrow {
    border: 1px solid;
    @apply border-grey-50/30;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;

    span {
        @apply text-white/70;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        top: inherit;
        bottom: 0px;
        transform: inherit !important;
    }
}

.prev-arrow {
    left: 2rem;

    @media screen and (max-width: 768px) {
        left: 10px;
    }
}

.next-arrow {
    right: 2rem;

    @media screen and (max-width: 768px) {
        right: 10px;
    }
}

.pagination-dots {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    gap: 8px;
    z-index: 20;
    height: 70px;
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: background 0.3s ease;

        &.active {
            background: white;
        }
    }
}

.carousel-wrapper.is-animating .nav-arrow {
    opacity: 0.3;
    cursor: wait;
}
</style>

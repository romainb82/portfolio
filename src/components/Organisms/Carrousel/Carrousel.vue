<template>
    <div id="carousel-wrapper" class="carousel-wrapper">
        <div class="carrousel-container">
            <div class="carousel" :style="carouselStyle">
                <div v-for="(slide, index) in slides" :key="slide.id" :class="getItemClass(index)">
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
    </div>


</template>

<script setup lang='ts'>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { MoveRight } from 'lucide-vue-next';

// --- State ---
const slides = ref([
    {
        id: 1,
        title: 'The simplest example is kafka + golang',
        description: 'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.',
        image: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 2,
        title: 'Exploring Vue 3 Composition API',
        description: 'A deep dive into the new features and benefits of the Vue 3 Composition API for building scalable applications.',
        image: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 3,
        title: 'Mastering SCSS for Modern Web Design',
        description: 'Learn advanced SCSS techniques to create responsive, maintainable, and beautiful stylesheets.',
        image: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 4,
        title: 'Introduction to Docker Containers',
        description: 'Understand the fundamentals of containerization with Docker and how it streamlines development.',
        image: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 5,
        title: 'Building Real-time Apps with WebSockets',
        description: 'A practical guide to implementing real-time communication in your web applications using WebSockets.',
        image: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
]);

const activeIndex = ref(1);
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

// --- Methods ---
const next = () => {
    activeIndex.value = (activeIndex.value + 1) % slides.value.length;
};

const prev = () => {
    activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length;
};

const isActive = (index: number) => index === activeIndex.value;

const getItemClass = (index: number) => {
    return isActive(index) ? 'carousel-item active' : 'carousel-item';
};

const handleResize = () => {
    windowWidth.value = window.innerWidth;
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }
});

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
    }
});

// Propriété calculée pour le style du carrousel
const carouselStyle = computed(() => {
    if (typeof window === 'undefined') return {};

    const itemWidthVw = 50;
    const itemMarginPx = 10; // la moitié de la marge (gauche ou droite)

    // Calcul du décalage pour centrer l'élément actif
    const transformValue = 50 - (itemWidthVw / 2) - (activeIndex.value * itemWidthVw);
    const marginOffset = activeIndex.value * itemMarginPx * 2;

    return {
        transform: `translateX(calc(${transformValue}vw - ${marginOffset}px))`
    };
});

</script>
<style scoped lang='scss'>
// --- Variables ---
$item-width: 50vw;
$item-height: 340px;
$inactive-scale: 1;
$inactive-opacity: 0.6;
$transition-speed: 0.8s; // Durée de l'animation
$transition-curve: cubic-bezier(0.65, 0, 0.35, 1); // Courbe d'animation
$text-color: #f0f0f0;

// --- Conteneur parent ---
.carousel-wrapper {
    position: relative;
    width: 100%;
    min-height: calc($item-height + 40px);
    overflow: hidden;
}

// --- Conteneur pour le masque ---
.carrousel-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
}

// --- Conteneur des items ---
.carousel {
    display: flex;
    align-items: center;
    height: 100%;
    transition: transform $transition-speed $transition-curve;
}

// --- Style de base pour TOUS les items ---
.carousel-item {
    width: $item-width;
    height: $item-height;
    flex-shrink: 0;
    margin: 0 10px;
    border-radius: 40px;
    overflow: hidden;
    position: relative; // Pour superposer les couches de contenu
    display: flex;
    opacity: $inactive-opacity;
    transform: scale($inactive-scale);
    filter: brightness(0.6);
    transition: transform $transition-speed $transition-curve,
        opacity $transition-speed $transition-curve,
        filter $transition-speed $transition-curve;

    // --- Style des couches de contenu par défaut (état INACTIF) ---
    .item-image {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        opacity: 0; // L'image est invisible par défaut
        transition: opacity $transition-speed $transition-curve;
    }

    .item-content {
        // Contenu Actif
        opacity: 0;
        pointer-events: none;
    }

    .item-content-inactive {
        opacity: 1;
    }
}

// --- Quand un item devient ACTIF ---
.carousel-item.active {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

    .item-image {
        opacity: 1;
    }

    .item-content {
        opacity: 1;
        pointer-events: auto;
    }

    .item-content-inactive {
        opacity: 0;
        pointer-events: none;
    }
}

// --- Styles des différentes couches ---
.item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

// Contenu pour la carte ACTIVE
.item-content {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    color: $text-color;
    @apply bg-black/50;
    transition: opacity $transition-speed $transition-curve;

    h2 {
        @apply font-firaCode;
        font-size: 32px;
        line-height: 32px;
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

// Contenu pour la carte INACTIVE
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
    transition: opacity $transition-speed $transition-curve;

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

// --- Flèches de navigation ---
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

    span {
        @apply text-white/70;
        font-size: 1.5rem;
    }
}

.prev-arrow {
    left: 2rem;
}

.next-arrow {
    right: 2rem;
}
</style>
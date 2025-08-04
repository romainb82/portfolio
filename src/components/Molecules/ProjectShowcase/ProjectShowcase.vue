<template>
    <section class="project-showcase">
        <div class="showcase-container" :class="{ 'is-reversed': props.reverse }">

            <div class="text-content">
                <h2>{{ props.title }}</h2>
                <div class="tech-tags">
                    <span v-for="tech in props.technologies" :key="tech" class="tag">{{ tech }}</span>
                </div>
                <p class="description" v-html="props.description"></p>
                <div class="project-link-wrapper">
                    <div class="circle-github">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="24" height="24"
                            fill="currentColor">
                            <path
                                d="M512 76C276.5 76 80 272.5 80 508c0 190.5 123.2 351.8 294.2 408.7 21.5 4 29.3-9.3 29.3-20.7 0-10.2-.4-44.2-.6-80.2-119.7 26-145-50-145-50-19.6-49.7-47.9-62.9-47.9-62.9-39.2-26.8 3-26.3 3-26.3 43.4 3 66.2 44.6 66.2 44.6 38.5 65.9 101.1 46.9 125.7 35.9 3.9-27.9 15-46.9 27.3-57.7-95.6-10.9-196.2-47.8-196.2-212.5 0-47 16.8-85.4 44.4-115.5-4.5-10.9-19.2-54.8 4.3-114.2 0 0 36-11.5 117.9 44 34.2-9.5 70.9-14.2 107.4-14.4 36.4.2 73.2 4.9 107.4 14.4 81.8-55.6 117.7-44 117.7-44 23.6 59.4 8.9 103.3 4.3 114.2 27.6 30.1 44.3 68.5 44.3 115.5 0 165.2-100.8 201.4-196.7 212.1 15.4 13.2 29.1 39.2 29.1 79 0 57-.5 103-0.5 117 0 11.5 7.6 25 29.5 20.7C820.9 859.8 944 698.5 944 508 944 272.5 747.5 76 512 76z" />
                        </svg>
                        <div class="circle-arrow" @click="redirectTo(props.link)">
                            <MoveUpRight></MoveUpRight>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-grid-final">
                <div class="item top-left-large">
                    <img :src="props.mainImage" alt="Image 1">
                </div>

                <div class="item bottom-left-1">
                    <img :src="props.mainImage" alt="Image 3">
                </div>
                <div class="item bottom-left-2">
                    <img :src="props.mainImage" alt="Image 4">
                </div>

                <div class="item right-tall">
                    <img :src="props.mainImage" alt="Image 2">
                </div>
            </div>


        </div>
    </section>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { MoveUpRight } from 'lucide-vue-next';

const props = defineProps({
    title: { type: String, required: true },
    technologies: { type: Array as PropType<string[]>, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, required: true },
    link: { type: String, required: true },
    reverse: { type: Boolean, default: false },
});

const redirectTo = (link: string) => {
    window.open(link, '_blank');
}
</script>

<style scoped lang="scss">
.project-showcase {
    width: 100%;
}

.showcase-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    position: relative;

    @media screen and (max-width:1200px) {
        gap: 60px;
    }


    @media screen and (max-width:970px) {
        flex-direction: column;
    }




    &.is-reversed {
        flex-direction: row-reverse;

        @media screen and (max-width:970px) {
            flex-direction: column;
        }

        &::before {
            content: '';
            width: 800px;
            height: 800Px;
            border: 1px solid;
            @apply border-grey-50/30;
            position: absolute;
            left: -300px;
            top: -100px;
            z-index: -1;
            border-radius: 99999px;

            @media screen and (max-width:1220px) {
                width: 600px;
                height: 600Px;
            }

        }
    }

    &::before {
        content: '';
        width: 800px;
        height: 800Px;
        border: 1px solid;
        @apply border-grey-50/30;
        position: absolute;

        right: -300px;
        left: inherit;
        top: -100px;
        z-index: -1;
        border-radius: 99999px;

        @media screen and (max-width:1220px) {
            width: 600px;
            height: 600Px;
        }

        
    }

}

.image-grid-final {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    width: 50%;

    @media screen and (max-width:1200px) {
        display: block;
        height: 100%;


        .item {
            display: none;

            &:first-child {
                display: block;
            }
        }
    }

    @media screen and (max-width:970px) {
        width: 100%;

        .item {
            width: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.item {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}


.top-left-large {
    grid-column: 1 / 5;
    grid-row: 1;
}

.bottom-left-1 {
    grid-column: 1 / 3;
    grid-row: 2;
}

.bottom-left-2 {
    grid-column: 3 / 5;
    grid-row: 2;
}

.right-tall {
    grid-column: 5 / 6;
    grid-row: 1 / 3;
}


.text-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    h2 {
        @apply font-openSans text-white;
        font-size: 24px;
        font-weight: 300;
    }

    .tech-tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .tag {
        border: 1Px solid;
        @apply bg-black font-openSans text-white border-grey-50;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 300;
    }

    .description {
        @apply text-grey-50 font-openSans;
        font-size: 16px;
        max-width: 450px;
        font-weight: 300;

        :deep(b) {
            @apply text-white;
            font-style: italic;
            letter-spacing: 0.05rem;
            font-weight: 400;
        }
    }



    .circle-github {
        border: 1px solid;
        @apply border-grey-50/30;
        border-radius: 99999px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        svg {
            @apply text-white;
            width: 24px;
            height: 24px;
        }

        .circle-arrow {
            @apply bg-white;
            border-radius: 99999px;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            right: -130%;
            transform: translate(-50%, -50%);

            svg {
                @apply text-black;
                width: 24px;
                height: 24px;
            }

            &:hover {
                cursor: pointer;
            }
        }


    }
}
</style>
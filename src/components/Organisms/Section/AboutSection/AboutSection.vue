<template>
    <section id="about" class="container-about" ref="sectionAbout">
        <div class="flex flex-row items-start justify-between container-row container-information w-[76%]">
            <span class="sub-text">{{ $t('about.section') }}</span>
            <p class="description" v-html="$t('about.intro')">
            </p>
        </div>


        <div class="flex flex-row items-center justify-between container-row w-full h-full">
            <div class="flex flex-col items-start justify-start gap-[20px] container-card">

                <div class="flex flex-row items-start justify-between container-row w-full" ref="cards">
                    <SkillCard :label="$t('about.skills.frontend')" :techno="['JavaScript', 'TypeScript', 'Vue', 'React', 'Angular']"
                        variant="light" />
                </div>


                <div class="flex flex-row items-center justify-start gap-[30px] container-row w-full" ref="cards">
                    <SkillCard class="max-w-[80%]" :label="$t('about.skills.style')" :techno="['CSS', 'SCSS']" />
                    <div class="circle-github m-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="24" height="24"
                            fill="currentColor">
                            <path
                                d="M512 76C276.5 76 80 272.5 80 508c0 190.5 123.2 351.8 294.2 408.7 21.5 4 29.3-9.3 29.3-20.7 0-10.2-.4-44.2-.6-80.2-119.7 26-145-50-145-50-19.6-49.7-47.9-62.9-47.9-62.9-39.2-26.8 3-26.3 3-26.3 43.4 3 66.2 44.6 66.2 44.6 38.5 65.9 101.1 46.9 125.7 35.9 3.9-27.9 15-46.9 27.3-57.7-95.6-10.9-196.2-47.8-196.2-212.5 0-47 16.8-85.4 44.4-115.5-4.5-10.9-19.2-54.8 4.3-114.2 0 0 36-11.5 117.9 44 34.2-9.5 70.9-14.2 107.4-14.4 36.4.2 73.2 4.9 107.4 14.4 81.8-55.6 117.7-44 117.7-44 23.6 59.4 8.9 103.3 4.3 114.2 27.6 30.1 44.3 68.5 44.3 115.5 0 165.2-100.8 201.4-196.7 212.1 15.4 13.2 29.1 39.2 29.1 79 0 57-.5 103-0.5 117 0 11.5 7.6 25 29.5 20.7C820.9 859.8 944 698.5 944 508 944 272.5 747.5 76 512 76z" />
                        </svg>
                        <div class="circle-arrow" @click="redirectTo('https://github.com/romainb82')">
                            <MoveUpRight></MoveUpRight>
                        </div>
                    </div>
                </div>

                <div class=" flex flex-row items-start justify-between container-row w-full" ref="cards">
                    <SkillCard :label="$t('about.skills.backend')"
                        :techno="['Node', 'Express', 'Symfony', 'Java', 'MySQL', 'PostgreSQL', 'MongoDB', 'Vertica']" />
                </div>

                <div class=" flex flex-row items-center justify-start gap-[20px] container-row container-description w-full"
                    ref="cards">
                    <p class="description-light"  v-html="$t('about.favorite')">
                    </p>


                    <SkillCard :label="$t('about.skills.devops')"
                        :techno="['Nginx', 'Docker', 'GitHub Actions', 'CI/CD', 'Bash', 'Vite']" />
                </div>

                <div class="circle-github m-visible">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="24" height="24"
                        fill="currentColor">
                        <path
                            d="M512 76C276.5 76 80 272.5 80 508c0 190.5 123.2 351.8 294.2 408.7 21.5 4 29.3-9.3 29.3-20.7 0-10.2-.4-44.2-.6-80.2-119.7 26-145-50-145-50-19.6-49.7-47.9-62.9-47.9-62.9-39.2-26.8 3-26.3 3-26.3 43.4 3 66.2 44.6 66.2 44.6 38.5 65.9 101.1 46.9 125.7 35.9 3.9-27.9 15-46.9 27.3-57.7-95.6-10.9-196.2-47.8-196.2-212.5 0-47 16.8-85.4 44.4-115.5-4.5-10.9-19.2-54.8 4.3-114.2 0 0 36-11.5 117.9 44 34.2-9.5 70.9-14.2 107.4-14.4 36.4.2 73.2 4.9 107.4 14.4 81.8-55.6 117.7-44 117.7-44 23.6 59.4 8.9 103.3 4.3 114.2 27.6 30.1 44.3 68.5 44.3 115.5 0 165.2-100.8 201.4-196.7 212.1 15.4 13.2 29.1 39.2 29.1 79 0 57-.5 103-0.5 117 0 11.5 7.6 25 29.5 20.7C820.9 859.8 944 698.5 944 508 944 272.5 747.5 76 512 76z" />
                    </svg>
                    <div class="circle-arrow" @click="redirectTo('https://github.com/romainb82')">
                        <MoveUpRight></MoveUpRight>
                    </div>
                </div>
            </div>


            <div class="flex flex-col items-end justify-start container-img w-full h-full relative" ref="image">
                <img class="picture-me" src="/pp.jpg" :alt="$t('about.section')">
            </div>

        </div>
    </section>

</template>
<script setup lang='ts'>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from 'vue-i18n'

import SkillCard from '@/components/Atoms/Card/SkillCard.vue';

import { MoveUpRight } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const sectionAbout = ref(null)
const cards = ref([])
const image = ref(null)


gsap.registerPlugin(ScrollTrigger);

const redirectTo = (link: string) => {
    window.open(link, '_blank');
}

onMounted(() => {
    gsap.from(sectionAbout.value, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: sectionAbout.value,
            start: 'top 80%',
        },
    })

    gsap.from(cards.value, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: cards.value,
            start: 'top 100%',
        },
    })

    gsap.from(image.value, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: image.value,
            start: 'top 80%',
        },
    })
});

</script>
<style scoped lang='scss'>
.container-about {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    height: max-content;
    padding: 0px 52px;
    overflow-x: clip;
    padding-bottom: 150px !important;

    @media screen and (max-width: 768px) {
        padding: 0px 20px;
    }

    @media screen and (max-width: 375px) {
        padding: 0px 10px;
    }

    @media screen and (max-width: 500px) {

        &:deep(.skill-card:nth-child(1)) {
            max-width: 100%;
        }
    }

      @media screen and (max-width: 425px) {
          padding-bottom: 50px !important;
    }





    .m-hidden {
        display: flex;

        @media screen and (max-width: 500px) {
            display: none;
        }
    }

    .m-visible {
        display: none;

        @media screen and (max-width:500px) {
            display: flex;
        }
    }

    .container-card {
        width: 50%;

        @media screen and (max-width: 850px) {
            width: 100%;
        }


    }

    .container-img {
        position: relative;

        @media screen and (max-width: 850px) {
            display: none;
        }

        &::before {
            border: 1px solid;
            border-color: rgb(166 166 166 / 0.3);
            content: "";
            width: 700px;
            height: 700px;
            border-radius: 99999px;
            position: absolute;
            z-index: 1;
            top: -250px;
            right: -200px;

            @media screen and (max-width:1220px) {
                width: 500px;
                height: 500px;
                top: -120px;
                right: -120px;
            }
        }
    }

    .container-description {
        @media screen and (max-width: 1100px) {
            flex-direction: column-reverse;
            align-items: flex-start;
            width: 100%;

            &:deep(.skill-card) {
                width: 100%;
            }
        }
    }

    .container-information {
        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

    }

    .container-row {
        @apply text-white;

        .sub-text {
            @apply font-openSans;
            font-size: 16px;
            line-height: 18px;
            font-weight: 500;
            text-wrap: nowrap;
        }

        .description {
            @apply font-openSans text-grey-50;
            font-weight: 300;
            font-size: 18px;
            text-wrap: nowrap;


            :deep(b) {
                @apply font-firaCode text-white;
                font-style: italic;
                letter-spacing: -0.05rem;
                font-weight: 300;
            }

            @media screen and (max-width: 426px) {
                text-wrap: wrap;
            }
        }

        .description-light {
            @apply font-openSans text-grey-50;
            font-weight: 300;
            font-size: 16px;
            text-wrap: nowrap;
            width: max-content;

            :deep(b) {
                @apply font-firaCode text-white;
                font-style: italic;
                letter-spacing: -0.05rem;
                font-weight: 300;
            }

            @media screen and (max-width: 426px) {
                text-wrap: wrap;
                width: 100%;
            }
        }

        .picture-me {
            width: auto;
            max-width: 60%;
            height: 495px;
            object-fit: cover;
            border-radius: 40px;
            position: relative;
            z-index: 2;



        }


        .circle-github {
            border: 1px solid;
            @apply border-grey-50/30;
            border-radius: 99999px;
            width: 50px;
            height: 50px;
            align-items: center;
            justify-content: center;
            position: relative;

            .icon-cutout {
                width: 24px;
                height: 24px;
                background-color: white;

                mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"/></svg>') no-repeat center;

                mask-size: contain;
                -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"/></svg>') no-repeat center;
                -webkit-mask-size: contain;
            }

            .circle-arrow {
                @apply bg-white text-black;
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

                &:hover {
                    cursor: pointer;
                }
            }


        }

    }
}
</style>
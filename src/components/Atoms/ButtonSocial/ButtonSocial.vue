<template>
    <div class="button-social" @click="redirectTo()">
        <component :is="props.icon" class="icon" />
        <span>{{ props.label }}</span>
    </div>
</template>
<script setup lang='ts'>
const props = defineProps({
    label: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: Object, required: true }
})


const redirectTo = () => {
    window.open(props.link, '_blank');
}
</script>

<style scoped lang='scss'>
.button-social {
    border: 1px solid;
    @apply bg-black border-grey-50;
    border-radius: 99999px;
    width: max-content;
    height: 50px;
    padding: 8px 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease-in-out;


    .icon {
        @apply text-white;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;


        svg {
            width: 100%;
            height: 100%;
            fill: currentColor !important;
        }

        path {
            fill: currentColor !important;
        }
    }

    *:first-child {
        transition: all 0.3s ease-in-out;
    }

    span {
        @apply text-grey-50 font-openSans;
        font-style: italic;
        font-weight: 300;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
    }

    &:hover {
        cursor: pointer;
        @apply bg-white;
        transition: all 0.3s ease-in-out;

        *:first-child {
            @apply text-black;
            transition: all 0.3s ease-in-out;

            svg {
                fill: currentColor !important;
            }
        }

        span {
            @apply text-black;
            transition: all 0.3s ease-in-out;
        }


    }

}
</style>
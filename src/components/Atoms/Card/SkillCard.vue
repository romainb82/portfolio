<template>
    <div class="skill-card" :class="{
        'bg-black text-grey-50 border-white/30': props.variant === 'dark',
        'bg-white text-grey-100 border-gray-50/30': props.variant === 'light'
    }">
        <h3 :class="{
            'text-grey-50': props.variant === 'dark',
            'text-grey-100': props.variant === 'light'
        }">
            {{ props.label }}
        </h3>

        <p class="techno-list">
            <span v-for="tech in props.techno" :key="tech" class="techno-item">
                {{ tech }}
            </span>
        </p>
    </div>
</template>

<script setup lang='ts'>
import { type PropType } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    techno: {
        type: Array as PropType<string[]>,
        required: true
    },
    variant: {
        type: String as PropType<'dark' | 'light'>,
        default: 'dark',
        validator: (value: string) => ['dark', 'light'].includes(value)
    }
});
</script>

<style scoped lang='scss'>
.skill-card {
    border-width: 1px;
    border-radius: 30px;
    padding: 1.5rem;
    font-family: system-ui, -apple-system, sans-serif;
    width: max-content;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;

}

h3 {
    @apply font-openSans;
    font-size: 18px;
    font-weight: 300;
}

.techno-list {
      @apply font-openSans;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;

}

.techno-item {
    font-size: 0.9rem;
    white-space: pre;

    &:not(:last-child)::after {
        content: '/';
        margin: 0 0.5em;
    }
}
</style>
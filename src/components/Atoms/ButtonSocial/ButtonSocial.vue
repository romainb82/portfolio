<template>
    <a class="button-social" :class="{ 'button-social--dark': props.variant === 'dark' }" :href="props.link"
        :target="isExternal ? '_blank' : undefined" :rel="isExternal ? 'noopener noreferrer' : undefined">
        <component :is="props.icon" class="icon" aria-hidden="true" />
        <span>{{ props.label }}</span>
    </a>
</template>

<script setup lang='ts'>
import { computed, type PropType } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: Object, required: true },
    variant: { type: String as PropType<'light' | 'dark'>, default: 'light' }
})

const isExternal = computed(() => /^https?:/i.test(props.link))
</script>

<style scoped lang='scss'>
.button-social {
    text-decoration: none;
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 999px;
    width: max-content;
    height: 42px;
    padding: 0 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    cursor: pointer;

    .icon {
        color: var(--ink);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        transition: color 0.25s ease, transform 0.25s ease;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    span {
        font-family: 'Fira Code', monospace;
        color: var(--graphite);
        font-weight: 400;
        font-size: 12px;
        letter-spacing: -0.01em;
        transition: color 0.25s ease;
    }

    &:hover {
        background: var(--ink);
        border-color: var(--ink);
        transform: translateY(-2px);
        box-shadow: 3px 3px 0 var(--terracotta);

        .icon {
            color: var(--cream);
            transform: rotate(-8deg);
        }

        span {
            color: var(--cream);
        }
    }

    /* Variante sombre (footer) : fond sombre au repos, inversion au survol */
    &--dark {
        background: rgba(250, 248, 242, 0.05);
        border-color: rgba(250, 248, 242, 0.15);

        .icon {
            color: var(--cream);
        }

        span {
            color: rgba(250, 248, 242, 0.7);
        }

        &:hover {
            background: var(--cream);
            border-color: var(--cream);
            box-shadow: 3px 3px 0 var(--terracotta);

            .icon {
                color: var(--ink);
            }

            span {
                color: var(--ink);
            }
        }
    }
}
</style>

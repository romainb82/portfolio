<template>
    <Transition name="btt">
        <button v-if="visible" type="button" class="back-to-top" :aria-label="t('ui.backToTop')" :title="t('ui.backToTop')"
            @click="scrollTop">
            <ArrowUp class="btt-icon" />
        </button>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const visible = ref(false)

const onScroll = () => {
    visible.value = window.scrollY > window.innerHeight * 0.8
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped lang="scss">
.back-to-top {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 40;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--cream);
    color: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 0 var(--border);
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

    .btt-icon {
        width: 18px;
        height: 18px;
        transition: transform 0.25s ease;
    }

    &:hover,
    &:focus-visible {
        background: var(--ink);
        border-color: var(--ink);
        color: var(--cream);
        transform: translate(-2px, -2px);
        box-shadow: 3px 3px 0 var(--terracotta);

        .btt-icon {
            transform: translateY(-2px);
        }
    }

    @media screen and (max-width: 768px) {
        right: 16px;
        bottom: 16px;
        width: 44px;
        height: 44px;
    }
}

.btt-enter-active,
.btt-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.btt-enter-from,
.btt-leave-to {
    opacity: 0;
    transform: translateY(12px);
}
</style>

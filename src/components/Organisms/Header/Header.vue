<template>
    <header>
        <div class="logo">
            <p>Romain <br> Bessede</p>
        </div>

        <nav class="menu">
            <ul>
                <li>
                    <RouterLink to="">
                        About
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="">
                        Projects
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="">
                        Articles
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="">
                        Contacts
                    </RouterLink>
                </li>
            </ul>
        </nav>

        <div class="menu-lang">
            <p class="is-selected">FR</p>
            <p>EN</p>
        </div>

        <div class="menu-burger" @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-menu-icon lucide-menu">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
            </svg>
        </div>

    </header>
    <MenuBurger :is-open="isMenuOpen" @close="isMenuOpen = false" />
</template>
<script setup lang='ts'>
//Import packages

//Import components
import MenuBurger from '@/components/Molecules/MenuBurger/MenuBurger.vue';
import { ref } from 'vue';

//Import assets

//Import stores

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

</script>
<style scoped lang='scss'>
@import url('./HeaderStyle.scss')
</style>
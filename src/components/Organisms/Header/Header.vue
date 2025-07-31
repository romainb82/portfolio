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

    </header>

</template>
<script setup lang='ts'>
//Import packages

//Import components

//Import assets

//Import stores

</script>
<style scoped lang='scss'>
@import url('./HeaderStyle.scss')
</style>
<template>
    <div class="experience-row">
        <div class="date-info">
            <span class="year-range">{{ props.dateRange }}</span>
            <span class="duration">{{ props.duration }}</span>
        </div>
        <div class="company-name">
            <span>{{ props.company }}</span>
        </div>
        <div class="job-title">
            <span>{{ props.title }}</span>
            <hr>
            <span>{{ props.technologies }}</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    dateRange: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    }
});
</script>

<style scoped lang='scss'>
// --- Variables ---
$dark-bg: #1A1A1A;
$dark-text-primary: #EAEAEA;
$dark-text-secondary: #888888;
$dark-separator: #444444;

$light-bg: #FFFFFF;
$light-text-primary: #1A1A1A;
$light-text-secondary: #777777;
$light-separator: #DDDDDD;

$transition-speed: 0.3s;

// --- Conteneur principal de la ligne ---
.experience-row {
    border-bottom: 1px solid;
    border-top: 1px solid;
    @apply bg-black text-white border-grey-50/30;
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    width: 100%;
    transition: all 0.3s ease-in-out;

    &:hover {
        cursor: default;
        @apply bg-white;
        transition: all 0.3s ease-in-out;

        .date-info {
            @apply text-black;
            transition: all 0.3s ease-in-out
        }

        .company-name {
            span {
                @apply text-black;
                transition: all 0.3s ease-in-out
            }
        }

        .job-title {
            span {
                text-wrap: nowrap;
                @apply text-black;
                transition: all 0.3s ease-in-out
            }

            hr {
                @apply bg-black;
                transition: all 0.3s ease-in-out
            }
        }
    }
}


.date-info {
    @apply font-openSans text-grey-50;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;

    .year-range {
        font-size: 20px;
        font-weight: 400;
    }

    .duration {
        font-size: 14px;
        font-weight: 300;
        transition: color $transition-speed ease;
    }
}

.company-name {
    span {
        @apply font-openSans text-white;
        font-size: 16px;
        font-weight: 500;
    }
}

.job-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    text-wrap: nowrap;

    span {
        @apply font-firaCode text-white;
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: 300;
    }

    hr {
        @apply bg-grey-50;
        width: 2px;
        height: 1.5rem;
        border: none;
    }
}
</style>
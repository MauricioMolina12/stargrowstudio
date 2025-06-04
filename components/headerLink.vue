<template>
    <nav>
        <a :href="href" class="header-link">
            {{ label }}
        </a>
    </nav>
</template>

<script setup>
defineProps({
    href: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.header-link {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: color 0.2s;
    cursor: pointer;
}

.header-link.active{
    color: var(--color-primary);
}

.header-link:hover {
    color: var(--color-primary);
}
</style>
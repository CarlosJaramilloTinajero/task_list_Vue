<script setup>
const props = defineProps({
    msg: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'info'
    }
});

</script>

<template>
    <div :class="'info-text-container ' + type">
        <p>{{ msg }}</p>
    </div>
</template>

<style scoped>
.info-text-container {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    width: 100%;
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
}

.info-text-container p {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
    color: rgba(0, 0, 0, 0.9);
}

.info-text-container.info {
    background-color: rgba(0, 132, 194, 0.993);
}

.info-text-container.success {
    background-color: rgba(0, 151, 38, 0.993);
}

.info-text-container.error {
    background-color: rgba(155, 0, 0, 0.993);
}

.info-text-container.default {
    background-color: rgba(126, 126, 126, 0.993);
}
</style>
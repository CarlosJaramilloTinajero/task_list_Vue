<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ArchivedListAndTask from '../components/ArchivedListAndTask.vue';

const store = useStore();

const lists = computed(() => {
    return store.state.taskListArchivedModule.listsArchived;
});

onMounted(() => {
    store.dispatch('getTaskListsArchived');
});
</script>

<template>
    <ArchivedListAndTask :lists="lists" type="archived-list"></ArchivedListAndTask>
</template>

<style scoped></style>
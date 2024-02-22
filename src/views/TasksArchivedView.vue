<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ArchivedListAndTask from '../components/ArchivedListAndTask.vue';

const store = useStore();

const tasks = computed(() => {
    return store.state.taskArchivedModule.tasksArchived;
});

// const lists = computed(() => {
//     return store.state.taskListArchivedModule.listsArchived;
// });

onMounted(() => {
    store.dispatch('getTasksArchived');
    // store.dispatch('getTaskListsArchived');
});

</script>

<template>
    <ArchivedListAndTask :lists="tasks" type="archived-task"></ArchivedListAndTask>
</template>

<style scoped></style>
<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { notify, updateNotify } from '../notify';
import AnimationInit from './AnimationInit.vue';
import InfoText from './InfoText.vue';

const props = defineProps({
    // archived-task
    // archived-list
    type: {
        type: String,
        default: 'normal'
    },
    lists: {
        type: Object,
        default: {}
    }
});

const store = useStore();
const modalTask = ref({
    description: ''
});
const idNotify = ref(null);
const modalTaskTitle = ref(null);

const deleteTaskModal = async () => {
    try {
        const data = await store.dispatch('forceDeleteTask', modalTask.value.id);
        idNotify.value = notify('Cargando...', 'loading');
        if (data && data.status) {
            updateNotify(idNotify.value, 'Tarea eliminada correctamente', 'success');
        } else {
            updateNotify(idNotify.value, 'Error al eliminar la tarea', 'error');
        }
    } catch (error) {
        updateNotify(idNotify.value, 'Error al eliminar la tarea', 'error');
    }
};

const unarchivedTaskModal = async () => {
    try {
        console.log('holaa');
        idNotify.value = notify('Cargando...', 'loading');
        const data = await store.dispatch('unarchivedTask', modalTask.value.id);
        if (data && data.status) {
            updateNotify(idNotify.value, 'Tarea restaurada correctamente', 'success');
        } else {
            updateNotify(idNotify.value, 'Error al restaurar la tarea', 'error');
        }
    } catch (error) {
        console.log(error);
        updateNotify(idNotify.value, 'Error al restaurar la tarea', 'error');
    }
};

const deleteList = async id => {
    idNotify.value = notify('Cargando...', 'loading');
    try {
        const data = await store.dispatch('deleteForceList', id);

        if (data && data.status) {
            updateNotify(idNotify.value, 'Lista eliminada correctamente', 'success');
        } else {
            updateNotify(idNotify.value, 'Error al eliminar la lista', 'error');
        }
    } catch (error) {
        updateNotify(idNotify.value, 'Error al eliminar la lista', 'error');
    }
};

const unarchiveList = async id => {
    idNotify.value = notify('Cargando...', 'loading');
    try {
        const data = await store.dispatch('unarchiveList', id);
        if (data && data.status) {
            updateNotify(idNotify.value, 'Lista restaurada correctamente', 'success');
        } else {
            updateNotify(idNotify.value, 'Error al restaurar la lista', 'error');
        }
    } catch (error) {
        updateNotify(idNotify.value, 'Error al restaurar la lista', 'error');
    }
};

// Helpers
const dateExpiration = (date, getHtml = true) => {
    const now = new Date();
    const dateExpiration = new Date(date);

    let color = '';
    let backgroundColor = '';
    let msg = '';
    let showHTML = false;

    if (now.getTime() > dateExpiration.getTime()) {
        color = 'rgba(229, 0, 0, 0.8)';
        backgroundColor = 'rgba(229, 0, 0, 0.25)';
        msg = 'Plazo vencido';
        showHTML = true;
    } else if (now.getMonth() === dateExpiration.getMonth() &&
        (now.getDate() === dateExpiration.getDate() - 1 || now.getDate() === dateExpiration.getDate())) {
        color = 'rgba(0, 0, 0, 0.95)';
        backgroundColor = 'rgba(246, 160, 0, 0.95)';
        msg = 'Esta por expirar';
        showHTML = true;
    }

    if (!getHtml) {
        return {
            color,
            backgroundColor: backgroundColor,
            msg
        }
    }

    return !showHTML ? false : '<span style="border-radius: 3px; padding: 4px; color: ' + color + ' ; background-color: ' + backgroundColor + ' ;">' + msg + '</span>';
};


onMounted(() => {

});
</script>

<template>
    <div class="lists-tasks-container" v-if="typeof lists === 'object' && Object.keys(lists).length > 0">
        <div class="list-task" v-for="list in lists" :key="list.id">
            <input type="text" disabled v-model="list.name" class="title form-control">
            <div class="options" v-if="type === 'archived-list'">
                <div class="dropdown">
                    <button class="btn btn-sm btn-h" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg> </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="deleteList(list.id)">Eliminar</a></li>
                        <li><a class="dropdown-item" @click="unarchiveList(list.id)">Desarchivar la lista</a></li>
                    </ul>
                </div>

            </div>

            <div class="tasks" :id="'task_' + list.id" style="max-height: 63vh;">
                <div class="task" v-for="task in list.tasks" :key="task.id">
                    <div class="back-task" @click="() => {
                        modalTask = task;
                        modalTaskTitle = task.title;
                        // closeAllActions();
                    }" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                    </div>
                    <p class="title-task">{{ task.title }}</p>
                    <p class="created-due-date"
                        :style="{ 'backgroundColor': dateExpiration(task.due_date, false).backgroundColor }"
                        v-if="task.due_date"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg><span>{{ task.due_date }}</span></p>


                    <div class="edit-task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil" viewBox="0 0 16 16">
                            <path
                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- No hay nada -->
    <div class="mt-5" v-else-if="lists.length === 0">
        <!-- No hay {{ type === 'archived-task' ? 'tareas' : 'listas' }} archivadas -->
        <InfoText :msg="`No hay ${type === 'archived-task' ? 'tareas' : 'listas'} archivadas`" />
    </div>

    <!-- Animacion de carga -->
    <div class="" v-else-if="(typeof lists === 'object' && Object.keys(lists).length === 0)">
        <AnimationInit />
    </div>


    <!-- Modal add task -->
    <div class="modal fade" style="margin: 0 0 0 0;" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" style="max-width: 850px;">
            <div class="modal-content">
                <div class="modal-body">

                    <div class="modal-content-section" v-if="modalTask">
                        <div class="sections-modal">

                            <div class="section-modal">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-credit-card" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                    </svg>
                                </div>
                                <div class="section">
                                    <input type="text" class="form-control input-modal-title" v-model="modalTaskTitle">

                                    <div class="information-task" v-if="modalTask.due_date">
                                        <p class="title-information">Vencimiento</p>
                                        <div class="information">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                <path
                                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                            </svg>
                                            <p>{{ modalTask.due_date }} <span v-if="dateExpiration(modalTask.due_date)"
                                                    class="ms-2"> <span
                                                        v-html="dateExpiration(modalTask.due_date)"></span></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="section-modal">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-justify-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                </div>
                                <div class="section">
                                    <p class="title-section">Descripción</p>

                                    <div v-if="!modalTask.description">
                                        <div class="add-description d-block">
                                            <p>Añadir una descripción mas detallada</p>
                                        </div>
                                    </div>

                                    <div v-if="modalTask.description">
                                        <div class="description-task d-block">
                                            <div v-html="modalTask.description"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="section-modal">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-list-ul" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                </div>
                                <div class="section">
                                    <p class="title-section">Actividad</p>
                                </div>
                            </div>

                        </div>

                        <div class="actions-modal">
                            <div class="actions" v-if="type === 'archived-task'">
                                <p class="title-actions">Acciones</p>

                                <p class="action" data-bs-dismiss="modal" @click="deleteTaskModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-archive" viewBox="0 0 16 16">
                                        <path
                                            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                    </svg> <span>Eliminar</span>
                                </p>

                                <p class="action" data-bs-dismiss="modal" @click="unarchivedTaskModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-archive" viewBox="0 0 16 16">
                                        <path
                                            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                    </svg> <span>Desarchivar</span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
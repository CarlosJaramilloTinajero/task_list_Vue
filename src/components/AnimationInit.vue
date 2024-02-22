<script setup>
const getRandomInt = max => {
    return Math.floor(Math.random() * max) + 1;
}
</script>

<template>
    <div class="lists-tasks-container">
        <div class="list-task" v-for="index in (1, 3)" :key="index">
            <div class="animation-loading"></div>

            <div class="tasks" style="max-height: 63vh;">
                <div class="task" v-for="indexTask in (4, getRandomInt(4))" :key="indexTask">
                    <p class="title-task">
                    <div class="animation-loading"></div>
                    </p>
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
</template>

<style scoped>
.animation-loading {
    position: relative;
    width: 100%;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
}

.animation-loading::before {
    position: absolute;
    content: "";
    width: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.3);
    animation-name: animation-loading;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 1s;
}

@keyframes animation-loading {
    from {
        left: 0;
    }

    to {
        left: 100%;
    }
}
</style>
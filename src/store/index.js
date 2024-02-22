import { createStore } from "vuex";
import conecction from "../conecction";
import authModule from "./modules/auth";
import listTaskModule from "./modules/list-task";
import taskModule from "./modules/task";
import taskArchivedModule from "./modules/task-archived";
import taskListArchivedModule from "./modules/task-list-archived";


const store = createStore({
    state: {
        conecctionClass: new conecction(localStorage.getItem('token'))
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        auth: authModule,
        listTaskModule: listTaskModule,
        taskModule: taskModule,
        taskArchivedModule: taskArchivedModule,
        taskListArchivedModule: taskListArchivedModule
    }
});

export default store;
import { createStore } from "vuex";
import conecction from "../conecction";
import authModule from "./modules/auth";
import listTaskModule from "./modules/list-task";
import taskModule from "./modules/task";

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
        taskModule: taskModule
    }
});

export default store;
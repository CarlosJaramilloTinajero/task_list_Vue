import conecction from "../../conecction"
const taskArchivedModule = {
    state: {
        tasksArchived: {},
        classConecction: new conecction(localStorage.getItem('token'))
    },

    mutations: {
        setTasksArchived(state, payload) {
            state.tasksArchived = payload;
        }
    },

    actions: {
        async getTasksArchived({ state, commit }) {
            try {
                const { data } = await state.classConecction.loadData('get', '/tasks-archived', {}, true);
                if (data && data.status) {
                    commit('setTasksArchived', data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async forceDeleteTask({ state, dispatch }, id) {
            try {
                const { data } = await state.classConecction.loadData('delete', `/task-force-delete/${id}`, {}, true);
                if (data && data.status) {
                    dispatch('getTasksArchived');
                }
                return await data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        async unarchivedTask({ state, dispatch }, id) {
            try {
                const { data } = await state.classConecction.loadData('post', `/unarchive-task/${id}`, {}, true);
                if (data && data.status) {
                    dispatch('getTasksArchived');
                }
                return await data;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    },

    getters: {

    }
}

export default taskArchivedModule;
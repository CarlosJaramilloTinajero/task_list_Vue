import conecction from "../../conecction"
const taskListArchivedModule = {
    state: {
        listsArchived: {},
        classConecction: new conecction(localStorage.getItem('token'))
    },

    mutations: {
        setListTasksArchived(state, payload) {
            state.listsArchived = payload;
        }
    },

    actions: {
        async getTaskListsArchived({ state, commit }) {
            try {
                const { data } = await state.classConecction.loadData('get', '/task-lists-archived', {}, true);
                if (data && data.status) {
                    commit('setListTasksArchived', data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async unarchiveList({ state, dispatch }, id) {
            try {
                const { data } = await state.classConecction.loadData('post', `/unarchive-list/${id}`, {}, true);
                if (data && data.status) {
                    dispatch('getTaskListsArchived');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async deleteForceList({ state, dispatch }, id) {
            try {
                const { data } = await state.classConecction.loadData('delete', `/task-list-delete/${id}`, {}, true);
                if (data && data.status) {
                    dispatch('getTaskListsArchived');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        }
    },

    getters: {

    }
}

export default taskListArchivedModule;
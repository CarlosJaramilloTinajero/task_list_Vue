import conecction from "../../conecction";
const listTaskModule = {
    state: {
        connectionClass: new conecction(localStorage.getItem('token')),
        lists: {}
    },
    mutations: {
        setList(state, payload) {
            state.lists = payload;
        }
    },
    actions: {
        async getLists({ state, commit }) {
            try {
                const { data } = await state.connectionClass.loadData('get', 'task-list', {}, true);
                if (data && data.status) {
                    commit('setList', data.data);
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async createList({ state, dispatch }, list) {
            try {
                const { data } = await state.connectionClass.loadData('post', 'task-list', list, true);
                if (data && data.status) {
                    dispatch('getLists');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async deleteList({ state, dispatch }, listId) {
            try {
                const { data } = await state.connectionClass.loadData('delete', 'task-list/' + listId, {}, true);
                if (data && data.status) {
                    dispatch('getLists');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async emptyList({ state, dispatch }, listId) {
            try {
                const { data } = await state.connectionClass.loadData('post', 'empty-list/' + listId, {}, true);
                if (data && data.status) {
                    dispatch('getLists');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async updateList({ state, dispatch }, list) {
            try {
                const { data } = await state.connectionClass.loadData('put', 'task-list/' + list.id, list, true);
                if (data && data.status) {
                    dispatch('getLists');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {

    }
};

export default listTaskModule;
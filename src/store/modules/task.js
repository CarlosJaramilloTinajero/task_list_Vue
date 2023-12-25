import conecction from "../../conecction";
const taskModule = {
    state: {
        conecctionClass: new conecction(localStorage.getItem('token'))
    },
    mutations: {

    },
    actions: {
        async createTask({ state }, task) {
            try {
                const { data } = await state.conecctionClass.loadData('post', 'task', task, true);
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async updateTask({ state, dispatch }, task) {
            try {
                const { data } = await state.conecctionClass.loadData('put', 'task/' + task.id, task, true);
                if (data && data.status) {
                    dispatch('getLists');
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async deleteTasks({ state, dispatch }, taskId) {
            try {
                const { data } = await state.conecctionClass.loadData('delete', 'task/' + taskId, {}, true);
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
export default taskModule;
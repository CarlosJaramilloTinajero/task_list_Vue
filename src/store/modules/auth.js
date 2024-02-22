import conecction from "../../conecction";
const authModule = {
    state: {
        conecctionClass: new conecction(localStorage.getItem('token'))
    },
    mutations: {

    },
    actions: {
        async login({ state }, credentials) {
            try {
                const { data } = await state.conecctionClass.loadData('post', 'login-task-list', credentials, false, true);
                if (data && data.status) {
                    localStorage.setItem('token', data.token_type + ' ' + data.access_token);
                    localStorage.setItem('user_name', data.user_name);
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async register({ state }, user) {
            try {
                const { data } = await state.conecctionClass.loadData('post', 'register-task-list', user, false, false);
                if (data && data.status) {
                    localStorage.setItem('token', data.token_type + ' ' + data.access_token);
                    localStorage.setItem('user_name', data.user_name);
                }
                return await data;
            } catch (error) {
                console.log(error);
            }
        },

        async enter({ state }) {
            state.conecctionClass.loadData('post', '/login-vue-project', { msg: 'Entraron al proyecto lista de tareas con Vue, Tu puedes.' }, true);
        }
    },
    getters: {}
}

export default authModule;
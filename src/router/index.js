import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView, meta: { guest: true } },
    { path: '/register', component: RegisterView, meta: { guest: true } }
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

router.beforeEach((to, from) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            return {
                path: '/login'
            };
        }
    }

    if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token')) {
            return {
                path: '/'
            };
        }
    }
});

export default router;

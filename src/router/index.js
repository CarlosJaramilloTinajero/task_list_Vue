import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TasksArchivedView from '../views/TasksArchivedView.vue';
import ListArchivedView from '../views/ListArchivedView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView, meta: { guest: true } },
    { path: '/register', component: RegisterView, meta: { guest: true } },
    { path: '/task-archived', name: 'task-archived', component: TasksArchivedView, meta: { requiresAuth: true } },
    { path: '/list-archived', name: 'list-archived', component: ListArchivedView, meta: { requiresAuth: true } }
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

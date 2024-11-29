import {createRouter, createWebHashHistory} from 'vue-router';
import AdminHome from '@/components/AdminHome.vue';
import AdminPublications from '@/components/AdminPublications.vue';

const routes = [
  {path: '/', name: 'AdminHome', component: AdminHome},
  {path: '/adminpublications', name: 'AdminPublications', component: AdminPublications}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

import {createRouter, createWebHashHistory} from 'vue-router';
import AdminLogin from './pages/AdminLogin.vue';
import AdminHome from '@/pages/AdminHome.vue';
import AdminTeaching from './pages/AdminTeaching.vue';
import AdminPublications from '@/pages/AdminPublications.vue';
import AdminResearch from './pages/AdminResearch.vue';
import AdminUsers from './pages/AdminUsers.vue';
import AdminTools from './pages/AdminTools.vue';
import AdminInsideASU from './pages/AdminInsideASU.vue';
import AdminOutsideASU from './pages/AdminOutsideASU.vue';
import AdminMentorFaculty from './pages/AdminMentorFaculty.vue';
import AdminMentorStudents from './pages/AdminMentorStudents.vue';
import AdminWorkHistory from './pages/AdminWorkHistory.vue';

const routes = [
  {path: '/', redirect: '/adminlogin'},
  {path: '/adminhome', name: 'AdminHome', component: AdminHome},
  {path: '/adminlogin', name: 'AdminLogin', component: AdminLogin},
  {path: '/adminteaching', name: 'AdminTeaching', component: AdminTeaching},
  {path: '/adminpublications', name: 'AdminPublications', component: AdminPublications},
  {path: '/adminresearch', name: 'AdminResearch', component: AdminResearch},
  {path: '/adminusers', name: 'AdminUsers', component: AdminUsers},
  {path: '/admintools', name: 'AdminTools', component: AdminTools},
  {path: '/admin-insideasu', name: 'AdminInsideASU', component: AdminInsideASU},
  {path: '/admin-outsideasu', name: 'AdminOutsideASU', component: AdminOutsideASU},
  {path: '/admin-mentorfaculty', name: 'AdminMentorFaculty', component: AdminMentorFaculty},
  {path: '/admin-mentorstudents', name: 'AdminMentorStudents', component: AdminMentorStudents},
  {path: '/adminworkhistory', name: 'AdminWorkHistory', component: AdminWorkHistory}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
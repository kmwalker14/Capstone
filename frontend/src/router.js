import {createRouter, createWebHistory} from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';

import UserLogin from './pages/UserLogin.vue';
import CallbackPage from './pages/CallbackPage.vue';
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
import AdminNew from './pages/AdminNew.vue';

import StudentHome from './pages/StudentHome.vue';
import StudentTeaching from './pages/StudentTeaching.vue';
import StudentPublications from './pages/StudentPublications.vue';
import StudentResearch from './pages/StudentResearch.vue';
import StudentTools from './pages/StudentTools.vue';
import StudentInsideASU from './pages/StudentInsideASU.vue';
import StudentOutsideASU from './pages/StudentOutsideASU.vue';
import StudentMentorStudents from './pages/StudentMentorStudents.vue';
import StudentMentorFaculty from './pages/StudentMentorFaculty.vue';
import StudentWorkHistory from './pages/StudentWorkHistory.vue';

const routes = [

  {path: "/callback", name: "callback", component: CallbackPage,},

  {path: '/', redirect: '/studenthome'},
  {path: '/adminhome', name: 'AdminHome', component: AdminHome, beforeEnter: authGuard},
  {path: '/userlogin', name: 'UserLogin', component: UserLogin},
  {path: '/adminteaching', name: 'AdminTeaching', component: AdminTeaching, beforeEnter: authGuard },
  {path: '/adminpublications', name: 'AdminPublications', component: AdminPublications, beforeEnter: authGuard },
  {path: '/adminresearch', name: 'AdminResearch', component: AdminResearch, beforeEnter: authGuard },
  {path: '/adminnew', component: AdminNew, beforeEnter: authGuard },
  {path: '/adminusers', name: 'AdminUsers', component: AdminUsers, beforeEnter: authGuard },
  {path: '/admintools', name: 'AdminTools', component: AdminTools, beforeEnter: authGuard },
  {path: '/admin-insideasu', name: 'AdminInsideASU', component: AdminInsideASU, beforeEnter: authGuard },
  {path: '/admin-outsideasu', name: 'AdminOutsideASU', component: AdminOutsideASU, beforeEnter: authGuard },
  {path: '/admin-mentorfaculty', name: 'AdminMentorFaculty', component: AdminMentorFaculty, beforeEnter: authGuard },
  {path: '/admin-mentorstudents', name: 'AdminMentorStudents', component: AdminMentorStudents, beforeEnter: authGuard },
  {path: '/adminworkhistory', name: 'AdminWorkHistory', component: AdminWorkHistory, beforeEnter: authGuard },


  {path: '/studenthome', name: 'StudentHome', component: StudentHome},
  {path: '/studentteaching', name: 'StudentTeaching', component: StudentTeaching},
  {path: '/studentpublications', name: 'StudentPublications', component: StudentPublications},
  {path: '/studentresearch', name: 'StudentResearch', component: StudentResearch},
  {path: '/studenttools', name: 'StudentTools', component: StudentTools},
  {path: '/student-insideasu', name: 'StudentInsideASU', component: StudentInsideASU},
  {path: '/student-outsideasu', name: 'StudentOutsideASU', component: StudentOutsideASU},
  {path: '/student-mentorfaculty', name: 'StudentMentorFaculty', component: StudentMentorFaculty},
  {path: '/student-mentorstudents', name: 'StudentMentorStudents', component: StudentMentorStudents},
  {path: '/studentworkhistory', name: 'StudentWorkHistory', component: StudentWorkHistory}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
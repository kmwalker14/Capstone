import {createRouter, createWebHashHistory} from 'vue-router';
import UserLogin from './pages/UserLogin.vue';
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
  {path: '/', redirect: '/userlogin'},
  {path: '/adminhome', name: 'AdminHome', component: AdminHome},
  {path: '/userlogin', name: 'UserLogin', component: UserLogin},
  {path: '/adminteaching', name: 'AdminTeaching', component: AdminTeaching},
  {path: '/adminpublications', name: 'AdminPublications', component: AdminPublications},
  {path: '/adminresearch', name: 'AdminResearch', component: AdminResearch},
  {path: '/adminusers', name: 'AdminUsers', component: AdminUsers},
  {path: '/admintools', name: 'AdminTools', component: AdminTools},
  {path: '/admin-insideasu', name: 'AdminInsideASU', component: AdminInsideASU},
  {path: '/admin-outsideasu', name: 'AdminOutsideASU', component: AdminOutsideASU},
  {path: '/admin-mentorfaculty', name: 'AdminMentorFaculty', component: AdminMentorFaculty},
  {path: '/admin-mentorstudents', name: 'AdminMentorStudents', component: AdminMentorStudents},
  {path: '/adminworkhistory', name: 'AdminWorkHistory', component: AdminWorkHistory},

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
  history: createWebHashHistory(),
  routes
});

export default router;
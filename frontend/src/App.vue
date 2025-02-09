<template>
  <div id="app">
    <!-- Add individual components here if needed -->
    <!-- e.g., <AdminHome /> -->

    <!-- Router will render component based on current route -->
    <!-- <router-view></router-view> -->

    <!-- Testing different navigation techniques below (not using Vue router)-->

    <!-- This navigates using the sidebar menu
    <AdminHome @page-changed="setPage" v-if="currentPage === 'adminhome'" />
    <AdminTeaching @page-changed="setPage" v-if="currentPage === 'adminteaching'" />
    <AdminPublications @page-changed="setPage" v-if="currentPage === 'adminpublications'" />
    <AdminResearch @page-changed="setPage" v-if="currentPage === 'adminresearch'" />
    <AdminTools @page-changed="setPage" v-if="currentPage === 'admintools'" />
    <AdminUsers @page-changed="setPage" v-if="currentPage === 'adminusers'" />
    -->
    
    <!-- Public Works pages
    <AdminInsideASU @page-changed="setPage" v-if="currentPage === 'admininsideasu'" />
    <AdminOutsideASU @page-changed="setPage" v-if="currentPage === 'adminoutsideasu'" />
    <AdminMentorFaculty @page-changed="setPage" v-if="currentPage === 'adminmentorfaculty'" />
    <AdminMentorStudents @page-changed="setPage" v-if="currentPage === 'adminmentorstudents'" />
    <AdminWorkHistory @page-changed="setPage" v-if="currentPage === 'adminworkhistory'" />
    -->
    
    <!-- Testing with button navigation to view all pages without submenu (submenu not yet implemented) -->
    <nav>
      <!-- Admin -->
      <button @click="setPage('adminlogin')">A-Login</button>
      <button @click="setPage('adminhome')">A-Home</button>
      <button @click="setPage('adminteaching')">A-Teaching</button>
      <button @click="setPage('adminpublications')">A-Publications</button>
      <button @click="setPage('adminresearch')">A-Research</button>
      <button @click="setPage('admininsideasu')">A-Inside ASU</button>  <!-- Public Work -->
      <button @click="setPage('adminoutsideasu')">A-Outside ASU</button>  <!-- Public Work -->
      <button @click="setPage('adminmentorfaculty')">A-Mentor Faculty</button>  <!-- Public Work -->
      <button @click="setPage('adminmentorstudents')">A-Mentor Students</button>  <!-- Public Work -->
      <button @click="setPage('adminworkhistory')">A-Work History</button>  <!-- Public Work -->
      <button @click="setPage('admintools')">A-Tools</button>
      <button @click="setPage('adminusers')">A-Admin Users</button>
      <button @click="setPage('adminnew')">A-New Admin</button>
      <!-- Public -->
      <button @click="setPage('studenthome')">S-Home</button>
      <button @click="setPage('studentteaching')">S-Teaching</button>
      <button @click="setPage('studentpublications')">S-Publications</button>
      <button @click="setPage('studentresearch')">S-Research</button>
      <button @click="setPage('studentinsideasu')">S-Inside ASU</button>  <!-- Public Work -->
      <button @click="setPage('studentoutsideasu')">S-Outside ASU</button>  <!-- Public Work -->
      <button @click="setPage('studentmentorfaculty')">S-Mentor Faculty</button>  <!-- Public Work -->
      <button @click="setPage('studentmentorstudents')">S-Mentor Students</button>  <!-- Public Work -->
      <button @click="setPage('studentworkhistory')">S-Work History</button>  <!-- Public Work -->
      <button @click="setPage('studenttools')">S-Tools</button>
    </nav>

    <!-- Admin -->
    <AdminLogin v-if="currentPage === 'adminlogin'" />
    <AdminHome v-if="currentPage === 'adminhome'" />
    <AdminTeaching v-if="currentPage === 'adminteaching'" />
    <AdminPublications v-if="currentPage === 'adminpublications'" />
    <AdminResearch v-if="currentPage === 'adminresearch'" />
    <AdminInsideASU v-if="currentPage === 'admininsideasu'" />  <!-- Public Work -->
    <AdminOutsideASU v-if="currentPage === 'adminoutsideasu'" />  <!-- Public Work -->
    <AdminMentorFaculty v-if="currentPage === 'adminmentorfaculty'" />  <!-- Public Work -->
    <AdminMentorStudents v-if="currentPage === 'adminmentorstudents'" />  <!-- Public Work -->
    <AdminWorkHistory v-if="currentPage === 'adminworkhistory'" />  <!-- Public Work -->
    <AdminTools v-if="currentPage === 'admintools'" />
    <AdminUsers v-if="currentPage === 'adminusers'" />
    <AdminNew v-if="currentPage === 'adminnew'" />
    <!-- Public -->
    <StudentHome v-if="currentPage === 'studenthome'" />
    <StudentTeaching v-if="currentPage === 'studentteaching'" />
    <StudentPublications v-if="currentPage === 'studentpublications'" />
    <StudentResearch v-if="currentPage === 'studentresearch'" />
    <StudentInsideASU v-if="currentPage === 'studentinsideasu'" />  <!-- Public Work -->
    <StudentOutsideASU v-if="currentPage === 'studentoutsideasu'" />  <!-- Public Work -->
    <StudentMentorFaculty v-if="currentPage === 'studentmentorfaculty'" />  <!-- Public Work -->
    <StudentMentorStudents v-if="currentPage === 'studentmentorstudents'" />  <!-- Public Work -->
    <StudentWorkHistory v-if="currentPage === 'studentworkhistory'" />  <!-- Public Work -->
    <StudentTools v-if="currentPage === 'studenttools'" />
  </div>
</template>

<script>
 /* Import the components */
  // Admin
  import AdminLogin from './components/AdminLogin.vue';
  import AdminHome from './components/AdminHome.vue';
  import AdminTeaching from './components/AdminTeaching.vue';
  import AdminPublications from './components/AdminPublications.vue';
  import AdminResearch from './components/AdminResearch.vue';
  import AdminInsideASU from './components/AdminInsideASU.vue'; // Public Work
  import AdminOutsideASU from './components/AdminOutsideASU.vue'; // Public Work
  import AdminMentorFaculty from './components/AdminMentorFaculty.vue'; // Public Work
  import AdminMentorStudents from './components/AdminMentorStudents.vue'; // Public Work
  import AdminWorkHistory from './components/AdminWorkHistory.vue'; // Public Work
  import AdminTools from './components/AdminTools.vue';
  import AdminUsers from './components/AdminUsers.vue';
  import AdminNew from './components/AdminNew.vue';
  // Public
  import StudentHome from "@/components/StudentHome.vue";
  import StudentTeaching from './components/StudentTeaching.vue';
  import StudentPublications from './components/StudentPublications.vue';
  import StudentResearch from './components/StudentResearch.vue';
  import StudentInsideASU from './components/StudentInsideASU.vue'; // Public Work
  import StudentOutsideASU from './components/StudentOutsideASU.vue'; // Public Work
  import StudentMentorFaculty from './components/StudentMentorFaculty.vue'; // Public Work
  import StudentMentorStudents from './components/StudentMentorStudents.vue'; // Public Work
  import StudentWorkHistory from './components/StudentWorkHistory.vue'; // Public Work
  import StudentTools from './components/StudentTools.vue';

  export default {
    name: 'App',
    components: {
      /* Register components */
      // Admin
      AdminLogin,
      AdminHome,
      AdminTeaching,
      AdminPublications,
      AdminResearch,
      AdminInsideASU,
      AdminOutsideASU,
      AdminMentorFaculty,
      AdminMentorStudents,
      AdminWorkHistory,
      AdminTools,
      AdminUsers,
      AdminNew,
      // Public
      StudentHome,
      StudentTeaching,
      StudentPublications,
      StudentResearch,
      StudentInsideASU,
      StudentOutsideASU,
      StudentMentorFaculty,
      StudentMentorStudents,
      StudentWorkHistory,
      StudentTools,
    },

    data() {
      return {
        currentPage: 'adminlogin' // Default to this page
      };
    },
    
    methods: {
      // Method to switch between pages
      setPage(page) {
        console.log('Navigating to', page); // debug
        this.currentPage = page;
      }
    }
  };
</script>

<style>
/* Import CSS files if needed */
/*
e.g.,
@import './assets/globals.css';
*/
</style>



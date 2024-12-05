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
      <button @click="setPage('adminlogin')">Admin Login</button>
      <button @click="setPage('adminhome')">Home</button>
      <button @click="setPage('adminteaching')">Teaching</button>
      <button @click="setPage('adminpublications')">Publications</button>
      <button @click="setPage('adminresearch')">Research</button>
      <button @click="setPage('admininsideasu')">Inside ASU</button>  <!-- Public Work -->
      <button @click="setPage('adminoutsideasu')">Outside ASU</button>  <!-- Public Work -->
      <button @click="setPage('adminmentorfaculty')">Mentor Faculty</button>  <!-- Public Work -->
      <button @click="setPage('adminmentorstudents')">Mentor Students</button>  <!-- Public Work -->
      <button @click="setPage('adminworkhistory')">Work History</button>  <!-- Public Work -->
      <button @click="setPage('admintools')">Tools</button>
      <button @click="setPage('adminusers')">Admin Users</button>
      <button @click="setPage('adminnew')">New Admin</button>
      <button @click="setPage('studenthome')">Student Home</button>
    </nav>

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
    <StudentHome v-if="currentPage === 'studenthome'" />
  </div>
</template>

<script>
 /* Import the components */
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
 import StudentHome from "@/components/StudentHome.vue";

  export default {
    name: 'App',
    components: {
      StudentHome,
      /* Register components */
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
/* Import CSS files if needed*/
/*
e.g.,
@import './assets/globals.css';
*/
</style>



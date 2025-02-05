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
    <router-view></router-view>
  </div>
</template>

<script>
 /* Import the components */
  

  export default {
    name: 'App',
    components: {
      /* Register components */
    
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



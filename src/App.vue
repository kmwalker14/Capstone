<template>
  <div id="app">
    <!-- Add components here -->
    <!-- <HomePage /> -->
    <!-- <PublicationsPage /> -->
    <!-- <AdminHome /> -->
    <!-- <AdminPublications /> -->

    <!-- Router will render component based on current route -->
    <!-- <router-view></router-view> -->

    <!-- Testing different navigation technique below (not using Vue router)-->
    <!--
    <nav>
      <button @click="setPage('adminhome')">Home</button>
      <button @click="setPage('adminpublications')">Publications</button>
    </nav>

    <AdminHome v-if="currentPage === 'adminhome'" />
    <AdminPublications v-if="currentPage === 'adminpublications'" />
    -->

    <AdminHome @page-changed="setPage" v-if="currentPage === 'adminhome'" />
    <AdminPublications @page-changed="setPage" v-if="currentPage === 'adminpublications'" />
  </div>
</template>

<script>
 /* Import the components */
//import HomePage from './components/HomePage.vue';
//import PublicationsPage from './components/PublicationsPage.vue';
  import AdminHome from './components/AdminHome.vue';
  import AdminPublications from './components/AdminPublications.vue';

  export default {
    name: 'App',
    components: {
      /* Register components */
      //HomePage,
      //PublicationsPage,
      AdminHome,
      AdminPublications
    },

    data() {
      return {
        currentPage: 'adminhome' // Default to this page
      };
    },
    
    methods: {
      // Method to switch between pages
      setPage(page) {
        this.currentPage = page;
      }
    }
  };
</script>

<style>
/* Import CSS files */
/*
@import './assets/globals.css';
@import './assets/home-style.css';
@import './assets/home-styleguide.css';
@import './assets/publications-style.css';
@import './assets/publications-styleguide.css';
*/
</style>



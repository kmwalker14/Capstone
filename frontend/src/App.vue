<template>
  <div id="app">
    <!-- Show admin sidebar menu if user is an admin -->
    <AdminSidebarMenu v-if="isAuthenticated" />

    <!-- Show student menu if user is not an admin -->
    <SidebarMenu v-else />

    <!-- Router will render component based on current route -->
    <router-view></router-view>
  </div>
</template>

<script>
import AdminSidebarMenu from './components/AdminSidebarMenu.vue';
import SidebarMenu from "./components/SidebarMenu.vue";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: 'App',
  components: {
    AdminSidebarMenu,
    SidebarMenu
  },

  setup() {
    const { isAuthenticated } = useAuth0();

    return {isAuthenticated};
  },

  data() {
    return {
      currentPage: 'studenthome' // Default to this page
    };
  },
};
</script>

<style>
/* Import CSS files if needed */
  #app {
    display: flex;
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>



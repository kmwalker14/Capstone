<template>
  <div id="app">
    <!-- Show admin sidebar menu if user is an admin -->
    <AdminSidebarMenu v-if="isAdmin" />

    <!-- Show student menu if user is not an admin -->
    <SidebarMenu v-else />

    <!-- Router will render component based on current route -->
    <router-view></router-view>
  </div>
</template>

<script>
import {computed} from "vue";
import AdminSidebarMenu from './components/AdminSidebarMenu.vue';
import SidebarMenu from "./components/SidebarMenu.vue";

// Mock Auth0 function (simulating user authentication)
const mockAuth0 = {
  getUser: () => {
    // Return mock user data
    return {role: "admin"}; // Mock role can be switched between 'admin' or 'student' for testing
  }
};

export default {
  name: 'App',
  components: {
    AdminSidebarMenu,
    SidebarMenu
  },

  setup() {
    // Mock Auth0 - Get user role (replace with actual Auth0 logic later)
    const user = mockAuth0.getUser(); // Simulate user retrieval (replace call with real Auth0 logic for retrieving the user's role)
    const isAdmin = computed(() => user.role === "admin"); // Check if the user is an admin

    // Store mock user in localStorage (store the mock user for the session)
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return {isAdmin};
  },

  data() {
    return {
      currentPage: 'adminhome' // Default to this page
    };
  },
};
</script>

<style>
/* Import CSS files if needed */
  #app {
    display: flex;
  }
</style>



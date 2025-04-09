<template>
  <nav :class="{'sidebar-hidden': isSidebarVisible}" class="sidebar">

  <div>
    <button class="toggle-sidebar-btn" @click="toggleSidebar" :class="{'flipped': isSidebarVisible}">
      <img src="@/assets/toggle-menu.png" alt="Toggle Sidebar Icon" />
    </button>
  </div>

    <div class="profile-header">
      <div class="profile-initial">G</div>
      <div>Professor Ghayekhloo</div>
    </div>
    <ul class="nav-list">
    <!-- Admin Home -->
    <li class="nav-item" @click="$router.push('/adminhome')" :class="{'active': $route.path === '/adminhome'}">
        <img
        loading="lazy"
        src="@/assets/home.png"
        alt="Home navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Home</span>
    </li>
    <!-- Admin Teaching -->
    <li class="nav-item" @click="$router.push('/adminteaching')" :class="{'active': $route.path === '/adminteaching'}">
        <img
        loading="lazy"
        src="@/assets/book.png"
        alt="Teaching navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Teaching</span>
    </li>
    <!-- Admin Publications -->
    <li class="nav-item" @click="$router.push('/adminpublications')" :class="{'active': $route.path === '/adminpublications'}">
        <img
        loading="lazy"
        src="@/assets/feather.png"
        alt="Publications navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Publications</span>
    </li>
    <!-- Admin Research -->
    <li class="nav-item" @click="$router.push('/adminresearch')" :class="{'active': $route.path === '/adminresearch'}">
        <img
        loading="lazy"
        src="@/assets/clipboard.png"
        alt="Research navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Research</span>
    </li>
    <!-- Admin Public Work -->
    <li class="nav-item" @click="togglePublicWorkMenu">
        <img
        loading="lazy"
        src="@/assets/spiral.png"
        alt="Public Work navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Public Work</span>
        <img 
        src="@/assets/keyboard_arrow_down.png" 
        alt="Public Work arrow"
        class="arrow-icon"
        :class="{'rotated': isMenuVisible}"
        />
    </li>
    <!-- Collapsible sub-menu for Public Work -->
    <ul v-if="isMenuVisible" class="sub-menu">
    <li class="nav-item" @click="toggleServiceMenu">
        <img
        loading="lazy"
        src="@/assets/service.png"
        alt="Research navigation icon"
        class="nav-icon"
        />
        <!-- Name of Services Tab on Submenu-->
        Services 

        <img 
        src="@/assets/keyboard_arrow_down.png" 
        alt="Service dropdown arrow"
        class="arrow-icon"
        :class="{'rotated': isServiceMenuVisible}"
        />
    </li>
    <ul v-if="isServiceMenuVisible" class="sub-menu">
        <li class = "nav-item" @click="$router.push('/admin-insideasu')" :class="{'active': $route.path === '/admin-insideasu'}">
        <img
            loading="lazy"
            src="@/assets/bxs-school.svg.png"
            alt="Research navigation icon"
            class="nav-icon"
        />
        Inside ASU</li>
        <li class = "nav-item" @click="$router.push('/admin-outsideasu')" :class="{'active': $route.path === '/admin-outsideasu'}">
        <img
            loading="lazy"
            src="@/assets/bx-building-house.svg.png"
            alt="Research navigation icon"
            class="nav-icon"
        />
        Outside ASU</li>
    </ul>
    <li class="nav-item" @click="toggleMentoringMenu">
        <img
        loading="lazy"
        src="@/assets/mentoring.png"
        alt="Research navigation icon"
        class="nav-icon"
        />
        <!-- Name of Mentoring Tab on Submenu-->
        Mentoring

        <img 
        src="@/assets/keyboard_arrow_down.png" 
        alt="Public Work arrow"
        class="arrow-icon"
        :class="{'rotated': isMentorMenuVisible}"
        />
    </li>
    <ul v-if="isMentorMenuVisible" class="sub-menu"> 
        <li class="nav-item" @click="$router.push('/admin-mentorfaculty')" :class="{'active': $route.path === '/admin-mentorfaculty'}">
        <img
            loading="lazy"
            src="@/assets/staff.png"
            alt="Research navigation icon"
            class="nav-icon"
        />
        Faculty</li>
        <li class="nav-item" @click="$router.push('/admin-mentorstudents')" :class="{'active': $route.path === '/admin-mentorstudents'}">
        <img
            loading="lazy"
            src="@/assets/students.png"
            alt="Research navigation icon"
            class="nav-icon"
        />
        Students</li>
    </ul>
    <li class="nav-item" @click="$router.push('/adminworkhistory')"  :class="{'active': $route.path === '/adminworkhistory'}">
        <img
        loading="lazy"
        src="@/assets/work-history.png"
        alt="Research navigation icon"
        class="nav-icon"
    />
    Work History </li>
    </ul>
    <!-- Admin Tools -->
    <li class="nav-item" @click="$router.push('/admintools')" :class="{'active': $route.path === '/admintools'}">
        <img
        loading="lazy"
        src="@/assets/wrench.png"
        alt="Tools navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Tools</span>
    </li>
    <!-- Admin Users -->
    <li class="nav-item" @click="$router.push('/adminusers')" :class="{'active': $route.path === '/adminusers'}">
        <img
        loading="lazy"
        src="@/assets/user.png"
        alt="Admin navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Admin</span>
    </li>
        <!-- Admin Logout Feature -->
        <li class="nav-item" @click="handleLogout">
        <img
        loading="lazy"
        src="@/assets/logoutButton.png"
        alt="Admin navigation icon"
        class="nav-icon"
        />
        <span class="nav-text">Logout</span>
        </li>
    </ul>
  </nav>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: 'AdminSidebarMenu',
  setup (){
    const { logout } = useAuth0();

    return{
      handleLogout: () => {
        logout({ logoutParams: {returnTo: window.location.origin}});
      }
    };
  },
  data(){
    return {
      isMenuVisible: false, // Track visibility of Public work menu
      isServiceMenuVisible: false,  //Track visibility of Service menu
      isMentorMenuVisible: false, //Track visibility of Mentor menu
      isSidebarVisible: true,  // Sidebar is visible on regular screen size
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    togglePublicWorkMenu(){
      this.isMenuVisible = !this.isMenuVisible;
    },
    toggleServiceMenu(){
      this.isServiceMenuVisible = !this.isServiceMenuVisible;
    },
    toggleMentoringMenu(){   //Track visibility of Mentoring menu
      this.isMentorMenuVisible = !this.isMentorMenuVisible;
    },
    setPage(page) {
      this.$emit('page-changed', page);
      console.log('Navigating to', page); // debug
    }
  }
};
</script>

<style> /* Not scoped */
  body {
  margin: 0;
  padding: 0;
  }

  /* Styles the collapsible menu for Public Works */
  .sub-menu {
    padding-left: 50px;
    list-style-type: none;
    margin-top: 10px;
  }

  .sub-menu .nav-item {
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
  }

  .sub-menu .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .arrow-icon {
    width: 24px;
    height: 24px;
    margin-left: -5px;
    transition: transform 0.30s ease;
  }

  .arrow-icon.rotated { /* Rotate arrow when menu is visible */
    transform: rotate(-90deg);
  }
  
  /* Sidebar styling*/
  .sidebar {
    background-color: rgba(106, 36, 18, 1);
    width: 380px;
    padding: 26px 0 336px 34px;
  }
  
  /* Profile header section inside the sidebar */
  .profile-header {
    display: flex;
    gap: 15px;
    font: 700 36px Poppins, sans-serif;
    color: var(--Color-White, #fff);
  }
  
  .profile-initial {
    border-radius: 16px;
    background: var(--Color-Orange, #fb7d5b);
    width: 48px;
    height: 48px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Navigation list and items in the sidebar */
  .nav-list {
    margin: 32px 0 0 12px;
    list-style: none;
    padding: 0;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 24px;
    color: #fff;
    font: 500 18px Poppins, sans-serif;
    border-radius: 40px 0 0 40px;
    margin: 8px 0;
  }
  
  /* Styling for the current page's navigation item */
  .nav-item.active {
    background: linear-gradient(90deg, #ffc627 60%, #fff 100%);
    box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
  }

  /* Styling for hover effect in navigation */
  .nav-item:hover, .nav-item:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }

  .submenu{
    list-style: none;
    padding: 0 16px;
  }

  .submenu-item{
    cursor: pointer;
    padding: 4px 0;
  }
  
  /* Icon styling for navigation items */
  .nav-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  /* Hide menu toggle button on regular screen size */
  .toggle-sidebar-btn {
    display: none;
  }

  /* Media queries for responsive design go here */
  @media (max-width: 1366px) {
  .sidebar {
    z-index: 1000;
    width: 250px !important;
    display: block;
    transition: width 0.3s ease-in-out;
  }
  
 /*
  .sidebar-hidden {
    display: none; /* Hide sidebar when it's collapsed
  }
  */

  .sidebar-hidden {
    width: 1% !important;
  }

  .sidebar-hidden .profile-header {
    display: none;
  }

  .sidebar-hidden .nav-list {
    display: none;
  }

  .toggle-sidebar-btn {
    z-index: 1001; /* Keep the button on top */
    display: block;
    position: fixed;
    top: 0px;
    left: 182px; /* menu toggled open */
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0;
  }

  .toggle-sidebar-btn img {
    width: 30px;
    height: 30px;
    transition: transform 0.25s ease-in-out;
  }

  .toggle-sidebar-btn.flipped { /* menu toggled closed */
    left: 2px;
  }

  .toggle-sidebar-btn.flipped img {
    transform: rotateY(180deg);
    transition: transform 0.25s ease-in-out;
  }

  .sidebar .nav-list {
    margin: 20px 0 0 5px;
    padding: 0;
  }
  
  .sidebar .nav-item {
    padding: 16px 0px;
    margin: 0;
  }

  .sidebar .nav-icon {
    width: 25px;
    height: 25px;
    object-fit: contain;
  }

  .sidebar .nav-text {
    font-size: 15px;
    margin-left: -5px;
  }

  .sidebar .arrow-icon {
    width: 20px;
    height: 20px;
    margin-left: -15px;
  }

  .sidebar .sub-menu {
    padding-left: 20px;
    margin-top: 0;
  }

  .sidebar .sub-menu .nav-item {
    padding: 10px 0;
    font-size: 12px;
  }

  .sub-menu .nav-icon {
    margin-right: -10px;
    width: 20px;
    height: 20px;
  }

  .sidebar .profile-initial {
    border-radius: 10px;
    width: 30px;
    height: 30px;
    padding: 0 5px;
  }

  .sidebar .profile-header {
    font-size: 22px;
    margin-left: -15px;
    margin-top: 15px;
  }
}

@media (max-width: 926px) {
  .toggle-sidebar-btn {
    z-index: 1001; /* Keep the button on top */
    display: block;
    position: fixed;
    top: 0px;
    left: 175px; /* menu toggled open */
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0;
  }

  .toggle-sidebar-btn.flipped { /* menu toggled closed */
    left: 0px;
  }
}

@media (max-width: 815px) {
  .toggle-sidebar-btn {
    z-index: 1001; /* Keep the button on top */
    display: block;
    position: fixed;
    top: 0px;
    left: 165px; /* menu toggled open */
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0;
  }

  .toggle-sidebar-btn.flipped { /* menu toggled closed */
    left: 0px;
  }
}

@media (max-width: 667px) {
  .toggle-sidebar-btn {
    z-index: 1001; /* Keep the button on top */
    display: block;
    position: fixed;
    top: 0px;
    left: 160px; /* menu toggled open */
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0;
  }

  .toggle-sidebar-btn.flipped { /* menu toggled closed */
    left: 0px;
  }
}

@media (max-width: 480px) {
  .sidebar-hidden {
    width: 0.5% !important;
  }

  .toggle-sidebar-btn {
    z-index: 1001; /* Keep the button on top */
    display: block;
    position: fixed;
    top: 2px;
    left: 163px; /* menu toggled open */
    width: 35px;
    height: 35px;
    border: none;
    padding: 0;
  }

  .toggle-sidebar-btn img {
    width: 30px;
    height: 30px;
    transition: transform 0.25s ease-in-out;
  }

  .toggle-sidebar-btn.flipped {
    left: -1px; /* menu toggled closed */
  }

  .toggle-sidebar-btn.flipped img {
    transform: rotateY(180deg);
    transition: transform 0.25s ease-in-out;
  }

  .sidebar .nav-list {
    margin: 20px 0 0 5px;
    padding: 0;
  }
  
  .sidebar .nav-item {
    padding: 16px 0px;
    margin: 0;
  }

  .sidebar .nav-icon {
    width: 25px;
    height: 25px;
    object-fit: contain;
  }

  .sidebar .nav-text {
    font-size: 15px;
    margin-left: -5px;
  }

  .sidebar .arrow-icon {
    width: 20px;
    height: 20px;
    margin-left: -15px;
  }

  .sidebar .sub-menu {
    padding-left: 20px;
    margin-top: 0;
  }

  .sidebar .sub-menu .nav-item {
    padding: 10px 0;
    font-size: 12px;
  }

  .sub-menu .nav-icon {
    margin-right: -10px;
    width: 20px;
    height: 20px;
  }

  .sidebar .profile-initial {
    border-radius: 10px;
    width: 30px;
    height: 30px;
    padding: 0 5px;
  }

  .sidebar .profile-header {
    font-size: 22px;
    margin-left: -15px;
  }
}
</style>
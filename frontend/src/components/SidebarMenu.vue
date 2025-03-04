<template>
    <nav class="sidebar">
        <div class="profile-header">
        <div class="profile-initial">G</div>
        <div>Professor Ghayekhloo</div>
        </div>
        <ul class="nav-list">
        <!-- Student Home -->
        <li class="nav-item" @click="$router.push('/studenthome')">
            <img
            loading="lazy"
            src="@/assets/home.png"
            alt="Home navigation icon"
            class="nav-icon"
            />
            <span class="nav-text">Home</span>
        </li>
        <!-- Student Teaching -->
        <li class="nav-item" @click="$router.push('/studentteaching')">
            <img
            loading="lazy"
            src="@/assets/book.png"
            alt="Teaching navigation icon"
            class="nav-icon"
            />
            <span class="nav-text">Teaching</span>
        </li>
        <!-- Student Publications -->
        <li class="nav-item" @click="$router.push('/studentpublications')">
            <img
            loading="lazy"
            src="@/assets/feather.png"
            alt="Publications navigation icon"
            class="nav-icon"
            />
            <span class="nav-text">Publications</span>
        </li>
        <!-- Student Research -->
        <li class="nav-item" @click="$router.push('/studentresearch')">
            <img
            loading="lazy"
            src="@/assets/clipboard.png"
            alt="Research navigation icon"
            class="nav-icon"
            />
            <span class="nav-text">Research</span>
        </li>
        <!-- Student Public Work -->
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
            <li class = "nav-item" @click="$router.push('/student-insideasu')">
            <img
                loading="lazy"
                src="@/assets/bxs-school.svg.png"
                alt="Research navigation icon"
                class="nav-icon"
            />
            Inside ASU</li>
            <li class = "nav-item" @click="$router.push('/student-outsideasu')">
            <img
                loading="lazy"
                src="@/assets/bx-building-house.svg.png"
                alt="Research navigation icon"
                class="nav-icon"
            />
            Outside ASU</li>
        </ul>
        <li class="nav-item" @click="toggleMentoringMenu" >
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
            <li class="nav-item" @click="$router.push('/student-mentorfaculty')">
            <img
                loading="lazy"
                src="@/assets/staff.png"
                alt="Research navigation icon"
                class="nav-icon"
            />
            Faculty</li>
            <li class="nav-item" @click="$router.push('/student-mentorstudents')">
            <img
                loading="lazy"
                src="@/assets/students.png"
                alt="Research navigation icon"
                class="nav-icon"
            />
            Students</li>
        </ul>
        <li class="nav-item" @click="$router.push('/studentworkhistory')">
            <img
            loading="lazy"
            src="@/assets/work-history.png"
            alt="Research navigation icon"
            class="nav-icon"
        />
        Work History </li>
        </ul>
        <!-- Student Tools -->
        <li class="nav-item" @click="$router.push('/studenttools')">
            <img
            loading="lazy"
            src="@/assets/wrench.png"
            alt="Tools navigation icon"
            class="nav-icon"
            />
            <span class="nav-text">Tools</span>
        </li>
        <!-- Authentication Login  -->
        <li class="nav-item" @click="handleLogin">
            <img
            loading="lazy"
            src="@/assets/loginButton.png"
            alt="Tools navigation icon"
            class="nav-icon"
            />
            <span class="nav-text" > Login </span>
        </li>
      </ul>
    </nav>
</template>

<script>
// import LoginButton from '@/authentication/login-button.vue';
 
import { useAuth0 } from "@auth0/auth0-vue";
   
export default {
  name: 'SidebarMenu',
// Setup Auth0 function, to be commented out later
  setup (){
    const { loginWithRedirect } = useAuth0();

    return{
      handleLogin: () => loginWithRedirect({
        redirectUri: window.location.origin + '/adminhome'
      }),
    };
  },

  data(){
    return {
      isMenuVisible: false,
      isServiceMenuVisible: false,  //Track visibility of Service menu
      isMentorMenuVisible: false, //Track visibility of Mentor menu
    };
  },
  methods: {
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
  
  /* Flex container that holds the sidebar and main content */
  .layout-wrapper {
    display: flex;
    gap: 37px; /* Space between sidebar and content*/
  }
  
  /* Sidebar styling*/
  .sidebar {
    background-color: rgba(106, 36, 18, 1);
    width: 22%;
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
</style>
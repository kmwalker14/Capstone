<template>
  <div class="admin-container">
    <div class="layout-wrapper">
      <nav class="sidebar">
        <div class="profile-header">
          <div class="profile-initial">G</div>
          <div>Professor Ghayekhloo</div>
        </div>
        <ul class="nav-list">
          <!-- Admin Home -->
          <li class="nav-item">
            <img
              loading="lazy"
              src="@/assets/home.png"
              alt="Home navigation icon"
              class="nav-icon"
            />
            <span class="nav-text" @click="setPage('adminhome')">Home</span>
          </li>
          <!-- Admin Teaching -->
          <li class="nav-item" @click="setPage('adminteaching')">
            <img
              loading="lazy"
              src="@/assets/book.png"
              alt="Teaching navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Teaching</span>
          </li>
          <!-- Admin Publications -->
          <li class="nav-item" @click="setPage('adminpublications')">
            <img
              loading="lazy"
              src="@/assets/feather.png"
              alt="Publications navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Publications</span>
          </li>
          <!-- Admin Research -->
          <li class="nav-item" @click="setPage('adminresearch')">
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
              <li class = "nav-item">
                <img
                  loading="lazy"
                  src="@/assets/bxs-school.svg.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Inside ASU</li>
              <li class = "nav-item">
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
              <li class="nav-item">
                <img
                  loading="lazy"
                  src="@/assets/staff.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Faculty</li>
              <li class="nav-item">
                <img
                  loading="lazy"
                  src="@/assets/students.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Students</li>
            </ul>
            <li class="nav-item">
              <img
              loading="lazy"
              src="@/assets/work-history.png"
              alt="Research navigation icon"
              class="nav-icon"
            />
            Work History </li>
           </ul>
          <!-- Admin Tools -->
          <li class="nav-item" @click="setPage('admintools')">
            <img
              loading="lazy"
              src="@/assets/wrench.png"
              alt="Tools navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Tools</span>
          </li>
          <!-- Admin Users - NOTE: Should login page have the admin tab available or only upon successful login???
          <li class="nav-item active" @click="setPage('adminusers')">
            <img
              loading="lazy"
              src="@/assets/user.png"
              alt="Admin navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Admin</span>
          </li>
          -->
        </ul>
      </nav>
      <main class="main-content">
        <header class="header">
          <h1 class="page-title"></h1> <!-- Add page title -->
          <!--
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">Samira G.</span>
              <span class="user-role">Admin</span>
            </div>
            <div class="user-avatar"></div>
          </div>
          -->
        </header>
            <form class="admin-form" @submit.prevent="handleLogin">
              <div class="form-layout">
                <div class="form-fields">
                  <div class="field-row">
                    <div class="form-group">
                      <label for="firstName">Username</label>
                      <input
                        type="text"
                        id="firstName"
                        v-model="firstName"
                        placeholder="Enter username"
                        required
                        class="form-input"
                      />
                    </div>
                  </div>
                  <div class="field-row">
                    <div class="form-group">
                      <label for="email">Password</label>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="Enter password"
                        required
                        class="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            <button type="submit" class="login-button" tabindex="0"> <!-- tabindex lets user tab through fields in order-->
              Login
            </button>
          </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      isMenuVisible: false, // Track visibility of Public Work menu
      isServiceMenuVisible: false,  //Track visibility of Service menu
      isMentorMenuVisible: false, //Track visibility of Mentor menu
    };
  },
  methods: {
    togglePublicWorkMenu() {   // Track visibility of Public Work menu
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
    },
    handleLogin() {
      // Login logic here
      console.log('Successful login:', {
        // empty for now
      });
    }
  }
};
</script>

<style scoped>
  /* Styles the login button */ 
.login-button {
  display: block;
  width: 140px;
  height: 50px;
  margin: 20px auto -50px;
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
}

.admin-form {
  padding: 250px 500px;
}

.form-layout {
  display: flex;
  gap: 24px;
}

.form-fields {
  flex: 1;
}

.field-row {
  display: flex;
  gap: 24px;
  margin-bottom: 49px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  color: var(--Color-Text, #303972);
  font: 700 18px Poppins, sans-serif;
  margin-bottom: 16px;
}

.form-input {
  width: 95%;
  padding: 14px;
  border: 1px solid var(--Color-Gray-2, #c1bbeb);
  border-radius: 5px;
  font-size: 14px;
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

/* Styles the main container that holds the entire admin layout */
.admin-container {
background: var(--Color-Background, #f3f4ff);
padding: 0 37px 0 0;
overflow: hidden;
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

/* Icon styling for navigation items */
.nav-icon {
width: 40px;
height: 40px;
object-fit: contain;
}

/* Main content styling */
.main-content {
width: 82%;
}

/* Header with page title and user details */
.header {
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 13px 0 36px;
font-family: Poppins, sans-serif;
}

/*
.page-title {
color: var(--Color-Text, #303972);
font: 700 36px Poppins, sans-serif;
margin: 50px auto -400px;
}
*/

.user-profile {
display: flex;
gap: 18px;
align-items: center;
}

.user-info {
text-align: center;
}

/* User text styling for name and role */
.user-name {
color: var(--Color-Text, #303972);
font: 600 14px Poppins, sans-serif;
display: block;
}

.user-role {
color: var(--Color-Gray-3, #a098ae);
font: 400 14px Poppins, sans-serif;
margin-top: 4px;
display: block;
}

/* Avatar styling */
.user-avatar {
width: 60px;
height: 60px;
border-radius: 40px;
background: var(--Color-Gray-2, #c1bbeb);
}

/* Content section styling */
.content-section {
background: #fff;
border-radius: 20px;
margin-top: 20px;
}

/* Banner styling */
.banner {
position: relative;
min-height: 100px;
}

/* Profile styling */
.profile-content {
display: flex;
padding: 0 36px 92px;
margin-top: -27px;
position: relative;
z-index: 1;
}

.profile-details {
width: 100%;
color: var(--Color-Text, #303972);
font-family: Poppins, sans-serif;
}

.profile-header-section {
display: flex;
justify-content: space-between;
flex-wrap: wrap;
gap: 20px;
}

/* REMOVE ??? */
.profile-title {
font: 700 32px Poppins, sans-serif;
margin: 10;     /*T: 10, O: 0*/
padding-right: 1%; /*T: 1%, O: null*/
}

/* Styling for about section */
.section-title {
font: 700 24px Poppins, sans-serif;
margin: 34px 0 30px;
}

.section-content {
font: 400 18px Poppins, sans-serif;
text-align: justify;
margin: 0;
}

/* Media query for smaller screen (test) */
/*
@media (max-width: 991px) {
.admin-container {
  padding-right: 20px;
}

.layout-wrapper {
  flex-direction: column;
}

.sidebar,
.main-content {
  width: 100%;
}

.sidebar {
  margin-top: 14px;
  padding-bottom: 100px;
}

.profile-initial {
  white-space: initial;
}

.nav-item {
  padding: 0 20px;
}

.header {
  margin-top: 40px;
  max-width: 100%;
}

.profile-content {
  flex-direction: column;
}

.profile-details {
  width: 100%;
  margin-left: 0;
}
}
*/
</style>
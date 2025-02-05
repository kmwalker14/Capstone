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
          <li class="nav-item" @click="$router.push('/adminhome')">
            <img
              loading="lazy"
              src="@/assets/home.png"
              alt="Home navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Home</span>
          </li>
          <!-- Admin Teaching -->
          <li class="nav-item" @click="$router.push('/adminteaching')">
            <img
              loading="lazy"
              src="@/assets/book.png"
              alt="Teaching navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Teaching</span>
          </li>
          <!-- Admin Publications -->
          <li class="nav-item" @click="$router.push('/adminpublications')">
            <img
              loading="lazy"
              src="@/assets/feather.png"
              alt="Publications navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Publications</span>
          </li>
          <!-- Admin Research -->
          <li class="nav-item" @click="$router.push('/adminresearch')">
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
              <li class = "nav-item" @click="$router.push('/admin-insideasu')">
                <img
                  loading="lazy"
                  src="@/assets/bxs-school.svg.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Inside ASU</li>
              <li class = "nav-item" @click="$router.push('/admin-outsideasu')">
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
              <li class="nav-item" @click="$router.push('/admin-mentoringfaculty')">
                <img
                  loading="lazy"
                  src="@/assets/staff.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Faculty</li>
              <li class="nav-item" @click="$router.push('/admin-mentoringstudents')">
                <img
                  loading="lazy"
                  src="@/assets/students.png"
                  alt="Research navigation icon"
                  class="nav-icon"
                />
              Students</li>
            </ul>
            <li class="nav-item" @click="$router.push('/adminworkhistory')">
              <img
              loading="lazy"
              src="@/assets/work-history.png"
              alt="Research navigation icon"
              class="nav-icon"
            />
            Work History </li>
           </ul>
          <!-- Admin Tools -->
          <li class="nav-item" @click="$router.push('/admintools')">
            <img
              loading="lazy"
              src="@/assets/wrench.png"
              alt="Tools navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Tools</span>
          </li>
          <!-- Admin Users -->
          <li class="nav-item active" @click="$router.push('/adminusers')">
            <img
              loading="lazy"
              src="@/assets/user.png"
              alt="Admin navigation icon"
              class="nav-icon"
            />
            <span class="nav-text">Admin</span>
          </li>
        </ul>
      </nav>
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Admin Users</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">Samira G.</span>
              <span class="user-role">Admin</span>
            </div>
            <div class="user-avatar"></div>
          </div>
        </header>
        <button class="new-admin-button" @click="setPage('adminnew')">+ New Admin</button>
        <section class="content-section">
          <div class="banner"> <!-- REMOVE BANNER ??? -->
          </div>
          <div class="profile-content">
            <div class="profile-details">
              <div class="profile-header-section">
              </div>
              <section class="about-section">
                <!-- <h3 class="section-title">Modify Admin Users</h3> -->
                <!-- User info header -->
                <div class="user-info-header">
                  <!-- <span class="user-checkbox-header">Select</span> -->
                  <span class="user-name-header">Name</span>
                  <span class="user-username-header">Username</span>
                  <span class="user-email-header">Email</span>
                  <span class="action-header">Action</span>
                </div>
                <!-- User info row -->
                <div class="user-info-row">
                  <!-- <input type="checkbox" id="user1" class="user-checkbox" /> -->
                  <label for="user1" class="user-name">Leslie Grey</label>
                  <span class="user-username">lgrey123</span>
                  <span class="user-email">lgrey123@asu.edu</span>
                  <div class="action-menu">
                    <button class="action-button" @click="toggleDropdown(1, $event)">
                      &#8230; <!-- Horizontal Dots -->
                    </button>
                    <ul v-if="dropdownVisible === 1" class="dropdown-menu">
                      <li @click="editUser(1)">Edit</li>
                      <li @click="removeUser(1)">Remove</li>
                    </ul>
                  </div>
                </div>
                <div class="user-info-row">
                  <!-- <input type="checkbox" id="user2" class="user-checkbox" /> -->
                  <label for="user2" class="user-name">Nathan Lee</label>
                  <span class="user-username">nlee123</span>
                  <span class="user-email">nlee123@asu.edu</span>
                  <div class="action-menu">
                    <button class="action-button" @click="toggleDropdown(2, $event)">
                      &#8230; <!-- Horizontal Dots -->
                    </button>
                    <ul v-if="dropdownVisible === 2" class="dropdown-menu">
                      <li @click="editUser(2)">Edit</li>
                      <li @click="removeUser(2)">Remove</li>
                    </ul>
                  </div>
                </div>
                <div class="user-info-row">
                  <!-- <input type="checkbox" id="user3" class="user-checkbox" /> -->
                  <label for="user3" class="user-name">Maria Smith</label>
                  <span class="user-username">msmith123</span>
                  <span class="user-email">msmith123@asu.edu</span>
                  <div class="action-menu">
                    <button class="action-button" @click="toggleDropdown(3, $event)">
                      &#8230; <!-- Horizontal Dots -->
                    </button>
                    <ul v-if="dropdownVisible === 3" class="dropdown-menu">
                      <li @click="editUser(3)">Edit</li>
                      <li @click="removeUser(3)">Remove</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data() {
    return {
      isMenuVisible: false,
      isServiceMenuVisible: false,
      isMentorMenuVisible: false,
      dropdownVisible: null, // Tracks which dropdown is visible
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
    setPage(page) { // Navigate to this page when clicked
      this.$emit('page-changed', page);
    },
    toggleDropdown(userId, event) {
      event.stopPropagation();
      this.dropdownVisible = this.dropdownVisible === userId ? null : userId; // Toggle visibility based on userId
    },
    editUser(userId) {  // Handle the actions when the edit option is clicked (currently shows an alert with user's ID)
      alert(`Edit user with ID: ${userId}`);
    },
    removeUser(userId) {  // Handle the actions when the remove option is clicked (currently shows an alert with user's ID)
      alert(`Remove user with ID: ${userId}`);
    },
    closeDropdown() {
      this.dropdownVisible = null; // Close any open dropdown
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    // Clean up event listener when component is destroyed/unmounted
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped>
/* New admin button styling */
  .new-admin-button {
    display: block;
    position: relative;
    margin: 50px 0 0 1325px;
    width: 155px;
    height: 50px;
    border-radius: 40px;
    background: var(--Color-Purple, #4d44b5);
    color: #fff;
    font: 400 18px Poppins, sans-serif;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
  }

/* Styles the user info header */
.user-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  color: var(--Color-Text, #303972);
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

/*
.user-checkbox-header {
  width: 20%;
}
*/

.user-name-header, .user-username-header, .user-email-header {
  flex: 1;
  text-align: left;
}

.action-header {
  width: 50px;  /* Align with action menu button */
  text-align: right;
}

/* Styles the user info row */
.user-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  position: relative;
}

/*
.user-checkbox {
  width: 20px;
  height: 20px;
}
*/

.user-name, .user-username, .user-email {
  flex: 1;  /* Align with header */
  font-size: 14px;
  color: var(--Color-Gray-3, #a098ae);
}

.user-name {
  font-weight: 600;
  color: var(--Color-Text, #303972);
}

.action-menu {
  width: 50px; /* Align with action header */
  text-align: right;
}

/* Styles the action dropdown menu */
.action-menu {
  position: relative;
  margin-left: auto;
}

.action-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: inline-block;
  vertical-align: 50%;
  padding: 0;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px 0;
  margin: 0;
  z-index: 10;
  width: 120px;
}

.dropdown-menu li {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #303972;
}

.dropdown-menu li:hover {
  background: #f5f5f5;
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

.page-title {
color: var(--Color-Text, #303972);
font: 700 36px Poppins, sans-serif;
margin: 0;
}

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
min-height: 55px;
}

/* Profile styling */
.profile-content {
display: flex;
padding: 0 36px 55px;
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
margin: 34px 30px;
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
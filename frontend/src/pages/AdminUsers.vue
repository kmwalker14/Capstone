<template>
  <div class="admin-container">
    <div class="layout-wrapper">
    
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
  methods: {
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

/* Styles the main container that holds the entire admin layout */
.admin-container {
  background: var(--Color-Background, #f3f4ff);
  padding: 0 37px 0 0;
  overflow: hidden;
  flex-grow: 1;
  width: 100%;
}

/* Flex container that holds the sidebar and main content */
.layout-wrapper {
  display: flex;
  gap: 37px; /* Space between sidebar and content*/
  width: 100%;
  flex-grow: 1;
  padding: 0px 15px 0px 15px;
}

/* Main content styling */
.main-content {
  width: 100%;
  flex-grow: 1;
  padding: 20px;
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

/* Media queries for responsive design go here */
</style>
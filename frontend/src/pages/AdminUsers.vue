<template>
  <div class="admin-container">
    <div class="layout-wrapper">
    
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Admin Users</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-role">Admin</span>
            </div>
          </div>
        </header>
        <button class="new-admin-button" @click="$router.push('/adminnew')">+ New Admin</button>
        <section class="content-section">
          <div class="banner"></div>
          <div class="profile-content">
            <div class="profile-details">
              <div class="profile-header-section">
              </div>
              <section class="about-section">
                <!-- <h3 class="section-title">Modify Admin Users</h3> -->
                <!-- User info header -->
                <div class="user-info-header">
                  <span class="user-name-header">Name</span>
                  <span class="user-username-header">UserID</span>
                  <span class="user-email-header">Email</span>
                  <span class="action-header">Action</span>
                </div>
                <!-- User info row -->
                <div class="user-info-row" v-for="admin in admins" :key="admin.id">
                  <template v-if="editingAdminId === admin.id">
                    <!-- Editable Fields -->
                    <input type="text" v-model="editedAdmin.firstname" class="edit-input" />
                    <input type="text" v-model="editedAdmin.lastname" class="edit-input" />
                    <input type="text" v-model="editedAdmin.username" class="edit-input" />
                    <input type="email" v-model="editedAdmin.email" class="edit-input" />
                    <div class="action-buttons">
                      <button class="save-btn" @click="saveEdit(admin.id)">Save</button>
                      <button class="cancel-btn" @click="cancelEdit">Cancel</button>
                    </div>
                  </template>
                  
                  <template v-else>
                    <span class="user-name">{{ admin.firstname }} {{ admin.lastname }}</span>
                    <span class="user-username">{{ admin.username }}</span>
                    <span class="user-email">{{ admin.email }}</span>
                    <div class="action-menu">
                      <button class="action-button" @click="toggleDropdown(admin.id, $event)">&#8230;</button>
                      <ul v-if="dropdownVisible === admin.id" class="dropdown-menu">
                        <li @click="editUser(admin)">Edit</li>
                        <li @click="removeUser(admin.id)">Remove</li>
                      </ul>
                    </div>
                  </template>
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
import axios from 'axios';
export default {
  name: 'AdminUsers',
  data() {
    return {
      admins: [],
      dropdownVisible: null,  // Tracks which dropdown is visible
      editingAdminId: null,
      editedAdmin: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
      },
    };
  },

  methods: {
    async fetchAdmins() {
      const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://asu-capstone-backend.onrender.com";

      try {
        const response = await axios.get(`${backendUrl}/admins`); // Update with your API endpoint
        this.admins = response.data; // Store fetched data
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    },

    toggleDropdown(userId, event) {
      event.stopPropagation();
      this.dropdownVisible = this.dropdownVisible === userId ? null : userId; // Toggle visibility based on userId
    },

    editUser(admin) {  // Handle the actions when the edit option is clicked (currently shows an alert with user's ID)
    this.editingAdminId = admin.id;
      this.editedAdmin = { ...admin }; // Copy admin details to editedAdmin
      this.dropdownVisible = null; // Close dropdown
    },

    async saveEdit(userId) {
      const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://asu-capstone-backend.onrender.com";
      try {
        await axios.put(`${backendUrl}/admins`, {
          id: userId,
          firstname: this.editedAdmin.firstname,
          lastname: this.editedAdmin.lastname,
          username: this.editedAdmin.username,
          email: this.editedAdmin.email,
        });
        // Update UI
        this.admins = this.admins.map(admin => admin.id === userId ? { ...admin, ...this.editedAdmin } : admin );

        this.editingAdminId = null; // Exit edit mode
      } catch (error) {
        console.error("Error updating admin:", error);
        alert("Failed to update admin.");
      }
    },

    cancelEdit() {
      this.editingAdminId = null; // Cancel edit mode
    },

    async removeUser(userId) {  // Handle the actions when the remove option is clicked (currently shows an alert with user's ID)
      if (!confirm("Are you sure you want to remove this admin?")) return;

      try {
        const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://asu-capstone-backend.onrender.com";

        await axios.delete(`${backendUrl}/admins`,{ data: { id: userId }});
        
        // Update the UI: Remove the deleted admin from the list
        this.admins = this.admins.filter(admin => admin.id !== userId);

        
        alert("Admin removed successfully!");
      } catch (error) {
        console.error("Error removing admin:", error);
        alert("Failed to remove admin.");
      }
    },

    closeDropdown() {
      this.dropdownVisible = null; // Close any open dropdown
    },
  },

  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown);
    this.fetchAdmins();
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
  margin: 20px 0 20px auto;
  width: 150px;
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

.about-section {
  margin-top: 60px;
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

/* User text styling for user role */
.user-role {
  color: var(--Color-Gray-3, #a098ae);
  font: 400 14px Poppins, sans-serif;
  margin-top: 4px;
  display: block;
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
  height: 50px;
  background-color:  var(--Color-Purple, #4d44b5);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 34px;
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

/* Styling for about section */
.section-content {
  font: 400 18px Poppins, sans-serif;
  text-align: justify;
  margin: 0;
}

/* Media queries for responsive design go here */
@media (max-width: 1280px) {
  .layout-wrapper {
    flex-direction: row;
    padding: 15px;
  }

  .content-section {
    padding-bottom: 40px;
  }

  .header {
    flex-direction: row;
    justify-content: space-between;
  }

  .page-title {
    font-size: 32px;
  }

  .user-profile {
    flex-direction: row;
    gap: 20px;
  }

  .new-admin-button {
    width: 120px;
    height: 45px;
    border-radius: 40px;
    font-size: 14px;
    font-weight: 600;
  }

  .user-info-header {
    text-align: left;
  }

  .user-info-row {
    flex-direction: row;
    padding: 10px 0;
  }

  .user-info-row .user-name,
  .user-info-row .user-username,
  .user-info-row .user-email {
    width: auto;
  }

  .action-menu {
    text-align: right;
  }

  .edit-input {
    width: 30%;
  }

  .profile-content {
    padding: 0 30px;
  }
}

@media (max-width: 480px) {
  .admin-container {
    margin-right: -15px;
    margin-left: -10px;
  }
  
  .layout-wrapper {
    flex-direction: row;
    padding: 15px;
  }

  .banner {
    height: 40px;
    margin-top: 10px;
  }

  .main-content {
    padding: 10px;
  }

  .content-section {
    padding-bottom: 30px;
  }

  .header {
    align-items: flex-start;
    margin: 0px;
  }

  .page-title {
    font-size: 24px;
  }

  .user-name,
  .user-role {
    font-size: 14px;
  }

  .new-admin-button {
    width: 100px;
    height: 40px;
    font-size: 12px;
    border-radius: 40px;
  }

  .user-info-header {
    flex-direction: row;
    text-align: left;
    font-size: 14px;
    gap: 30px;
  }

  .user-name-header,
  .user-username-header,
  .user-email-header,
  .action-header {
    width: 100%;
    flex: 1;
  }

  .user-info-row {
    flex-direction: row;
    text-align: left;
    padding: 12px 0px;
  }

  .user-info-row .user-name,
  .user-info-row .user-username,
  .user-info-row .user-email {
    width: 100%;
    font-size: 12px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
    margin-right: 15px;
  }

  .action-menu {
    text-align: right;
    margin-left: 0;
  }

  .edit-input {
    height: 20px;
  }

  .profile-content {
    padding: 0px 15px;
    margin-top: -30px;
  }
}

@media (max-width: 428px) {
  .user-info-header {
    gap: 35px;
  }
}

@media (max-width: 390px) {
  .user-info-header {
    gap: 20px;
  }
}
</style>

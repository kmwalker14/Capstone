<template>
  <div class="admin-container">
    <div class="layout-wrapper">

      <main class="main-content">
        <header class="header">
          <h1 class="page-title">New Admin</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-role">Admin</span>
            </div>
          </div>
        </header>
          <button class="new-admin-button" @click="setPage('adminnew')">+ New Admin</button>
          <section class="admin-form-section">
            <h2 class="section-title">Admin Details</h2>
            <form class="admin-form" @submit.prevent="handleSubmit">
              <div class="form-layout">
                <div class="form-fields">
                  <div class="field-row">
                    <div class="form-group">
                      <label for="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        v-model="firstName"
                        placeholder="e.g., Jennifer"
                        required
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        v-model="lastName"
                        placeholder="e.g., Williams"
                        required
                        class="form-input"
                      />
                    </div>
                  </div>
                  <div class="field-row">
                    <div class="form-group">
                      <label for="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        v-model="userEmail"
                        placeholder="e.g., jwilliams@asu.edu"
                        required
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="username">Username *</label>
                      <input
                        type="text"
                        id="username"
                        v-model="userName"
                        placeholder="e.g., jwilliams123"
                        required
                        class="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            <button class="submit-button" type="submit">Submit</button>
            <button class="cancel-button" type="cancel" @click="$router.push('/adminusers')">Cancel</button>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminNew',
  data() {
    return {
      firstName: null,
      lastName: null,
      userEmail: null,
      userName: null
    };
  },

  methods: {
    setPage(page) { // Keep or remove ?????
      this.$emit('page-changed', page);
    },

    async handleSubmit() {
      const firstname = this.firstName;
      const lastname = this.lastName;
      const username = this.userName;
      const email = this.userEmail;
      
      // Make sure the backend URL is correct
      const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://asu-capstone-backend.onrender.com";
      console.log("Backend URL:", backendUrl); // Debugging output

      try {
        // Send the POST request to the backend with the entered admin data
        const response = await axios.post(`${backendUrl}/api/admins`, { firstname, lastname, username, email });
        console.log("✅ Admin added:", response.data);
        alert("Admin added successfully!");
        this.$router.push("/adminusers"); // Redirect to the Admin Users page
      } catch (error) {
        console.error("❌ Error:", error);
        alert("An error occurred while adding the admin."); 
      }
    }
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

/* Styles the submit button */ 
.submit-button {
  display: block;
  width: 110px;
  height: 40px;
  margin: 40px auto -50px;
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
}

.cancel-button {
  display: block;
  width: 110px;
  height: 40px;
  margin: 70px auto -80px;
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
}

/* Styles the form area */
.section-title {
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  padding: 12px 40px;
  font: 700 24px Poppins, sans-serif;
  border-radius: 20px 20px 0 0;
  margin: 34px 0 30px;
}

.section-content {
  font: 400 18px Poppins, sans-serif;
  text-align: justify;
  margin: 0;
}

.admin-form-section {
  background: #fff;
  border-radius: 20px;
  padding-bottom: 80px;
}

.admin-form {
  padding: 32px 40px;
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

/* Media queries for responsive design go here */
@media (max-width: 1280px) {
  .admin-container {
    padding: 15px;
  }

  .layout-wrapper {
    padding: 0px;
  }

  .main-content {
    padding: 20px;
  }

  .page-title {
    font-size: 32px;
  }

  .new-admin-button {
    width: 120px;
    height: 45px;
    border-radius: 40px;
    font-size: 14px;
    font-weight: 600;
  }

  .section-title {
    font-size: 22px;
    font-weight: 600;
  }

  .admin-form-section {
    padding-bottom: 60px;
  }

  .form-layout {
    flex-direction: column; /* Stack form fields vertically if needed */
  }

  .form-fields {
    flex: 1;
  }

  .field-row {
    margin-bottom: 30px;
  }

  .form-group {
    width: 100%;
  }

  .form-input {
    font-size: 16px;
    padding: 12px;
  }

  .submit-button {
    width: 105px;
    height: 45px;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 40px;
  }

  .cancel-button {
    width: 105px;
    height: 45px;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 40px;
    margin-bottom: -60px;
  }
}

@media (max-width: 480px) {
  .admin-container {
    flex-direction: column;
    padding: 10px;
  }

  .layout-wrapper {
    padding: 0px;
  }

  .main-content {
    padding: 10px;
  }

  .header {
    align-items: flex-start;
    margin: 0;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .new-admin-button {
    width: 100px;
    height: 40px;
    font-size: 12px;
    border-radius: 40px;
  }

  .section-title {
    font-size: 18px;
    padding: 10px 20px;
  }

  .form-group label {
    font-size: 16px;
    font-weight: 600px;
  }

  .admin-form-section {
    margin-top: -15px;
  }

  .admin-form {
    padding: 20px;
  }

  .form-layout {
    flex-direction: column;
    gap: 20px;
  }

  .field-row {
    flex-direction: column;
    gap: 20px;
  }

  .form-input {
    width: 90%;
    padding: 12px;
    font-size: 14px;
  }

  .submit-button {
    width: 90px;
    height: 40px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 40px;
  }

  .cancel-button {
    width: 90px;
    height: 40px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 40px;
    margin-bottom: -50px;
  }
}
</style>

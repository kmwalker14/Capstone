<template>
  <div class="admin-container">
    <div class="layout-wrapper">

      <main class="main-content">
        <header class="header">
          <h1 class="page-title">New Admin</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">Samira G.</span>
              <span class="user-role">Admin</span>
            </div>
            <div class="user-avatar"></div>
          </div>
        </header>
          <button class="new-admin-button" @click="setPage('adminnew')">+ New Admin</button>
          <section class="admin-form-section">
            <h2 class="section-title">Admin Details</h2>
            <form class="admin-form" @submit.prevent="handleSubmit">
              <div class="form-layout">
                <!--
                <div class="photo-upload">
                  <label for="photo-input" class="visually-hidden">Upload Photo</label>
                  <input 
                    type="file" 
                    id="photo-input"
                    accept="image/*"
                    class="photo-input"
                  />
                </div>
                -->
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
                        v-model="email"
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
                        v-model="username"
                        placeholder="e.g., jwilliams123"
                        required
                        class="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            <button type="submit" class="submit-button" tabindex="0"> <!-- tabindex lets user tab through fields in order-->
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNew',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: ''
    };
  },
  methods: {
    setPage(page) { // Keep or remove ?????
      this.$emit('page-changed', page);
    },
    handleSubmit() {
      // Form submission logic here
      console.log('Form submitted:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username
      });
    }
  }
};
</script>

<style scoped>
/* New admin button styling */
.new-admin-button {
  display: block;
  position: relative;
  margin: 50px 0 -15px 1325px;
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

/* Styles the submit button */ 
.submit-button {
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

/* Styles the form area */
.admin-form-section {
  background: #fff;
  border-radius: 20px;
  padding-bottom: 80px;
}

.section-title {
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  padding: 12px 40px;
  font-size: 24px;
  font-weight: 700;
  border-radius: 20px 20px 0 0;
  margin: 0;
}

.admin-form {
  padding: 32px 40px;
}

.form-layout {
  display: flex;
  gap: 24px;
}

/*
.photo-upload {
  width: 175px;
}
*/

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
}

/* Flex container that holds the sidebar and main content */
.layout-wrapper {
display: flex;
gap: 37px; /* Space between sidebar and content*/
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

/* Media queries for responsive design go here */
</style>
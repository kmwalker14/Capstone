<template>
  <div class="admin-container">
    <div class="layout-wrapper">

      <!-- Sidebar menu was here -->

      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Welcome!</h1>

        </header>
        <section class="content-section">
          <div class="banner">
            <img
                loading="lazy"
                src="@/assets/banner.svg"
                alt="Profile banner background"
                class="banner-image"
            />

          </div>
          <div class="profile-content">
            <div class="profile-details">
              <div class="profile-header-section">
                <div class="profile-title-group">
                  <h2 class="profile-title">Professor Ghayekhloo</h2>
                  <div class="location-info">
                    <img
                        loading="lazy"
                        src="@/assets/location.png"
                        alt="Location icon"
                        class="location-icon"
                    />
                    <span class="location-text">Phoenix, Arizona</span>
                  </div>
                </div>
                <div class="contact-info">
                  <img
                      loading="lazy"
                      src="@/assets/email.png"
                      alt="Email icon"
                      class="email-icon"
                  />
                  <span class="email-text">sghayekh@asu.edu</span>
                </div>
              </div>
              <section class="about-section">
                <h3 class="section-title">About:</h3>
                <p class="section-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              </section>
              <section class="education-section">
                <h3 class="section-title">Education:</h3>
                <div class="education-item">
                  <h4 class="education-degree">
                    Insert Major, University Insert Here
                  </h4>
                  <span class="education-year">20??-20??</span>
                </div>
                <div class="education-item">
                  <h4 class="education-degree">
                    Master of Insert Here, University Insert Here
                  </h4>
                  <span class="education-year">20??-20??</span>
                </div>
              </section>
              <section class="office-hours-section">
                <h3 class="section-title">Office Hours:</h3>
                <p class="section-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </p>
              </section>
            </div>
            <div class="profile-image-container">
              <img
                  loading="lazy"
                  src="@/assets/samira.png"
                  alt="Professor Ghayekhloo profile"
                  class="profile-image"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default {
  name: 'StudentHome',

  setup() {
      //Rerouting to admin home page in case user is authenticated
      const { isAuthenticated } = useAuth0();
      const router = useRouter();

      onMounted(() => {
        if (isAuthenticated.value){
          router.replace('/adminhome')
        }
      });
      
    },
  };
</script>

<style> /* Not scoped */
body {
  margin: 0;
  padding: 0;
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
  min-height: 202px;
  /*
  background-color: rgba(106, 36, 18, 1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  */
}

.banner-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  width: 70%;
  color: var(--Color-Text, #303972);
  font-family: Poppins, sans-serif;
}

.profile-header-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.profile-title {
  font: 700 32px Poppins, sans-serif;
  margin: 10;     /*T: 10, O: 0*/
  padding-right: 1%; /*T: 1%, O: null*/
}

/* Styling for location and email sections/icons */
.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 31px;
  font: 600 18px Poppins, sans-serif;
}

.location-icon,
.email-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 134px; /*T: 134px, O: null*/
  font: 600 18px Poppins, sans-serif;
}

/* Section styling for About, Education, Office Hours */
.section-title {
  font: 700 24px Poppins, sans-serif;
  margin: 34px 0 30px;
}

.section-content {
  font: 400 18px Poppins, sans-serif;
  text-align: justify;
  margin: 0;
}

.education-item {
  margin: 29px 0;
}

.education-degree {
  font: 600 18px Poppins, sans-serif;
  margin: 0;
}

.education-year {
  color: var(--Color-Gray-3, #a098ae);
  font: 400 18px Poppins, sans-serif;
  margin-left: 40px;
  display: block;
  margin-top: 14px;
}

/* Profile image styling */
.profile-image-container {
  width: 30%;
  margin-left: 20px;
}

.profile-image {
  width: 100%;
  aspect-ratio: 1.03;
  object-fit: fill;
  border-radius: 50%;
}

/* Media queries for responsive design go here */
</style>

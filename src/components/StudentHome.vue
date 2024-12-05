<template>
  <div class="admin-container">
    <div class="layout-wrapper">
      <nav class="sidebar">
        <div class="profile-header">
          <div class="profile-initial">G</div>
          <div>Professor Ghayekhloo</div>
        </div>
        <ul class="nav-list">
          <!-- Student Home -->
          <li class="nav-item active" @click="setPage('studenthome')">
            <img
                loading="lazy"
                src="@/assets/home.png"
                alt="Home navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Home</span>
          </li>
          <!-- Student Teaching -->
          <li class="nav-item" @click="setPage('studentteaching')">
            <img
                loading="lazy"
                src="@/assets/book.png"
                alt="Teaching navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Teaching</span>
          </li>
          <!-- Students Publications -->
          <li class="nav-item" @click="setPage('studentpublications')">
            <img
                loading="lazy"
                src="@/assets/feather.png"
                alt="Publications navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Publications</span>
          </li>
          <!-- Student Research -->
          <li class="nav-item" @click="setPage('studentresearch')">
            <img
                loading="lazy"
                src="@/assets/clipboard.png"
                alt="Research navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Research</span>
          </li>
          <!-- Student Public Work -->
          <li class="nav-item">
            <img
                loading="lazy"
                src="@/assets/spiral.png"
                alt="Public Work navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Public Work</span>
          </li>
          <!-- Student Tools -->
          <li class="nav-item" @click="setPage('studenttools')">
            <img
                loading="lazy"
                src="@/assets/wrench.png"
                alt="Tools navigation icon"
                class="nav-icon"
            />
            <span class="nav-text">Tools</span>
          </li>

        </ul>
      </nav>
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Welcome!</h1>
          <div class="user-profile">
            <div class="user-info">
            </div>
            <div class="user-avatar"></div>
          </div>
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
export default {
  name: 'StudentHome',
  methods: {
    setPage(page) {
      this.$emit('page-changed', page);
    }
  }
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

/* Sidebar styling*/
.sidebar {
  background-color: rgba(106, 36, 18, 1);
  width: 18%;
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

  .profile-details,
  .profile-image-container {
    width: 100%;
    margin-left: 0;
  }

  .profile-image {
    margin-top: 40px;
  }

  .education-year {
    margin-left: 10px;
  }
}
*/
</style>

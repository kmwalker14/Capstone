<template>
  <div class="admin-container">
    <div class="layout-wrapper">
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Publications</h1>
        </header>



        <!-- Submitted Content (Placed Separately Below the White Box) -->
        <section class="submitted-content">

          <div v-for="content in contents" :key="content.id" class="content-box">
            <div v-html="content.content"></div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'StudentPublications',
  data() {
    return {
      contents: [] // Array to store fetched content
    };
  },
  async created() {
    await this.fetchContent();
  },
  methods: {
    async fetchContent() {
      try {
        const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://asu-capstone-backend.onrender.com";
        const response = await axios.get(`${backendUrl}/api/publications`);
        this.contents = response.data; // Store data in Vue component state
      } catch (error) {
        console.error("❌ Error fetching content:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles the main container that holds the entire admin layout */
.admin-container {
  background: var(--Color-Background, #f3f4ff);
  padding: 0 37px 0 0;
  overflow: hidden;
  flex-grow: 1;
  width: 100%;
}

.content-box {
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

}

.submitted-content .content-box {
  font-family: Poppins, sans-serif; /* Apply Poppins as the default font */
}

.submitted-content .content-box * {
  font-family: inherit; /* Inherit font from the parent element (Poppins by default) */
}

.submitted-content {
  margin-top: 0; /* Remove any margin on top of the content */
  padding-top: 0; /* Ensure no extra padding at the top */
}

.about-section {
  background-color: white;
  padding: 20px; /* Padding for the title box */
  max-width: 600px; /* Limit the width of the title box */
  margin: 0 auto; /* Center the box */
  border-radius: 8px; /* Optional: round the corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
  margin-bottom: 5px; /* Reduce space below the white box */
}

.section-title {
  font-size: 24px; /* Font size for the title */
  margin-bottom: 0px; /* Adjust space below the title */
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
  background: none; /* Remove the white background from the whole section */
  padding: 0; /* Remove unnecessary padding */
  margin: 0; /* Remove unnecessary margin */

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
  margin: 1px 0 1px;
}

.section-content {
  font: 400 18px Poppins, sans-serif;
  text-align: justify;
  margin: 0;
}

/* Media queries for responsive design go here */
</style>

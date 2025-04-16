<template>
  <div class="admin-container">
    <div class="layout-wrapper">
      <!-- Sidebar menu would go here -->

      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Welcome!</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-role">Admin</span>
            </div>
          </div>
        </header>

        <section class="content-section">
          <div class="banner">
            <div style="padding: 0px;">
              <button class="edit-button" v-if="!editMode" @click="toggleEdit">Edit</button>
              <div v-else>
                <button class="edit-button" @click="saveChanges">Save</button>
                <button class="edit-button" @click="cancelEdit">Cancel</button>
              </div>
            </div>
          </div>

          <div class="profile-content">
            <div class="profile-details">
              <div class="profile-header-section">
                <div class="profile-title-group">
                  <h2 class="profile-title" v-if="!editMode">{{ formData.name }}</h2>
                  <input v-else v-model="tempData.name" class="profile-title" />

                  <div class="location-info">
                    <img src="@/assets/location.png" alt="Location icon" class="location-icon" />
                    <span class="location-text" v-if="!editMode">{{ formData.location }}</span>
                    <input v-else v-model="tempData.location" />
                  </div>
                </div>

                <div class="contact-info">
                  <img src="@/assets/email.png" alt="Email icon" class="email-icon" />
                  <span class="email-text" v-if="!editMode">{{ formData.email }}</span>
                  <input v-else v-model="tempData.email" />
                </div>
              </div>

              <section class="about-section">
                <h3 class="section-title">About:</h3>
                <p v-if="!editMode" class="section-content" v-html="formattedAbout"></p>
                <textarea v-else v-model="tempData.about" class="section-content" rows="6" />
              </section>

              <section class="education-section">
                <h3 class="section-title">Education:</h3>
                <div class="education-item">
                  <h4 class="education-degree" v-if="!editMode">• {{ formData.education.degree }}</h4>
                  <input v-else v-model="tempData.education.degree" class="education-degree" />

                  <span class="education-year" v-if="!editMode">{{ formData.education.year }}</span>
                  <input v-else v-model="tempData.education.year" class="education-year" />
                </div>
              </section>

              <section class="office-hours-section">
                <h3 class="section-title">On Campus:</h3>
                <p v-if="!editMode" class="section-content" v-html="formattedOffice"></p>
                <textarea v-else v-model="tempData.office" class="section-content" rows="4"></textarea>
              </section>
            </div>

            <div class="profile-image-container">
              <img :src="editMode ? tempData.imageUrl : formData.imageUrl" alt="Professor Ghayekhloo profile" class="profile-image" />
              <div v-if="editMode" style="margin-top: 10px;">
                <input type="file" @change="onImageChange" />
              </div>
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
  name: 'AdminHome',
  data() {
    return {
      editMode: false,
      formData: {
        name: "Professor Ghayekhloo",
        location: "Tempe, Arizona",
        email: "sghayekh@asu.edu",
        about: `Samira Ghayekhloo is an Assistant Teaching Professor at the School of Computing and Augmented Intelligence in Arizona State University-Tempe since Fall 2019. She earned her PhD in Artificial Intelligence and has over ten years of teaching experience in AI courses including Knowledge Representation, Expert Systems, Data Mining, and Machine Learning.\n\nBefore joining ASU, Samira served as an Assistant Professor at Azad University, Iran, in the Department of Computer Engineering for three years. During her tenure, she mentored numerous graduate and undergraduate students and provided advisory guidance for their final projects.`,
        education: {
          degree: "Ph.D. Eastern Mediterranean University",
          year: "2016",
        },
        imageUrl: require('@/assets/samira.png'),
        office: "School of Computing and Augmented Intelligence: BYENG 514\n\nTempe, AZ 85281",
      },
      tempData: {},
    };
  },
  methods: {
    toggleEdit() {
      this.tempData = JSON.parse(JSON.stringify(this.formData));
      this.editMode = true;
    },
    async saveChanges() {
      // Prepare the payload to match the backend structure
      const payload = {
        about: this.tempData.about,
        education: `${this.tempData.education.degree}, ${this.tempData.education.year}`, // Flatten education
        office_hours: this.tempData.office, // Just send office as it is
        name: this.tempData.name,
        email: this.tempData.email,
        imageUrl: this.tempData.imageUrl
      };

      // Send the updated data to the backend
      try {
        const response = await axios.post('https://asu-capstone-backend.onrender.com/api/profile', payload);
        if (response.data.message === "Professor Profile saved successfully") {
          this.formData = JSON.parse(JSON.stringify(this.tempData));
          this.editMode = false;
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile');
      }
    },
    cancelEdit() {
      this.editMode = false;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.tempData.imageUrl = URL.createObjectURL(file);
      }
    },
  },
  computed: {
    formattedAbout() {
      return this.formData.about.replace(/\n/g, '<br />');
    },
    formattedOffice() {
      return this.formData.office.replace(/\n/g, '<br />');
    },
  }
};
</script>

<style scoped> /* Previously not scoped */
body {
  margin: 0;
  padding: 0;
}

textarea.section-content {
  width: 100%;
  min-height: 150px;
  font: 400 18px Poppins, sans-serif;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: vertical;
  box-sizing: border-box;
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

input.profile-title {
  width: 100%;
  height: 50%;
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
  height: 100%;
  width: 100%;
  background-color: rgba(106, 36, 18, 1);
  margin-bottom: 50px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.banner-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* Edit button styling */
.edit-button {
  position: relative;
  z-index: 1;
  bottom: 20px; 
  margin: 92px 0 0 36px;
  padding: 17px 43px;
  border-radius: 40px;
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  font: 400 18px Poppins, sans-serif;
  border: none;
  cursor: pointer;
  box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
}

/* Profile styling */
.profile-content {
  display: flex;
  padding: 0 36px 92px;
  top: -10px;
  position: relative;
  z-index: 1;
}

.profile-details {
  width: 100%; /* or 70% */
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
  margin: 0;
  padding-right: 1%;
}

/* Styling for location and email sections/icons */
.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
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
  margin-top: 95px;
  margin-right: 400px;
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
  margin-left: 20px;
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
  width: 35%;
  height: 100%;
  margin-left: 20px;
}

.profile-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: fill;
  border-radius: 50%;
}

/* Media queries for responsive design go here */
@media (max-width: 1825px) {
  .contact-info {
    margin-top: 5px;
  }
}

@media (max-width: 1280px) { /* 1366px if larger needed */
  .layout-wrapper {
    flex-direction: column; /* Stack sidebar on top if needed */
    gap: 20px;
    padding: 0;
  }

  .header {
    flex-direction: column;
    align-items: center; /* other option: flex-start */
    text-align: center;
  }

  .user-profile {
    flex-direction: column;
    gap: 10px;
  }

  input.profile-title {
    width: 100%;
  }

  .profile-content {
    overflow: auto;
    top: 10px;
  }

  .profile-details {
    width: 70%;
  }

  .profile-image-container {
    width: 60%;
    height: 100%;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    min-width: auto; /* previous - 100px */
  }

  .education-degree {
    margin-left: 20px;
  }

  .education-year {
    margin-left: 40px;
  }

  .section-content {
    text-align: left;
  }

  .contact-info {
    margin-top: 0px;
  }

  .banner {
    height: 120px;
    margin-bottom: 20px;
  }

  .banner-image {
    height: 120px;
  }

  .edit-button {
    padding: 12px 30px;
    font-size: 16px;
    bottom: 30px;
  }
}

@media (max-width: 915px) {
  .profile-image {
    max-width: 200px;
  }
}

@media (max-width: 800px) {
  .profile-image {
    max-width: 180px;
  }
}

@media (max-width: 700px) {
  .profile-image {
    max-width: 150px;
  }
}

@media (max-width: 480px) {
.profile-content {
  padding: 0px 0px 20px 0px;
  top: -5px;
  display: flex;
  flex-direction: column; /* Stacks the items vertically */
  align-items: center; /* Centers items horizontally */
}

.profile-details {
  width: 70%;
  text-align: left;
  margin-top: 10px;
}

.profile-image-container {
  width: 50%;
  height: auto; /* Maintain image aspect ratio */
  order: -1; /* Places the profile image above the profile details */
  align-items: center;
}

.profile-image {
  width: 100%; /* Make the image take full container width */
  height: auto; /* Maintain image aspect ratio */
  align-items: center;
}

.profile-title {
  font-size: 20px;
  margin-bottom: 10px;
  padding-left: 25px;
  text-align: center;
}

input.profile-title {
  width: 100%;
  padding: 0px;
}

.location-info,
.contact-info {
  font-size: 15px;
  align-items: center;
}

.location-icon,
.email-icon {
  width: 30px;
  height: 30px;
}

.section-title {
  font-size: 18px;
}

.section-content {
  font: 400 18px Poppins, sans-serif;
  text-align: left;
  margin: 0;
}

.education-degree {
  font-size: 16px;
  margin-left: 20px;
}

input.education-degree {
  width: 85%;
}

.education-year {
  font-size: 16px;
  margin-left: 40px;
  margin-top: 14px;
}

input.education-year {
  width: 50%;
}

.banner {
  height: 65px;
  margin-bottom: 20px;
}

.banner-image {
  height: 65px;
}

.edit-button {
  padding: 8px 20px;
  font-size: 12px;
  bottom: 70px;
  right: 20px;
}

.page-title {
  font-size: 24px;
}
}
</style>
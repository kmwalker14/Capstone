<template>
  <div class="student-container">
    <div class="layout-wrapper">
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Welcome!</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-role">Public</span>
            </div>
          </div>
        </header>

        <section class="content-section">
          <div class="banner">
            <img
              loading="lazy"
              class="banner-image"
            />
            <button class="null-button"></button>
          </div>

          <div class="profile-content" v-if="profileLoaded">
            <div class="profile-details">
              <div class="profile-header-section">
                <div class="profile-title-group">
                  <h2 class="profile-title">{{ profile.name }}</h2>
                  <div class="location-info">
                    <img
                      loading="lazy"
                      src="@/assets/location.png"
                      alt="Location icon"
                      class="location-icon"
                    />
                    <span class="location-text">{{ profile.location }}</span>
                  </div>
                </div>
                <div class="contact-info">
                  <img
                    loading="lazy"
                    src="@/assets/email.png"
                    alt="Email icon"
                    class="email-icon"
                  />
                  <span class="email-text">{{ profile.email }}</span>
                </div>
              </div>

              <section class="about-section">
                <h3 class="section-title">About:</h3>
                <p class="section-content" v-html="formattedAbout"></p>
              </section>

              <section class="education-section">
                <h3 class="section-title">Education:</h3>
                <div class="education-item">
                  <h4 class="education-degree">
                    • {{ profile.education }}
                  </h4>
                  <span class="education-year">{{ profile.educationYear }}</span>
                </div>
              </section>

              <section class="office-hours-section">
                <h3 class="section-title">On Campus:</h3>
                <p class="section-content" v-html="formattedOffice"></p>
              </section>
            </div>

            <div class="profile-image-container">
              <img
                loading="lazy"
                :src="profile.imageUrl"
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
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default {
  name: 'StudentHome',
  data() {
    return {
      profile: {
        name: '',
        location: 'Tempe, Arizona', // default location if not in DB
        email: '',
        about: '',
        education: '',
        educationYear: '',
        office: '',
        imageUrl: ''
      },
      profileLoaded: false,
    };
  },
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
  computed: {
    formattedAbout() {
      return this.profile.about.replace(/\n/g, '<br />');
    },
    formattedOffice() {
      return this.profile.office.replace(/\n/g, '<br />');
    }
  },
  async mounted() {
    try {
      const response = await axios.get('https://asu-capstone-backend.onrender.com/api/profile');
      const data = response.data[0];

      const [degree, year] = data.education.split(',').map(item => item.trim());

      this.profile = {
        name: data.name,
        location: 'Tempe, Arizona',
        email: data.email,
        about: data.about,
        education: degree,
        educationYear: year,
        office: data.office_hours,
        imageUrl: data.imageUrl
      };

      this.profileLoaded = true;
    } catch (err) {
      console.error('Failed to fetch profile data:', err);
    }
  }
};
</script>



<style scoped> /* Previously not scoped */
  body {
    margin: 0;
    padding: 0;
  }

  /* Styles the main container that holds the entire student layout */
  .student-container {
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

  .null-button {
    margin: 92px 0 0 36px;
    padding: 17px 43px;
    background: transparent;
    border: none;
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
    width: 100%; /* 70% ??? */
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
    margin: 0;     /*T: 10, O: 0*/
    padding-right: 1%; /*T: 1%, O: null*/
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
    margin-top: 95px; /*T: 100px, O: null*/
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
  @media (max-width: 1280px) { /* 1366px ? */
    .layout-wrapper {
      flex-direction: column; /* Stack sidebar on top if needed */
      gap: 20px;
      padding: 0;
    }

    .header {
      flex-direction: column;
      align-items: center; /* flex-start */
      text-align: center;
    }

    .user-profile {
      flex-direction: column;
      gap: 10px;
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

    .education-year {
      font-size: 16px;
      margin-left: 40px;
      margin-top: 14px;
    }

    .banner {
      height: 65px;
      margin-bottom: 20px;
    }

    .banner-image {
      height: 65px;
    }

    .page-title {
      font-size: 24px;
    }
  }
</style>
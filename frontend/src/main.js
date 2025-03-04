import {createApp} from 'vue';
import { createAuth0 } from "@auth0/auth0-vue";
import App from './App.vue';
import router from './router.js';

const app = createApp(App);

// console.log("Auth0 Domain:", process.env.VUE_APP_AUTH0_DOMAIN);

app
    .use(router)
    // Import Auth0 with the use of .env file for credentials on website
    .use(
        createAuth0({
            domain: process.env.VUE_APP_AUTH0_DOMAIN,
            clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
            },
        })
    )
    
    .mount('#app');


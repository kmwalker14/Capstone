import {createApp} from 'vue';
import App from './App.vue';
import router from './router.js';


const app = createApp(App);

app.use(router);
// Import Auth0 with the use of .env file for credentials on website
app.use(
    createAuth0({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
        },
    })
)
app.mount('#app');

import {createApp} from 'vue';
import App from './App.vue';
import { createAuth0 } from '@auth0/auth0-vue';
import router from './router.js';

const app = createApp(App);

app.use(
    router,
    createAuth0({
        domain: "dev-rxh5tubzppopn3pc.us.auth0.com",
        clientId: "4674egpqeRX6ANWDoG9K7IUbSuzFEaOi",
        authorizationParams: {
          redirect_uri: window.location.origin,
        }
      })
);
app.mount('#app');

//createApp(App).mount('#app')
//createApp(App).use(router).mount('#app');

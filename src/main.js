import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax3'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'vuesax3/dist/vuesax.css' //Vuesax styles

createApp(App).use(Vuesax).use(router).mount('#app')
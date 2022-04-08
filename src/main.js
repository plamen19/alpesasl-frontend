import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax3'
import ElementPlus from 'element-plus'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'element-plus/dist/index.css' // CSS de ElementPlus

import 'vuesax3/dist/vuesax.css' //Vuesax styles

createApp(App).use(Vuesax).use(ElementPlus).use(router).mount('#app')
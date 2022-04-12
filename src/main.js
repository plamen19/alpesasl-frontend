import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax3'
import ElementPlus from 'element-plus'
import VueSidebarMenu from 'vue-sidebar-menu'
import PrimeVue from 'primevue/config';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'element-plus/dist/index.css' // CSS de ElementPlus

import 'vuesax3/dist/vuesax.css' //Vuesax styles
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

createApp(App).use(PrimeVue).use(VueSidebarMenu).use(Vuesax).use(ElementPlus).use(router).mount('#app')
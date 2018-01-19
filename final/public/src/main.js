import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import routes from './routes';
import { store } from './store/store';

Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

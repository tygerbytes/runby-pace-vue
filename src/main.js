import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
// Load Bootswatch theme (https://bootswatch.com/)
import '@/assets/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import RunbyLib from './runbylib';

import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    RunbyLib,
  },
  mutations: {
  },
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
// Using bootswatch
import '@/assets/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';

import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

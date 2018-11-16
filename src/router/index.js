import Vue from 'vue';
import Router from 'vue-router';

import RunbyPace from '@/components/RunbyPace.vue';
import TargetPace from '@/components/TargetPace.vue';
import About from '@/components/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'Home',
    component: RunbyPace,
    props: {
      fiveKmRaceTimeDefault: '',
      runTypeDefault: 'LongRun',
    },
  }, {
    path: '/targetPace/:fiveKmRaceTime&:runTypeCode',
    name: 'targetPace',
    component: TargetPace,
    props: true,
  }, {
    path: '/about',
    name: 'About',
    component: About,
  }],
});

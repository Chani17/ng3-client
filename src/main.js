import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store/store';
import axios from 'axios';


Vue.config.productionTip = false;

// Axios가 쿠키를 포함한 자격 증명을 요청에 자동으로 포함하도록 만드는 설정
axios.defaults.withCredentials = true;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
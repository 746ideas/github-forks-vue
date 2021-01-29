import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { extend } from 'vee-validate';

extend('repo', value => {
  if(!/[?=a-zA-Z0-9]\/[?=a-zA-Z0-9]/.test(value)){
    return 'Репозиторий должен быть вида ownerName/repoName'
  }else {
    return true
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

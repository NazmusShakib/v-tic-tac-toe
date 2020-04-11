import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Pusher from 'pusher-js';
Vue.use(require('vue-pusher'), {
    api_key: '0c9a84e4b8eec1fa3344',
    options: {
        cluster: 'ap2',
        encrypted: true,
    }
});


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

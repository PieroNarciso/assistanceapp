import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

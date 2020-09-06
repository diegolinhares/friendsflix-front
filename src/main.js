import Vue from 'vue'
import App from './App.vue'
//import { createProvider } from './vue-apollo'
import { apolloProvider } from './apollo'
import router from './router'

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')

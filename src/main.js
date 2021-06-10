import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createProvider } from './vue-apollo'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  apolloProvider: createProvider(),
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

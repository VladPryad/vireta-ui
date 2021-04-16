import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

const prov = createProvider();
console.log(prov)

new Vue({
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

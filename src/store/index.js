import Vue from 'vue'
import Vuex from 'vuex'
import plot from '@/store/modules/plot'
import subscription from '@/store/modules/subscription'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    plot,
    subscription
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import plot from '@/store/modules/plot'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    plot
  }
})

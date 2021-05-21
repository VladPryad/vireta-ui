<template>
  <div>
    <div v-for="record in this.GET_RECORDS" v-bind:key="record">
      {{ record }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { GET_RECORDS } from '@/constants/getters/plot'
import { FETCH_PLOT_RECORDS_WS } from '@/constants/actions/plot'

export default {
  mounted () {
    this[FETCH_PLOT_RECORDS_WS]( { apollo: this.$apollo,  id: "APOLLO" } );
  },
  computed: {
    ...mapGetters([GET_RECORDS])
  },
  methods: {
    ...mapActions([FETCH_PLOT_RECORDS_WS])
  }
}
</script>

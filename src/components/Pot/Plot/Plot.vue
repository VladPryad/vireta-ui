<template>
<div>
    <canvas ref="canvas"></canvas>
    <slot></slot>
    <!-- <div> {{ this.GET_LAST_RECORD }} </div> -->
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { FETCH_PLOT_RECORDS_WS } from '@/constants/actions/plot';

export default {

  data() {
    return {
      provider: {
        context: null,
        canvas: null,
        style: {
          width: null,
          height: null
        }
      }
    }
  },
  provide() {
    return {
      provider: this.provider
    }
  },
  mounted() {
    this.provider.canvas = this.$refs['canvas'];
    this.provider.context = this.$refs['canvas'].getContext('2d');
    this.provider.style = {
      width: 1000,
      height: 400
    }

    this[FETCH_PLOT_RECORDS_WS]({
      apollo: this.$apollo,
      id: this.id
    })

    },
  props: {
    id: String
  },
  computed: {
      ...mapGetters([GET_RECORDS, GET_LAST_RECORD])
  },
  methods: {
      ...mapActions([FETCH_PLOT_RECORDS_WS])
  }
}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid black;
  width: 1000px;
  height: 400px;
}
</style>

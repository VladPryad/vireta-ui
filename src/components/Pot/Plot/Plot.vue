<template>
<div>
    <canvas id="canvas-plot" @mousemove="draw"></canvas>
    <!-- <div> {{ this.GET_LAST_RECORD }} </div> -->
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { FETCH_PLOT_RECORDS_WS } from '@/constants/actions/plot';
import plot from '@/plot/plot';

export default {

  data() {
    return {
      canvas: null,
      x: 0,
      y: 0
    }
  },
  mounted() {
    var c = document.getElementById("canvas-plot");
    this.canvas = c.getContext('2d');
    //plot(document);

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
      ...mapActions([FETCH_PLOT_RECORDS_WS]),
      drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw(e) {
      this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid black;
}
</style>

<template>
<div>
    <canvas id="canvas-plot"></canvas>
    <button @click="DRAW_RECTANGLE">Add Rect</button>
    <button @click="subWidth">-</button>
    <button @click="addWidth">+</button>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GET_CANVAS_CONTEXT } from '@/constants/getters/plot'
import { DEFINE_CANVAS_CONTEXT, SET_CANVAS_CONTEXT, DRAW_RECTANGLE } from '@/constants/mutations/plot'

export default {
mounted() {
    this[DEFINE_CANVAS_CONTEXT]({
        document,
        id: 'canvas-plot'
    });
},
data() {
    return { rectWidth: 200 }
},
computed: {
    ...mapGetters([GET_CANVAS_CONTEXT])
},
methods: {
    ...mapMutations([DEFINE_CANVAS_CONTEXT, DRAW_RECTANGLE]),
    addWidth() {
      this.rectWidth += 10
      this[DRAW_RECTANGLE]({rectWidth: this.rectWidth});
    },
    subWidth() {
      this.rectWidth -= 10
      this[DRAW_RECTANGLE]({rectWidth: this.rectWidth});     
    }
  }
}
</script>

<style scoped>

</style>

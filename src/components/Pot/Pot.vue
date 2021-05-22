<template>
    <div>
        Pot Component
        <Plot v-bind:id="this.potId" >
          <plot></plot>
        </Plot>
    </div>
</template>

<script>
import Plot from '@/components/Pot/Plot/Plot.vue'
import plot from '@/plot/plot_slot.vue';

export default {
  name: 'Pot',
  components: {
    Plot,
    plot
  },
  data() {
    return {
      potId: "APOLLO_NEW"
    }
  }
}
</script>
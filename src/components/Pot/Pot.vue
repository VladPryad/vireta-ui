<template>
    <div>
        Pot Component
        <Plot v-bind:id="this.potId" />
    </div>
</template>

<script>
import Plot from '@/components/Pot/Plot/Plot.vue'

export default {
  name: 'Pot',
  components: {
    Plot
  },
  data() {
    return {
      potId: "APOLLO_NEW"
    }
  }
}
</script>
<template>
<div>
    <canvas ref="canvas"></canvas>
    <slot></slot>
</div>
</template>

<script>

export default {

  data() {
    return {
      provider: {
            records: [],
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
    this.provider.records = this.records;
    this.provider.canvas = this.$refs['canvas'];
    this.provider.context = this.$refs['canvas'].getContext('2d');
    this.provider.style = {
      width: 1200,
      height: 100
    }
    },
  props: ['records']
}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid black;
  width: 1200px;
  height: 100px;
}
</style>

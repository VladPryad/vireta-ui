<template>
    <div id="root">
        <header class="main-head">Pot {{ this.potId }}</header>
        <nav class="main-nav">
            <ul>
                <li><a href="">Devices</a></li>
                <li><a href="">Description</a></li>
                <li><a href="">Schema</a></li>
            </ul>
        </nav>
        <div class="content">
          <Plot v-bind:id="this.potId" >
          <plot></plot>
        </Plot>
        </div>

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
  created() {
    this.potId = this.$route.params.id;
  },
  data() {
    return {
      potId: "APOLLO_NEW"
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  display: grid;
  grid-gap: 20px;
  
  grid-template-areas:
    "header"
    "nav"
    "content";

  
  grid-template-columns: 1fr 4fr;
    grid-template-areas:
      "header header"
      "nav    content"
      "nav    content"
      "footer footer"
}
.main-head {
  grid-area: header;
  font: 25px system-ui;
  background-color: rgb(191, 191, 255);
}
.content {
  grid-area: content;
}
.main-nav {
  grid-area: nav;
}
.side {
  grid-area: sidebar;
}
.ad {
  grid-area: ad;
}
.main-footer {
  grid-area: footer;
}
ul li {
  margin-top: 20px;
  margin-bottom: 50px;
  border-bottom: 1px solid black;
  font: 20px system-ui;
  text-align: center;
}
</style>
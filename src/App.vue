<template>
  <div id="app">
    <UserByIdQuery
    v-bind:id="id"
    />
  </div>
</template>

<script>
import UserByIdQuery from '@/components/UserByIdQuery.vue'

export default {
  name: 'App',
  data() {
    return {
      id: '2'
    }
  },
  components: {
    UserByIdQuery
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

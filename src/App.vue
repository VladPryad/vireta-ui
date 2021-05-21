<template>
  <div id="app">
    <UserByIdQuery
    v-bind:id="id"
    />
    <SubscriptionTry />
    <MainPage />
  </div>
</template>

<script>
import UserByIdQuery from '@/components/UserByIdQuery.vue'
import SubscriptionTry from '@/components/SubscriptionTry.vue'
import MainPage from '@/components/MainPage/MainPage.vue'

export default {
  name: 'App',
  data() {
    return {
      id: '2'
    }
  },
  components: {
    UserByIdQuery,
    SubscriptionTry,
    MainPage
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

<template>
    <div>
        <SideMenu />
        <PotsList />
    </div>
</template>

<script>
import PotsList from '@/components/MainPage/PotsList/PotsList.vue'
import SideMenu from '@/components/MainPage/SideMenu.vue'

export default {
    name: "MainPage",
    components: {
    PotsList,
    SideMenu
  }
}
</script>

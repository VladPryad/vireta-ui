<template>
    <div>
    <PotItem class="items" v-for="id in userPots" :key="id" :id="id" />
    </div>
</template>

<script>
import PotItem from '@/components/MainPage/PotsList/PotItem.vue'

export default {
    name: "PotsList",
    components: {
        PotItem
    },
    computed: {
        userPots() {
            return ["1","2","3","4"];
        }
    },
    props: ['userId']
}
</script>

<style lang="scss" scoped>
.items {
    position: relative;
    top: 0%;
    margin-top: 50px;
    margin-left: 50px;
    transform: translateY(-100vh);
}
</style>

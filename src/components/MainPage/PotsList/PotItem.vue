<template>
<div id="root">
    <div id="name" @click="clickName"> Pot {{this.id}}  </div>
    <PlotMini class="plot" v-bind:records="records" :key="records.potId">
          <plotMini></plotMini>
    </PlotMini>
</div> 
</template>

<script>
import PlotMini from '@/components/MainPage/PotsList/plot_mini/PlotMini.vue'
import plotMini from '@/components/MainPage/PotsList/plot_mini/plot_mini_slot.vue';
import gql from 'graphql-tag'

export default {
    data() {
        return {
            records: []
        }
    },
    mounted() {
        this.getRecords(this.id)
        .then(val => {
            this.records = val;
        })
    },
    props: ["id"],
    components: {
        PlotMini,
        plotMini
    },
    methods: {
        async getRecords(id) {
            const getRecordsQuery = gql`
                                    query potRecordsById($id: String) {
                    recordsByPot(id: $id) {
                        potId
                        total
                        potName
                        measurements{
                        ph {
                            min
                            max
                            values {
                            timestamp
                            value
                            }
                        }
                        humidity {
                            min
                            max
                            values {
                            timestamp
                            value
                            }
                        }
                        temperature {
                            min
                            max
                            values {
                            timestamp
                            value
                            }
                        }
                        }
                    }
                    }
                `;
            
            let res = await this.$apollo.query({
                query: getRecordsQuery,
                variables: {
                    id: id
                }
            })
            if(!res.data.recordsByPot) {
                alert("Server error")
                return
            }
            return res.data.recordsByPot;
        },
        clickName() {
            this.$router.push({
                    name: "pot",
                    params: {
                        id: this.id
                    }
                })
        }
    },
    computed: {

    }
}
</script>

<style scoped>
#root {
    display: flex;
    align-items: center;
}
#name {
    padding-left: 70px;
}
.plot {
    padding-left: 70px;
}
</style>
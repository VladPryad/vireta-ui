import { GET_RECORDS } from '@/constants/getters/plot'
import { ADD_RECORD } from '@/constants/mutations/plot'
import { FETCH_PLOT_RECORDS_WS } from '@/constants/actions/plot'

const state = () => ({
    records: []
})

const getters = {
    [GET_RECORDS](state) {
        return state.records;
    }
}

const mutations = {
   [ADD_RECORD](state, record) {
     state.records.push(record);
     console.log(state.records);
   }
}

const actions = {
    [FETCH_PLOT_RECORDS_WS](ctx, {apollo, id}) {
        const subQuery = require('@/graphql/potRecordsIRT.gql');

        const observer = apollo.subscribe({
          query: subQuery,
          variables: {
            id,
          },
        })
    
        observer.subscribe({
          next (data) {
            console.log(data.data.getPotRecordsIRT)
            ctx.commit(ADD_RECORD, data.data.getPotRecordsIRT);
          },
          error (error) {
            console.error(error)
          },
        })
    }
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
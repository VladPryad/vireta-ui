import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { ADD_RECORD } from '@/constants/mutations/plot'
import { FETCH_PLOT_RECORDS_WS } from '@/constants/actions/plot'

const state = () => ({
    records: [],
    lastRecord: {}
})

const getters = {
    [GET_RECORDS](state) {
      return state.records;
    },

    [GET_LAST_RECORD](state) {
      return state.lastRecord;
    }
}

const mutations = {
   [ADD_RECORD](state, record) {
     state.records.push(record);
     state.lastRecord = record;
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
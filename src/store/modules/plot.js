import Mutations from '@/plot/mutations';
import Getters from '@/plot/getters';

const state = () => ({
    context: { },
    canvas: { }
})

const getters = {
    ...Getters
}

const mutations = {
    ...Mutations
}

const actions = {
}

export default {
    state,
    mutations,
    actions,
    getters
}
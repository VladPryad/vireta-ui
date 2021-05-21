import { GET_CANVAS_CONTEXT } from '@/constants/getters/plot'
import {
    SET_CANVAS_CONTEXT,
    DEFINE_CANVAS_CONTEXT,
    DRAW_RECTANGLE 
} from '@/constants/mutations/plot'

const state = () => ({
    context: { }
})

const getters = {
    [GET_CANVAS_CONTEXT](state) {
        return state.context;
    }
}

const mutations = {
    [SET_CANVAS_CONTEXT](state, payload) {
        state.context = payload.canvas_context;
    },

    [DEFINE_CANVAS_CONTEXT](state, payload) {
        var c = payload.document.getElementById(payload.id);
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.stroke();

        state.context = ctx;
    },

    [DRAW_RECTANGLE](state, payload) {

      state.context.clearRect(0, 0, 400, 200);
      
      // draw rect
      state.context.beginPath();
      state.context.rect(20, 20, payload.rectWidth, 100);
      state.context.stroke(); 
      
      state.context.endPath();
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions,
    getters
}
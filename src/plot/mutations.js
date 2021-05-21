import {
    DEFINE_CANVAS_CONTEXT
} from '@/constants/mutations/plot'

export default {
    [DEFINE_CANVAS_CONTEXT](state, payload) {
        var c = payload.document.getElementById(payload.elementId);
        var ctx = c.getContext("2d");
        state.context = ctx;
    }
}

<script>
import Convert from '@/plot/utils/convert';
import Ratio from '@/plot/utils/ratio';
import chart_styles from '@/plot/styles/chart.js';
import { line_miniature } from '@/plot/figures'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'

export default {
    inject: ['provider'],
    mounted() {
        
    },
    methods: {
        getDPI() {
            let PIXEL_RATIO = (function (ctx) {
                let dpr = window.devicePixelRatio || 1
                let bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

                return dpr / bsr;
            })(this.provider.context);

            return PIXEL_RATIO;
        }
    },
    computed: {
      ...mapGetters([GET_RECORDS, GET_LAST_RECORD]),
      dpiHeight() {
          return this.getDPI() * this.provider.style.height;
      },
      dpiWidth() {
          return this.getDPI() * this.provider.style.width;
      }
    },
    render() {
        if(!this.provider.records.potId || !this.provider.context) return;
        const canvas = this.provider.canvas;

        let lastRecord = this[GET_LAST_RECORD];
        if(!lastRecord.__ob__.value.potId) return;

        if(this.provider.records.total == 0) return;

        let ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5);

        console.log("RAW", this.provider.records);
        let measurements = Convert.toSpreadedSequentialCoordinates([this.provider.records]); //
        let boundaries = Ratio.computeBoundaries(measurements);
        console.log("MEASURE", measurements)
        console.log("Boundary", boundaries)

        for(let param in measurements) {
        let ratio = {
            xRatio: Ratio.computeRatio(Number(this.dpiWidth), Number(boundaries[param].maxX) ),
            yRatio: Ratio.computeRatio(Number(this.dpiHeight), Number(boundaries[param].maxY) )  // ,boundaries[param].maxY to get equal scale
        }
        console.log(ratio)
        line_miniature(ctx, measurements[param], ratio, chart_styles[param], this.dpiHeight, this.dpiWidth);
    }
    }
}
</script>
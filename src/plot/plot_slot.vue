<script>
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { printDate } from '@/plot/utils/date'
import axis from '@/plot/axis'
import {constant, setDPI } from '@/plot/constants'
import plot from '@/plot/plot'
import feed from "@/plot/chronology"
import Convert from '@/plot/utils/convert';
import Ratio from '@/plot/utils/ratio';
import grid from "@/plot/grid"


export default  {
    inject: ['provider'],
    mounted() {
    },
    computed: {
      ...mapGetters([GET_RECORDS, GET_LAST_RECORD])
    },
    methods: {
        configCanvas() {
            setDPI(this.getDPI(), this.provider.style);

            this.provider.canvas.style.width = constant.WIDTH;
            this.provider.canvas.style.height = constant.HEIGHT;
            this.provider.canvas.width = constant.DPI_WIDTH;
            this.provider.canvas.height = constant.DPI_HEIGHT;
        },
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
    render() {
        const RENDER_COUNT = 5;

        if(!this.provider.context) return;
        const canvas = this.provider.canvas;
        this.configCanvas()
        let ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5);

        axis(ctx);
        
        let lastRecord = this[GET_LAST_RECORD];
        if(!lastRecord.__ob__.value.potId) return;

        let allRecords = this[GET_RECORDS];

        let measurements = Convert.toSpreadedSequentialCoordinates(allRecords);
        let boundaries = Ratio.computeBoundaries(measurements);
        let axisBoundaries = Ratio.getAxisBoundaries(allRecords);

        let records_sliced = allRecords.slice(allRecords.length - RENDER_COUNT);
        let measurements_sliced = Convert.toSpreadedSequentialCoordinates(records_sliced);
        let axisBoundaries_sliced = Ratio.getAxisBoundaries(records_sliced);
        let boundaries_sliced = Ratio.computeBoundaries(measurements_sliced);

        grid(ctx, records_sliced);
        
        plot(ctx, measurements_sliced, axisBoundaries_sliced, boundaries_sliced);

        printDate(ctx, lastRecord);
        
        feed(ctx, measurements, boundaries)
    }
}
  
</script>
<script>
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Convert from '@/utils/convert';
import { toDate, printDate } from '@/utils/date'
import axis from '@/plot/axis'
import {constant, setDPI } from '@/plot/constants'
import plot from '@/plot/plot'


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
        if(!this.provider.context) return;
        const canvas = this.provider.canvas;
        this.configCanvas()
        let ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5);

        axis(ctx);
        
        let record = this[GET_LAST_RECORD];
        if(!record.__ob__.value.potId) return;

        let measurements = Convert.toSpreadedSequentialCoordinates(this[GET_RECORDS]);
        
        plot(ctx, measurements);

        printDate(ctx, record);

                
    }
}
  
</script>
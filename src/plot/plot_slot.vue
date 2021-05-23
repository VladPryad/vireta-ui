<script>
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Convert from '@/utils/convert';
import Ratio from '@/utils/ratio';

const WIDTH = 600;
const HEIGHT = 200;
const PADDING = 40;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const VIEW_WIDTH = DPI_WIDTH;

export default  {
    inject: ['provider'],
    mounted() {
    },
    computed: {
      ...mapGetters([GET_RECORDS, GET_LAST_RECORD])
    },
    methods: {
        configCanvas() {
            this.provider.canvas.style.width = WIDTH;
            this.provider.canvas.style.height = HEIGHT;
            this.provider.canvas.width = DPI_WIDTH;
            this.provider.canvas.height = DPI_HEIGHT;
        }
    },
    render() {
        if(!this.provider.context) return;
        const ctx = this.provider.context;

        this.configCanvas();

        let records = this[GET_LAST_RECORD];
        if(!records.__ob__.value.potId) return;

        let allRecords = this[GET_RECORDS];

        let measurement = Convert.spreadCoordinates(Convert.toSequentialCoordinates(allRecords));
        let boundaries = Ratio.computeBoundaries(measurement);

        line(ctx, measurement.ph, "#ff0000", Ratio.computeRatio(VIEW_HEIGHT, boundaries.ph.maxY ),Ratio.computeRatio(VIEW_WIDTH, boundaries.ph.maxX ), [], 1, 1);

        line(ctx, measurement.h, "#00bbff", Ratio.computeRatio(VIEW_HEIGHT, boundaries.h.maxY ),Ratio.computeRatio(VIEW_WIDTH, boundaries.ph.maxX ), [], 1, 1); // [1, 1], 0.8, 4

        line(ctx, measurement.m, "#ffc400", Ratio.computeRatio(VIEW_HEIGHT, boundaries.m.maxY ),Ratio.computeRatio(VIEW_WIDTH, boundaries.ph.maxX ), [], 1, 1); //[15, 3, 3, 3], 0.9, 1.5
        
        

        function line(ctx, coords, color, ratioY, ratioX, segment, alfa, size) {
            ctx.globalAlpha = alfa;
            ctx.beginPath();
            ctx.setLineDash(segment);
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            for(let el of coords) {
                ctx.lineTo(el.x* ratioX, DPI_HEIGHT - PADDING - el.y* ratioY);
            }
            ctx.stroke()
            ctx.closePath();
        }

    }
}
  
</script>
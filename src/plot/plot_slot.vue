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

export default  {
    inject: ['provider'],
    mounted() {
    },
    computed: {
      ...mapGetters([GET_RECORDS, GET_LAST_RECORD])
    },
    render() {
        if(!this.provider.context) return;
        const ctx = this.provider.context;

        this.provider.canvas.style.width = WIDTH;
        this.provider.canvas.style.height = HEIGHT;
        this.provider.canvas.width = DPI_WIDTH;
        this.provider.canvas.height = DPI_HEIGHT;

        let records = this[GET_LAST_RECORD];
        if(!records.__ob__.value.potId) return;
        let coords = Convert.toCoordinates(records);

        let boundaries = Ratio.computeBoundaries(coords);
        let phYRatio = VIEW_HEIGHT / ( boundaries.ph.max );
        ctx.beginPath();
        let i = 0;
        for(let ph of coords.ph) {
            ctx.lineTo(i, DPI_HEIGHT - PADDING - ph.y*phYRatio);
            i+=100;
        }
        ctx.stroke()
        ctx.closePath();
    }
}
  
</script>
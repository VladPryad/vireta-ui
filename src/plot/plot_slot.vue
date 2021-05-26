<script>
import { GET_RECORDS, GET_LAST_RECORD } from '@/constants/getters/plot'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Convert from '@/utils/convert';
import { toDate, printDate } from '@/utils/date'
import axis from '@/plot/axis'
import constant from '@/plot/constants'
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
            this.provider.canvas.style.width = constant.WIDTH;
            this.provider.canvas.style.height = constant.HEIGHT;
            this.provider.canvas.width = constant.DPI_WIDTH;
            this.provider.canvas.height = constant.DPI_HEIGHT;
        }
    },
    render() {
        if(!this.provider.context) return;
        const ctx = this.provider.context;
        const canvas = this.provider.canvas;

        this.configCanvas();

        axis(ctx);
        

        let record = this[GET_LAST_RECORD];
        if(!record.__ob__.value.potId) return;

        let measurements = Convert.toSpreadedSequentialCoordinates(this[GET_RECORDS]);
        
        plot(ctx, measurements);

        printDate(ctx, record);

    }
}
  
</script>
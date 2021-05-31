import Ratio from '@/plot/utils/ratio';
import chart_styles from '@/plot/styles/chart.js';
import { line } from '@/plot/figures'
import gap from '@/plot/gap';
import {constant} from '@/plot/constants'

export default function(ctx, measurements, axisBoundaries, boundaries) {

    for(let param in measurements) {
        let ratio = {
            xRatio: Ratio.computeRatio(constant.VIEW_WIDTH, boundaries[param].maxX ),
            yRatio: Ratio.computeRatio(constant.VIEW_HEIGHT, axisBoundaries[param].max)  // ,boundaries[param].maxY to get equal scale
        }
        gap(ctx, measurements, param, ratio)
        line(ctx, measurements[param], ratio, chart_styles[param]);
    }

}
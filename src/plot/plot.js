import Ratio from '@/plot/utils/ratio';
import chart_styles from '@/plot/styles/chart.js';
import { line } from '@/plot/figures'
import gap from '@/plot/gap';
import {constant} from '@/plot/constants'

export default function(ctx, measurement) {
    let boundaries = Ratio.computeBoundaries(measurement);

    for(let param in measurement) {
        let ratio = {
            xRatio: Ratio.computeRatio(constant.VIEW_WIDTH, boundaries[param].maxX ),
            yRatio: Ratio.computeRatio(constant.VIEW_HEIGHT, Ratio.maxBoundary(boundaries))  // ,boundaries[param].maxY to get equal scale
        }
        gap(ctx, measurement, param, ratio)
        line(ctx, measurement[param], ratio, chart_styles[param]);
    }

}
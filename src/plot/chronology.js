import Ratio from '@/plot/utils/ratio';
import { line_feed } from '@/plot/figures'
import {constant} from '@/plot/constants'
import feed_styles from '@/plot/styles/feed.js';

export default function(ctx, measurements, boundaries) {
    for(let param in measurements) {
        let ratio = {
            xRatio: Ratio.computeRatio(constant.FEED_WIDTH, boundaries[param].maxX ),
            yRatio: Ratio.computeRatio(constant.FEED_HEIGHT, boundaries[param].maxY)
        }
        line_feed(ctx, measurements[param], ratio, feed_styles[param]);
    }
}
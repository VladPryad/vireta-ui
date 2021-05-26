import { line_plain } from '@/plot/figures'
import constant from '@/plot/constants'
import styles from '@/plot/styles/gapStyle.js';

export default (ctx, measurement, param, ratio) => {
    const step = constant.PADDING_X/3
    const padding = constant.PADDING_FROM_Y_AXIS;
    const axisX = {
        ph: step*3 - padding,
        h: step - padding,
        m: step*2 - padding
    }

    let firstRecordValue = measurement[param][0].y;
    let lastRecordValue = measurement[param][measurement[param].length - 1].y;

    let startY = constant.DPI_HEIGHT - constant.PADDING_Y - firstRecordValue * ratio.yRatio;
    let endY = constant.DPI_HEIGHT - constant.PADDING_Y - lastRecordValue * ratio.yRatio;

    let firstStart =  [axisX[param], startY];
    let firstEnd = [step*3, startY]
    let lastStart = [constant.DPI_WIDTH - constant.RIGHT_PADDING_X, endY];
    let lastEnd = [constant.DPI_WIDTH - constant.RIGHT_PADDING_X + 50, endY]

    line_plain(ctx, lastStart, lastEnd, styles[param])
    line_plain(ctx, firstStart, firstEnd , styles[param])

}
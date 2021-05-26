import { line_plain } from '@/plot/figures'
import {constant} from '@/plot/constants'
import styles from '@/plot/styles/gapStyle.js';

export default (ctx, measurement, param, ratio) => {
    const step = (constant.PADDING_X_LEFT - constant.PADDING_X_LEFT_AXIS - constant.PADDING_X_Y_AXIS) /2;
    const axisX = {
        ph: constant.PADDING_X_LEFT  - constant.PADDING_X_Y_AXIS,
        h: constant.PADDING_X_LEFT_AXIS,
        m: constant.PADDING_X_LEFT_AXIS + step
    }

    let firstRecordValue = measurement[param][0].y;
    let lastRecordValue = measurement[param][measurement[param].length - 1].y;

    let startY = constant.DPI_HEIGHT - constant.PADDING_Y - firstRecordValue * ratio.yRatio;
    let endY = constant.DPI_HEIGHT - constant.PADDING_Y - lastRecordValue * ratio.yRatio;

    let firstStart =  [axisX[param], startY];
    let firstEnd = [constant.PADDING_X_LEFT, startY]
    let lastStart = [constant.DPI_WIDTH - constant.PADDING_X_RIGHT, endY];
    let lastEnd = [constant.DPI_WIDTH - constant.PADDING_X_RIGHT + constant.PADDING_X_CURRENT, endY]

    line_plain(ctx, lastStart, lastEnd, styles[param])
    line_plain(ctx, firstStart, firstEnd , styles[param])

}
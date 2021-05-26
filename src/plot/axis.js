import { line_plain } from '@/plot/figures'
import axis_styles from '@/plot/styles/axisStyle.js';
import constant from '@/plot/constants'

export default function(ctx) {
    const step = constant.PADDING_X/3
    const bottom = constant.DPI_HEIGHT - constant.PADDING_Y;
    const end = constant.DPI_WIDTH - constant.RIGHT_PADDING_X;
    const padding = constant.PADDING_FROM_Y_AXIS;

    line_plain(ctx, [step*3, bottom], [step*3, constant.PADDING_Y], axis_styles.y);

    line_plain(ctx, [step*3 - padding, bottom], [step*3 - padding, constant.PADDING_Y], axis_styles.ph);
    line_plain(ctx, [step*2 - padding, bottom], [step*2 - padding, constant.PADDING_Y], axis_styles.m);
    line_plain(ctx, [step - padding, bottom], [step - padding, constant.PADDING_Y], axis_styles.h);

    line_plain(ctx, [constant.PADDING_X, bottom], [end, bottom], axis_styles.x);

    line_plain(ctx, [end, bottom], [end, constant.PADDING_Y], axis_styles.current_stop);
    line_plain(ctx, [end + 50, bottom], [end + 50, constant.PADDING_Y], axis_styles.current);
    line_plain(ctx, [end + 50, bottom], [end + 120, bottom], axis_styles.current);
}
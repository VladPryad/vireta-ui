import { line_plain } from '@/plot/figures'
import axis_styles from '@/plot/styles/axis.js';
import {constant} from '@/plot/constants'

export default function(ctx) {
    const step = (constant.PADDING_X_LEFT - constant.PADDING_X_LEFT_AXIS - constant.PADDING_X_Y_AXIS) /2;
    const bottom = constant.DPI_HEIGHT - constant.PADDING_Y;
    const end = constant.DPI_WIDTH - constant.PADDING_X_RIGHT;
    const padding = constant.PADDING_X_LEFT_AXIS;

    line_plain(ctx, [constant.PADDING_X_LEFT, bottom], [constant.PADDING_X_LEFT , constant.PADDING_Y], axis_styles.y);

    line_plain(ctx, [step*2 + padding, bottom], [step*2 + padding, constant.PADDING_Y], axis_styles.ph);
    line_plain(ctx, [step + padding, bottom], [step + padding, constant.PADDING_Y], axis_styles.m);
    line_plain(ctx, [padding, bottom], [padding, constant.PADDING_Y], axis_styles.h);

    line_plain(ctx, [constant.PADDING_X_LEFT, bottom], [end, bottom], axis_styles.x);

    line_plain(ctx, [end, bottom], [end, constant.PADDING_Y], axis_styles.current_stop);
    line_plain(ctx, [end + constant.PADDING_X_CURRENT, bottom], [end + constant.PADDING_X_CURRENT, constant.PADDING_Y], axis_styles.current);
    line_plain(ctx, [end + constant.PADDING_X_CURRENT, bottom], [end + constant.PADDING_X_CURRENT + constant.TAIL_LENGTH, bottom], axis_styles.current);
}
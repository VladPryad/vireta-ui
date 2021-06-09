import { line_plain } from '@/plot/figures'
import {constant} from '@/plot/constants'
import styles from '@/plot/styles/axis';
import styles_text from '@/plot/styles/text';
import {getTimeGaps, toDate} from "@/plot/utils/date"

export default function(ctx, records) {
    const LINE_COUNT = 10;
    let dates = getTimeGaps(records, LINE_COUNT);
    let step = constant.VIEW_WIDTH / LINE_COUNT;
    for(let i = 1; i < LINE_COUNT; i++) {
        let x = constant.PADDING_X_LEFT + step * i;
        line_plain(ctx, [x, constant.PADDING_Y], [x, constant.PADDING_Y + constant.VIEW_HEIGHT], styles.time_grid);
        let date = toDate(dates[i]);
        ctx.font = styles_text.title;
        ctx.fillText(`${date[1]}`, x - 25, constant.PADDING_Y - constant.PADDING_UPTITLE);
    }
}
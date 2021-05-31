import { constant } from '@/plot/constants'
import style from '@/plot/styles/text'
import Ratio from '@/plot/utils/ratio'

export function toDate(timestamp) {
    const shortMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ]

    const date = new Date(+timestamp);
    const month = shortMonths[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();
    let hours = date.getHours().toString();
    let seconds = date.getSeconds().toString();
    let minutes = date.getMinutes().toString();
    
    minutes = +minutes < 10 ? '0' + minutes : minutes;
    hours = +hours < 10 ? '0' + hours : hours;
    seconds = +seconds < 10 ? '0' + seconds : seconds;

    const low = `${year} ${month} ${day}`;
    const high = `${hours}:${minutes}:${seconds}`;
    return [low, high];
}

export function printDate(ctx, record) {
    let maxTime = 0;
        for(let param in record.measurements) {
            if(param != "__typename") {
                let time = record.measurements[param].values[record.measurements[param].values.length - 1].timestamp;
                if(maxTime < time) maxTime = time;
            }
        }

    let maxDate = toDate(maxTime);

    const padding_between = 20;
    const shift = 17;
    let x = constant.DPI_WIDTH - constant.PADDING_X_RIGHT + constant.PADDING_X_CURRENT;
    let y = constant.DPI_HEIGHT - constant.PADDING_Y;
    ctx.font = style.date;
    ctx.fillText(`${maxDate[1]}`, x, y + shift + padding_between);
    ctx.fillText(`${maxDate[0]}`, x, y + shift);
}

export function getTimeGaps(records, count) {
    let [start, finish] = extractTimeRange(records);
    const step = Math.round((+finish - +start) / count);
    let res = [];
    for(let i = 0; i < count; i++) {
        res.push(+start + step * i)
    }
    return res;
}

function extractTimeRange(records) {
    const start = Ratio.minmax_plain([
        records[0].measurements.humidity.values[0].timestamp,
        records[0].measurements.temperature.values[0].timestamp,
        records[0].measurements.ph.values[0].timestamp])[0];
    const finish = Ratio.minmax_plain([
        records[records.length - 1].measurements.humidity.values[records[records.length - 1].measurements.humidity.values.length - 1].timestamp,
        records[records.length - 1].measurements.temperature.values[records[records.length - 1].measurements.temperature.values.length - 1].timestamp,
        records[records.length - 1].measurements.ph.values[records[records.length - 1].measurements.ph.values.length - 1].timestamp])[1];
    return [start, finish];
} // there is a mistake with low time (it shifts for a couple months), but h,m,s are OK
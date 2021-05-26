import constant from '@/plot/constants'

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
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();

    const low = `${year} ${month} ${day}`;
    const high = `${hours}:${minutes}:${seconds}`;
    return [low, high];
}

export function printDate(ctx, record) {
    let maxTime = 0;
        for(let param in record.measurements) {
            if(param != "__typename") {
                let time = record.measurements[param][record.measurements[param].length - 1].timestamp;
                if(maxTime < time) maxTime = time;
            }
        }

    let maxDate = toDate(maxTime);

    let x = constant.DPI_WIDTH - constant.RIGHT_PADDING_X;
    let y = constant.DPI_HEIGHT - constant.PADDING_Y;
    ctx.fillText(`${maxDate[1]}`, x + 55, y + 27);
    ctx.fillText(`${maxDate[0]}`, x + 55, y + 12);
}
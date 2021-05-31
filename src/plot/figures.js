import {constant} from '@/plot/constants'

export function line_plain(ctx, start, end, style) {
    ctx.globalAlpha = style.alfa;
    ctx.beginPath();
    ctx.setLineDash(style.segment);
    ctx.lineWidth = style.size;
    ctx.strokeStyle = style.color;
    ctx.lineTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();
}

export function line(ctx, coords, ratio, style) {
    ctx.globalAlpha = style.alfa;
    ctx.beginPath();
    ctx.setLineDash(style.segment);
    ctx.lineWidth = style.size;
    ctx.strokeStyle = style.color;
    for(let el of coords) {
        let x = constant.PADDING_X_LEFT + el.x * ratio.xRatio;
        let y = constant.DPI_HEIGHT - constant.PADDING_Y - el.y * ratio.yRatio;
        ctx.lineTo( x, y);
    }
    ctx.stroke()
    ctx.closePath();
}

export function line_feed(ctx, coords, ratio, style) {
    ctx.globalAlpha = style.alfa;
    ctx.beginPath();
    ctx.setLineDash(style.segment);
    ctx.lineWidth = style.size;
    ctx.strokeStyle = style.color;
    for(let el of coords) {
        let x = constant.FEED_X + el.x * ratio.xRatio;
        let y = constant.FEED_Y - el.y * ratio.yRatio;
        ctx.lineTo( x, y);
    }
    ctx.stroke()
    ctx.closePath();
}
let constant = {
    WIDTH: 0,
    HEIGHT: 0,
    DPI_WIDTH: 0,
    DPI_HEIGHT: 0,
    PADDING_Y: 0,
    PADDING_X_LEFT: 0,
    PADDING_X_RIGHT: 0,
    PADDING_X_LEFT_AXIS: 0,
    PADDING_X_Y_AXIS: 0,
    PADDING_X_CURRENT: 0,
    TAIL_LENGTH: 0,
    VIEW_HEIGHT: 0,
    VIEW_WIDTH: 0,
}

function setDPI(dpi, style) {
    constant.WIDTH = style.width;
    constant.HEIGHT = style.height;

    constant.DPI_WIDTH = constant.WIDTH * dpi;
    constant.DPI_HEIGHT = constant.HEIGHT * dpi;

    constant.PADDING_Y = constant.DPI_HEIGHT * 0.15;
    constant.PADDING_X_LEFT = constant.DPI_WIDTH  * dpi * 0.15;
    constant.PADDING_X_RIGHT = constant.DPI_WIDTH  * dpi * 0.13;

    constant.PADDING_X_LEFT_AXIS = constant.PADDING_X_LEFT * 0.4;
    constant.PADDING_X_CURRENT = constant.PADDING_X_RIGHT * 0.2;
    constant.PADDING_X_Y_AXIS = constant.PADDING_X_LEFT * 0.15;
    constant.TAIL_LENGTH = constant.PADDING_X_RIGHT * 0.4;

    constant.VIEW_HEIGHT = constant.DPI_HEIGHT - constant.PADDING_Y * 2;
    constant.VIEW_WIDTH = constant.DPI_WIDTH - constant.PADDING_X_LEFT - constant.PADDING_X_RIGHT;
}
export { constant, setDPI };
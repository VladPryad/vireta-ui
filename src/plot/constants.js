let constants = {
    WIDTH: 600,
    HEIGHT: 200,
    PADDING_Y: 40,
    PADDING_X: 120,
    PADDING_FROM_Y_AXIS: 20,
    RIGHT_PADDING_X: 150,
    DPI_WIDTH: 0,
    DPI_HEIGHT: 0,
    VIEW_HEIGHT: 0,
    VIEW_WIDTH: 0,
}

constants.DPI_WIDTH = constants.WIDTH * 2;
constants.DPI_HEIGHT = constants.HEIGHT * 2;
constants.VIEW_HEIGHT = constants.DPI_HEIGHT - constants.PADDING_Y * 2;
constants.VIEW_WIDTH = constants.DPI_WIDTH - constants.PADDING_X - constants.RIGHT_PADDING_X;

export default constants;
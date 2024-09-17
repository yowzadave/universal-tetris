import curses
from tetris.context import context
from tetris.tetrominos import tetromino

colors = (0, 1, 2, 3, 3, 4, 4, 2)


def render_tetromino(type, rotation, x, y):
    t = tetromino(type, rotation)
    size = len(t)

    for r, row in enumerate(t):
        for c, col in enumerate(row):
            h = y - size + r + 1
            l = c * 2 + x
            if col != 0:
                context["screen"].addstr(h, l, "██", curses.color_pair(colors[type]))


def rt_on_board(type, rotation, x, y):
    render_tetromino(type, rotation, context["x0"] + x * 2, context["y0"] - y)


def render_board(board):
    for r, row in enumerate(board):
        for c, col in enumerate(row):
            if col != 0:
                context["screen"].addstr(
                    context["y0"] - r,
                    c * 2 + context["x0"],
                    "██",
                    curses.color_pair(colors[col]),
                )

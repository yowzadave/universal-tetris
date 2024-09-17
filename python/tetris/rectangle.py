from tetris.context import context


def rectangle(x, y, w, h, char=None):
    context["screen"].addstr(y, x, char or "┌")
    context["screen"].addstr(y, x + w, char or "┐")
    context["screen"].addstr(y + h, x, char or "└")
    context["screen"].addstr(y + h, x + w, char or "┘")

    hor = char or "─"
    for i in range(x + 1, x + w):
        context["screen"].addstr(y, i, hor)
        context["screen"].addstr(y + h, i, hor)

    ver = char or "│"
    for i in range(y + 1, y + h):
        context["screen"].addstr(i, x, ver)
        context["screen"].addstr(i, x + w, ver)

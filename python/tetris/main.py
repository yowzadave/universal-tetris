import curses
from random import randrange
from time import time


from tetris.context import context
from tetris.rectangle import rectangle
from tetris.array2d import array2d
from tetris.collision import collision
from tetris.tetrominos import tetromino
from tetris.overlay_array import overlay_array
from tetris.check_lines import check_lines, clear_lines
from tetris.render import render_tetromino, rt_on_board, render_board

base_speed = 500
speed_increase = 50


def line_score(level, lines):
    if lines == 1:
        return 40 * (level + 1)
    elif lines == 2:
        return 100 * (level + 1)
    elif lines == 3:
        return 300 * (level + 1)
    elif lines == 4:
        return 1200 * (level + 1)
    else:
        return 0


def draw_chrome(rx, ry):
    rectangle(rx, ry, 21, 21)
    rectangle(rx + 22, ry, 9, 5)


def fill_board(rx, ry, char=" "):
    row = char * 20
    for y in range(1, 21):
        context["screen"].addstr(ry + y, rx + 1, row)


def setup(screen):
    screen.nodelay(True)
    curses.curs_set(0)
    curses.start_color()
    curses.use_default_colors()
    curses.init_pair(1, curses.COLOR_RED, -1)
    curses.init_pair(2, curses.COLOR_GREEN, -1)
    curses.init_pair(3, curses.COLOR_BLUE, -1)
    curses.init_pair(4, curses.COLOR_MAGENTA, -1)

    context["screen"] = screen
    context["rows"], context["cols"] = screen.getmaxyx()
    rx = context["cols"] // 2 - 10
    ry = context["rows"] // 2 - 10
    context["x0"] = rx + 1
    context["y0"] = ry + 20

    end_state = "running"

    board = array2d(10, 20)
    current_tetromino = randrange(1, 8)
    next_tetromino = randrange(1, 8)
    y_pos = 19
    x_pos = 3
    rotation = 0
    lines = 0
    level = 0
    score = 0

    tick = base_speed
    last_tick = None

    # Main game loop
    while True:
        timestamp = round(time() * 1000)
        tick = base_speed - min(level * speed_increase, base_speed - speed_increase)

        if last_tick == None:
            last_tick = timestamp

        # Presumptive next position of tetromino
        next_x = x_pos
        next_y = y_pos
        next_rot = rotation

        # Get user input
        key = None

        try:
            key = screen.getkey()
        except:
            pass

        if key == "q":
            end_state = "quit"
            break

        if key == "KEY_LEFT":
            next_x -= 1
        elif key == "KEY_RIGHT":
            next_x += 1

        if key == "KEY_UP" or key == "z":
            next_rot += 1
        elif key == "x":
            next_rot -= 1

        collided = collision(board, current_tetromino, next_rot, next_x, next_y)

        if collided:
            next_x = x_pos
            next_rot = rotation

        if key == "KEY_DOWN" or timestamp - last_tick > tick:
            last_tick = timestamp

            stuck = collision(board, current_tetromino, rotation, next_x, next_y - 1)

            if stuck:
                if y_pos >= 19:  # Game over
                    break

                t = list(reversed(tetromino(current_tetromino, rotation)))
                overlay_array(board, t, x_pos, y_pos)
                l = check_lines(board)

                # Add line score
                if len(l) > 0:
                    lines += len(l)
                    level = lines // 10
                    clear_lines(board, l)
                    score += line_score(level, len(l))

                current_tetromino = next_tetromino
                next_tetromino = randrange(1, 8)
                next_y = 19
                next_x = 3
                next_rot = 0
            else:
                next_y -= 1

        # update game state
        x_pos = next_x
        y_pos = next_y
        rotation = next_rot

        # draw all elements to screen
        screen.clear()
        render_board(board)
        rt_on_board(current_tetromino, rotation, x_pos, y_pos)
        render_tetromino(next_tetromino, 0, rx + 23, ry + 4)
        rectangle(rx - 1, ry - 1, 23, 23, " ")
        rectangle(rx - 1, ry - 2, 23, 25, " ")
        draw_chrome(rx, ry)
        screen.addstr(ry + 23, rx, f"Score: {score}")
        screen.addstr(ry + 24, rx, f"Lines: {lines}")
        screen.addstr(ry + 25, rx, f"Level: {level}")
        screen.addstr(context["rows"] - 1, 0, "Press 'q' to quit")
        screen.refresh()

        currentts = round(time() * 1000)
        endts = timestamp + 16  # 60 FPS

        if endts > currentts:
            curses.napms(endts - currentts)

    if end_state != "quit":
        screen.nodelay(False)
        fill_board(rx, ry)
        screen.addstr(ry + 9, rx + 6, "Game Over")
        screen.addstr(ry + 11, rx + 4, "Press spacebar")
        screen.addstr(ry + 12, rx + 6, "to restart")
        screen.addstr(ry + 13, rx + 4, 'or "q" to quit')

        key = screen.getkey()
        while key != " " and key != "q":
            key = screen.getkey()

        if key == " ":
            return main()
        else:
            return


def main():
    curses.wrapper(setup)

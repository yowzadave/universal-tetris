def check_lines(board):
    lines = []
    for i, row in enumerate(board):
        if 0 not in row:
            lines.append(i)
    return lines


def clear_lines(board, lines):
    for i in reversed(lines):
        del board[i]
        board.append([0] * 10)

    return board

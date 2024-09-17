def overlay_array(a, b, x=0, y=0):
    for r, row in enumerate(b):
        for c, col in enumerate(row):
            if col != 0:
                if len(a) > y + r and len(a[y + r]) > x + c:
                    a[y + r][x + c] = col

    return a

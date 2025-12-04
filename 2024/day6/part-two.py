file = open("input.txt", "r")
# file = open("example.txt", "r")
grid = list(map(list, map(str.strip, file.readlines())))

num_rows = len(grid)
num_cols = len(grid[0])


def get_start():
    for r, row in enumerate(grid):
        for c, col in enumerate(row):
            if col == '^':
                return (r, c)


start_r, start_c = get_start()


def find_loop():
    r, c = start_r, start_c
    dr, dc = -1, 0
    visited = set()

    while True:
        if (r, c, dr, dc) in visited:
            return True
        visited.add((r, c, dr, dc))
        if not (0 <= r + dr < num_rows and 0 <= c + dc < num_cols):
            return False
        if grid[r+dr][c+dc] == '#':
            dc, dr = -dr, dc
        else:
            r += dr
            c += dc


obstructions = 0
for ro in range(num_rows):
    for co in range(num_cols):
        if grid[ro][co] != '.':
            continue
        grid[ro][co] = '#'
        if find_loop():
            obstructions += 1
        grid[ro][co] = '.'
print(obstructions)

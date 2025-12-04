# file = open("example.txt", "r")
file = open("input.txt", "r")
roll_matrix = []

for line in file.readlines():
    roll_matrix.append(line.strip())
file.close()


def scan_warehouse():
    removed_rolls = 0
    for y in range(len(roll_matrix)):
        for x in range(len(roll_matrix[0])):
            if scan_roll(x, y):
                removed_rolls += 1
                # print(f"before: {roll_matrix[y]}")
                current_row_list = list(roll_matrix[y])
                current_row_list[x] = "."
                roll_matrix[y] = "".join(current_row_list)
                # print(f"after:  {roll_matrix[y]}\n\n")
    print(f"removed: {removed_rolls}")
    return removed_rolls


def scan_roll(x, y):
    roll = roll_matrix[y][x]
    # print(f"roll at {x}, {y}: {roll}")
    if roll == "@":
        surrounding_rolls = 0
        for dx in range(-1, 2):
            for dy in range(-1, 2):
                check_x = x + dx
                check_y = y + dy
                # print(f"  dx: {dx}, dy: {dy}")
                if not (check_x == x and check_y == y) and check_x >= 0 and check_x < len(roll_matrix[0]) and check_y >= 0 and check_y < len(roll_matrix):
                    # print(
                    # f"  x/y: {check_x}/{check_y} is {roll_matrix[check_y][check_x]}")
                    if roll_matrix[check_y][check_x] == "@":
                        surrounding_rolls += 1
        # print(f"  surrounding_rolls at {x}, {y}: {surrounding_rolls}")
        if surrounding_rolls < 4:
            return True
        else:
            return False
    else:
        return False


# print(f"roll_matrix: {roll_matrix}")
removed_rolls = scan_warehouse()
total_removed_rolls = removed_rolls
while removed_rolls > 0:
    removed_rolls = scan_warehouse()
    total_removed_rolls += removed_rolls
print(f"removed_rolls: {total_removed_rolls}")

safeReports = 0
file = open("input.txt", "r")
count = 0
for line in file.readlines():
    safe = True
    levels = list(map(int, line.split()))
    if (levels == sorted(levels) or
            levels == sorted(levels, reverse=True)):
        for index, level in enumerate(levels):
            if (index < len(levels) - 1):
                diff = abs(int(level) - int(levels[index + 1]))
                if (diff == 0 or diff > 3):
                    # print(level, levels[index+1], diff)
                    safe = False
    else:
        # print('not sorted', line)
        safe = False
    if (safe):
        # print("good", line)
        safeReports += 1
    # else:
        # print("bad", line)
    count += 1
file.close()
print(safeReports)

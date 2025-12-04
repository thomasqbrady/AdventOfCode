total = 0
# file = open("example.txt", "r")
file = open("input.txt", "r")


def fillGap(arr):
    newArr = []
    addedSomething = False
    for strIndex, str in enumerate(arr):
        charIndex = str.find(' ')
        if charIndex > -1:
            newString1 = str[:charIndex] + ":+:" + str[charIndex + 1:]
            newString2 = str[:charIndex] + ":*:" + str[charIndex + 1:]
            newArr.append(newString1)
            newArr.append(newString2)
            addedSomething = True
    if addedSomething:
        return fillGap(newArr)
    else:
        return arr


def solve(str):
    parts = str.split(':')
    acc = int(parts[0])
    operator = ""
    for part in parts[1:]:
        if part == "+" or part == "*":
            operator = part
        else:
            if operator == "+":
                acc += int(part)
            if operator == "*":
                acc *= int(part)
    return acc


map = [list(row.strip().split(':')) for row in file.readlines()]
total = 0
for row in map:
    solution = row[0]
    operands = row[1].strip()
    arrOfSolutions = fillGap([operands])
    solved = False
    for sol in arrOfSolutions:
        if solve(sol) == int(solution):
            solved = True
    if solved:
        print(solution, operands, 'is solved')
        total += int(solution)
print(total)

file.close()

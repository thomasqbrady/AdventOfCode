total = 0
# file = open("example.txt", "r")
file = open("input.txt", "r")


def fillGap(arr):
    newArr = []
    addedSomething = False
    for strIndex, string in enumerate(arr):
        charIndex = string.find(' ')
        if charIndex > -1:
            newString1 = string[:charIndex] + ":+:" + string[charIndex + 1:]
            newString2 = string[:charIndex] + ":*:" + string[charIndex + 1:]
            newString3 = string[:charIndex] + ":|:" + string[charIndex + 1:]
            newArr.append(newString1)
            newArr.append(newString2)
            newArr.append(newString3)
            addedSomething = True
    if addedSomething:
        return fillGap(newArr)
    else:
        return arr


def solve(string):
    parts = string.split(':')
    acc = int(parts[0])
    operator = ""
    for part in parts[1:]:
        if part == "+" or part == "*" or part == "|":
            operator = part
        else:
            if operator == "+":
                acc += int(part)
            if operator == "*":
                acc *= int(part)
            if operator == "|":
                acc = int(str(acc) + part)
    # print(string, acc)
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
            break
    if solved:
        print(solution, operands, 'is solved')
        total += int(solution)
print(total)

file.close()

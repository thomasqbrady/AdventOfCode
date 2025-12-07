import re


def parse_data(data):
    problems = []
    operators = []
    for i in range(len(data) - 1):
        list_parts = re.sub(r' +', ' ', data[i])
        list_parts = list_parts.split(" ")
        problems.append([int(operand) for operand in list_parts])

    # print(f"problems: {problems}")
    operators = re.sub(r' +', ' ', data[len(data)-1]).split(" ")
    # print(f"operators: {operators}\n\n")

    return problems, operators


def calculate_part_one(probs, x, operator):
    accumulator = 0
    for y, prob in enumerate(probs):
        if y == 0:
            accumulator = prob[x]
        else:
            if operator == "*":
                # print(f"multiplying {accumulator} by {prob[x]}")
                accumulator *= prob[x]
            elif operator == "+":
                # print(f"adding {accumulator} by {prob[x]}")
                accumulator += prob[x]
    return accumulator


def part_one():
    file = open("example.txt", "r")
    # file = open("input.txt", "r")
    data = [line.strip() for line in file.readlines()]
    file.close()
    probs, ops = parse_data(data)

    total = 0
    for i, operator in enumerate(ops):
        total += calculate_part_one(probs, i, operator)
    return total


def collect_operands(data, start_x, end_x):
    operands = []
    for x in range(start_x, end_x):
        num_str = ""
        for y, line in enumerate(data[:len(data)-1]):
            num_str += line[x]
        print(f"num_str: {num_str}")
        operands.append(int(num_str.strip()))
    # print(f"operands: {operands}")
    return operands


def calculate_part_two(operands, operator):
    accumulator = operands[0]
    print(f"operands: {operands}")
    print(f"operator: {operator}")
    for operand in operands[1:]:
        if operator == "*":
            accumulator *= operand
        elif operator == "+":
            accumulator += operand
    print(f"result: {accumulator}")
    return accumulator


def find_operator(data, x):
    total = 0
    start_x = x
    operator = data[len(data)-1][x]
    x += 1
    while x < len(data[len(data)-1]):
        found = data[len(data)-1][x]
        # print(f"x: {x} char: {found}")
        if found == "*" or found == "+":
            operands = collect_operands(data, start_x, x - 1)
            result = calculate_part_two(operands, operator)
            total += result
            print(
                f"start_x: {start_x} end_x: {x-1} operator: {operator} result: {result}")
            start_x = x
            operator = found
        x += 1
    operands = collect_operands(data, start_x, len(data[0])-1)
    result = calculate_part_two(operands, operator)
    total += result
    print(f"result: {result}")
    return total


def part_two():
    # file = open("example.txt", "r")
    file = open("input.txt", "r")
    data = file.readlines()
    file.close()
    x = 0
    return (find_operator(data, x))


# print(part_one())
print(part_two())

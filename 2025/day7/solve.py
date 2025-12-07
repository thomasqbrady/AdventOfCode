import re


def parse_data(example):
    if example:
        file = open("example.txt", "r")
    else:
        file = open("input.txt", "r")
    data = file.readlines()
    file.close()
    return data


def walk_beam(x_coords, y, data, tachyon_count):
    splitters = set()
    for x in x_coords:
        encountered = data[y][x]
        if encountered == "^":
            splitters.add(x)
    for splitter in splitters:
        tachyon_count += 1
        x_coords.remove(splitter)
        x_coords.add(splitter + 1)
        x_coords.add(splitter - 1)
    # print(
        # f"y: {y} x_coords: {x_coords} splitters: {splitters}")
    if y < len(data) - 1:
        return walk_beam(x_coords, y + 1, data, tachyon_count)
    else:
        return tachyon_count


def walk_beam_multiverse(x, y, data, memo):
    if y >= len(data):
        return 1
    hit = data[y][x]
    if (x, y) in memo:
        return memo[(x, y)]
    if hit == "^":
        result = walk_beam_multiverse(
            x + 1, y+1, data, memo) + walk_beam_multiverse(x - 1, y+1, data, memo)
    else:
        result = walk_beam_multiverse(x, y+1, data, memo)
    memo[(x, y)] = result
    return result


def part_one(example):
    data = parse_data(example)
    y = 1
    x = set([data[0].find('S')])
    tachyon_count = walk_beam(x, y, data, 0)
    return tachyon_count


def part_two(example):
    data = parse_data(example)
    y = 1
    x = data[0].find('S')
    memo = {}
    universe_count = walk_beam_multiverse(x, y, data, memo)
    return universe_count


# print(part_one(False))
print(part_two(False))

# file = open("example.txt", "r")
file = open("input.txt", "r")
data = [line.rstrip() for line in file.readlines()]
file.close()


def parse_data(data):
    for i in range(len(data)):
        if data[i] == "":
            break

    ranges = [r.split("-") for r in data[:i]]
    ranges = [(int(l), int(r)) for l, r in ranges]

    ingredients = data[i+1:]
    ingredients = [int(i) for i in ingredients]

    return ranges, ingredients


def combine_ranges(ranges):
    lows, highs = [], []
    for low, high in ranges:
        lows.append(low)
        highs.append(high)
    lows.sort()
    highs.sort()

    ranges = []
    l, r = 0, 0

    while l < len(lows):
        if r+1 < len(lows) and highs[r] >= lows[r+1]:
            r += 1
        else:
            ranges.append((lows[l], highs[r]))
            r += 1
            l = r
    return ranges


def part_one(data):
    ranges, ingredients = parse_data(data)

    checked = set()
    total = 0

    for l, r in ranges:
        for i in ingredients:
            if i in checked:
                continue
            if l <= i <= r:
                checked.add(i)
                total += 1
    return total


def part_two(data):
    ranges, _ = parse_data(data)

    ranges = combine_ranges(ranges)
    total = 0
    for low, high in ranges:
        total += high - low + 1
    return total


# print(part_one(data))
print(part_two(data))

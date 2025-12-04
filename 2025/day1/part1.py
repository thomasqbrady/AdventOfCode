timesZeroHit = 0
position = 50
file = open("input.txt", "r")
for line in file.readlines():
    print(f"Position: {position}")
    print(f"Command: {line}")
    instruction = line[0]
    quantity = int(line[1:])
    direction = 1
    if instruction == "L":
        direction = -1
        print("subtract")
    else:
        print("add")
    position = (position + direction * quantity) % 100
    if position == 0:
        timesZeroHit += 1
    print(f"Result: {position}")
    print(f"Hit 0 {timesZeroHit} times")
file.close()
print(position)

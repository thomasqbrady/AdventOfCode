import math

timesZeroHit = 0
position = 50
file = open("input.txt", "r")
for line in file.readlines():
    print(f"Position: {position}")
    print(f"Command: {line}")
    instruction = line[0]
    quantity = int(line[1:])
    loops = math.floor(quantity/100)
    timesZeroHit += loops
    quantity = quantity % 100
    direction = 1
    if instruction == "L":
        direction = -1
        print("subtract")
    else:
        print("add")
    newPosition = (position + direction * quantity) % 100
    if newPosition == 0:
        print(f"on the nose (plus {loops} passes)")
        timesZeroHit += 1
    else:
        if position != 0 and direction == 1 and newPosition < position:
            print(f"to the right {loops} times")
            timesZeroHit += 1
        elif position != 0 and direction == -1 and newPosition > position:
            print(f"to the left {loops} times")
            timesZeroHit += 1
    position = newPosition
    print(f"Result: {position}")
    print(f"Hit 0 {timesZeroHit} times")
file.close()
print(position)

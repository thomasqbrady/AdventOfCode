# file = open("example.txt", "r")
file = open("input.txt", "r")
joltage = 0
for line in file.readlines():
    batteries = [int(char) for char in line.strip()]
    max_battery = max(batteries)
    max_battery_index = batteries.index(max_battery)
    remaining_batteries = []
    best_battery = 0
    if max_battery_index == len(batteries) - 1:
        remaining_batteries = batteries[:-1]
        next_highest_battery = max(remaining_batteries)
        best_battery = int(f"{next_highest_battery}{max_battery}")
        joltage += best_battery
    else:
        remaining_batteries = batteries[max_battery_index+1:]
        next_highest_battery = max(remaining_batteries)
        best_battery = int(f"{max_battery}{next_highest_battery}")
        joltage += best_battery
    # print(
    #     f"Best battery: {best_battery} + {joltage} = {best_battery + joltage}")

file.close()
print(f"Joltage: {joltage}")

battery_width = 12

# file = open("example.txt", "r")
file = open("input.txt", "r")
total_joltage = 0


def calculate_joltage(bank, battery_width):
    joltage = ""
    max_index = 0
    for i in range(1, battery_width + 1):
        window_size = battery_width - i
        end_index = -1*(window_size) if window_size != 0 else len(bank)
        max_battery = max(bank[max_index:end_index])
        max_index = bank[max_index:end_index].index(
            max_battery) + max_index + 1
        joltage += str(max_battery)
    return int(joltage)


for line in file.readlines():
    batteries = [int(char) for char in line.strip()]
    total_joltage += calculate_joltage(batteries, battery_width)
file.close()
print(total_joltage)

import re
total = 0


def check(arr, row, col):
    found = False
    if arr[row-1][col-1] == 'M' or arr[row-1][col-1] == 'S':
        if arr[row-1][col+1] == 'M' or arr[row-1][col+1] == 'S':
            if arr[row+1][col-1] == 'M' or arr[row+1][col-1] == 'S':
                if arr[row+1][col+1] == 'M' or arr[row+1][col+1] == 'S':
                    circle = arr[row-1][col-1] + arr[row-1][col +
                                                            1] + arr[row+1][col+1] + arr[row+1][col-1]
                    if circle != 'MSMS' and circle != 'SMSM':
                        filteredM = re.sub(r'M', '', circle)
                        filteredS = re.sub(r'S', '', circle)
                        if len(filteredS) == 2 and len(filteredM) == 2:
                            print(row, col)
                            found = True
    return found


file = open("input.txt", "r")
# file = open("example.txt", "r")
rows = file.readlines()
for index, item in enumerate(rows):
    rows[index] = list(item.strip())
for rowIndex, row in enumerate(rows):
    if (rowIndex > 0 and rowIndex < len(rows)-1):
        for colIndex, character in enumerate(row):
            if colIndex > 0 and colIndex < len(row)-1 and character == "A":
                if check(rows, rowIndex, colIndex):
                    total += 1
print(total)

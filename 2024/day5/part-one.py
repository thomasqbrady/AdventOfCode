total = 0
file = open("input.txt", "r")
# file = open("example.txt", "r")
rows = ''.join(file.readlines())
parts = rows.split('\n\n')
rulesArr = [rule.split('|') for rule in parts[0].split('\n')]
ruleDict = {}
middles = 0
for rulePair in rulesArr:
    if rulePair[0] in ruleDict.keys():
        ruleDict[rulePair[0]].append(rulePair[1])
    else:
        ruleDict[rulePair[0]] = [rulePair[1]]
updates = [update.split(',') for update in parts[1].split('\n')]
for updateIndex, update in enumerate(updates):
    passes = True
    for updatePageIndex, updatePage in enumerate(update):
        if updatePageIndex > 0 and updatePage in ruleDict.keys():
            updatePageRules = ruleDict[updatePage]
            for updatePageRule in updatePageRules:
                if updatePageRule in update:
                    foundAt = update.index(updatePageRule)
                    if foundAt < updatePageIndex:
                        passes = False
    if passes:
        middles += int(update[int((len(update)-1)/2)])
print(middles)
file.close()

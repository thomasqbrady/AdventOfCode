/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Monkey
    {
        public List<ulong> items = new List<ulong>();
        public string transform = "";
        public ulong val;
        public int trueMonkey;
        public int falseMonkey;
        public ulong divisor;
        public int inspections = 0;

        public void LogMonkey() {
            Console.WriteLine("");
            Console.WriteLine("===MONKEY===");
            Console.WriteLine("items: {0}", string.Join(",", items.ToArray()));
            Console.WriteLine("transform: {0}", transform);
            Console.WriteLine("val: {0}", val);
            Console.WriteLine("trueMonkey: {0}" ,trueMonkey);
            Console.WriteLine("falseMonkey: {0}", falseMonkey);
            Console.WriteLine("divisor: {0}", divisor);
            Console.WriteLine("inspections: {0}", inspections);
            Console.WriteLine("============");
        }

        public void inspect() {
            // Console.WriteLine("--------INSPECT");
            for (int i = 0;i < items.Count;i++) {
                // Console.WriteLine("item {0}", items[i]);
                inspections++;
                ulong operatorValue;
                if (val > 0) {
                    operatorValue = val;
                } else {
                    operatorValue = items[i];
                }
                switch (transform) {
                    case "*":
                        // Console.WriteLine("is multiplied by {0}", operatorValue);
                        items[i] *= operatorValue;
                        break;
                    case "+":
                        // Console.WriteLine("is increased by {0}", operatorValue);
                        items[i] += operatorValue;
                        break;
                }
                // Console.WriteLine("becomes {0}", items[i]);
            }
        }

        public void getBored() {
            // Console.WriteLine("--------BOREDOM");
            for (int i = 0;i < items.Count;i++) {
                // Console.WriteLine("item {0}", items[i]);
                decimal bored = items[i] / 3;
                items[i] = (ulong)Math.Floor(bored);
                // Console.WriteLine("becomes {0}", items[i]);
            }
        }

        public void getBored2(ulong greatDivisor) {
            // Console.WriteLine("--------BOREDOM");
            for (int i = 0;i < items.Count;i++) {
                // Console.WriteLine("item {0}", items[i]);
                items[i] = (ulong)items[i] % greatDivisor;
                // Console.WriteLine("becomes {0}", items[i]);
            }
        }

        public void toss(IDictionary<int, Monkey> monkeys) {
            // Console.WriteLine("--------TOSS");
            foreach (ulong item in items) {
                if (item % divisor == 0) {
                    // Console.WriteLine("divisible by {0}, tossing to {1}", divisor, trueMonkey);
                    monkeys[trueMonkey].items.Add(item);
                } else {
                    // Console.WriteLine("not divisible by {0}, tossing to {1}", divisor, falseMonkey);
                    monkeys[falseMonkey].items.Add(item);
                }
            }
            items = new List<ulong>();
        }

    }

    class Day
    {
        private static IDictionary<int, Monkey> monkeys = new Dictionary<int, Monkey>();
        static void Main()
        {
            // PartOne();
            PartTwo();
        }

        static void logMonkeys() {
            for (int i = 0;i < monkeys.Count;i++) {
                monkeys[i].LogMonkey();
            }
        }

        static void doRound() {
            Console.WriteLine("");
            Console.WriteLine(".....ROUND.....");
            for (int i = 0;i < monkeys.Count;i++) {
                Console.WriteLine("Monkey {0}", i);
                monkeys[i].inspect();
                monkeys[i].getBored();
                monkeys[i].toss(monkeys);
                // monkeys[i].LogMonkey();
            }
            Console.WriteLine(".....END ROUND.....");
        }

        static void doRound2(ulong greatDivisor) {
            Console.WriteLine("");
            Console.WriteLine(".....ROUND.....");
            for (int i = 0;i < monkeys.Count;i++) {
                Console.WriteLine("Monkey {0}", i);
                monkeys[i].inspect();
                monkeys[i].getBored2(greatDivisor);
                monkeys[i].toss(monkeys);
                // monkeys[i].LogMonkey();
            }
            Console.WriteLine(".....END ROUND.....");
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            using (StringReader reader = new StringReader(input))
            {
                string[] pieces;
                string? instruction = String.Empty;
                do {
                    instruction = reader.ReadLine();
                    if (instruction != null) {
                        if (instruction.StartsWith("Monkey")) {
                            // Console.WriteLine("making monkey {0}", monkeys.Count);
                            monkeys[monkeys.Count] = new Monkey();
                        } else if (instruction.StartsWith("  Starting")) {
                            string[] itemList = instruction.Split(": ")[1].Split(",");
                            foreach (string item in itemList) {
                                monkeys[monkeys.Count - 1].items.Add(ulong.Parse(item.Trim()));
                            }
                        } else if (instruction.StartsWith("  Operation")) {
                            pieces = instruction.Split(" = old ")[1].Split(" ");
                            monkeys[monkeys.Count - 1].transform = pieces[0];
                            if (pieces[1] == "old") {
                                monkeys[monkeys.Count - 1].val = 0;
                            } else {
                                monkeys[monkeys.Count - 1].val = ulong.Parse(pieces[1]);
                            }
                        } else if (instruction.StartsWith("  Test")) {
                            monkeys[monkeys.Count - 1].divisor = ulong.Parse(instruction.Split(" by ")[1]);
                        } else if (instruction.StartsWith("    If true")) {
                            monkeys[monkeys.Count - 1].trueMonkey = int.Parse(instruction.Split(" monkey ")[1]);
                        } else if (instruction.StartsWith("    If false")) {
                            monkeys[monkeys.Count - 1].falseMonkey = int.Parse(instruction.Split(" monkey ")[1]);
                        }
                    }
                } while (instruction != null);
            }
            for (int i = 0;i < 20;i++) {
                doRound();
            }
            logMonkeys();
        }

        static void PartTwo()
        {
            ulong greatDivisor = 1;
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            using (StringReader reader = new StringReader(input))
            {
                string[] pieces;
                string? instruction = String.Empty;
                do {
                    instruction = reader.ReadLine();
                    if (instruction != null) {
                        if (instruction.StartsWith("Monkey")) {
                            // Console.WriteLine("making monkey {0}", monkeys.Count);
                            monkeys[monkeys.Count] = new Monkey();
                        } else if (instruction.StartsWith("  Starting")) {
                            string[] itemList = instruction.Split(": ")[1].Split(",");
                            foreach (string item in itemList) {
                                monkeys[monkeys.Count - 1].items.Add(ulong.Parse(item.Trim()));
                            }
                        } else if (instruction.StartsWith("  Operation")) {
                            pieces = instruction.Split(" = old ")[1].Split(" ");
                            monkeys[monkeys.Count - 1].transform = pieces[0];
                            if (pieces[1] == "old") {
                                monkeys[monkeys.Count - 1].val = 0;
                            } else {
                                monkeys[monkeys.Count - 1].val = ulong.Parse(pieces[1]);
                            }
                        } else if (instruction.StartsWith("  Test")) {
                            ulong divisor = ulong.Parse(instruction.Split(" by ")[1]);
                            monkeys[monkeys.Count - 1].divisor = divisor;
                            greatDivisor *= divisor;
                        } else if (instruction.StartsWith("    If true")) {
                            monkeys[monkeys.Count - 1].trueMonkey = int.Parse(instruction.Split(" monkey ")[1]);
                        } else if (instruction.StartsWith("    If false")) {
                            monkeys[monkeys.Count - 1].falseMonkey = int.Parse(instruction.Split(" monkey ")[1]);
                        }
                    }
                } while (instruction != null);
            }
            for (int i = 0;i < 10000;i++) {
                doRound2(greatDivisor);
            }
            logMonkeys();
         }
    }
}
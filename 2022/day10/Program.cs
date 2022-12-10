/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day
    {
        private static int x = 1;
        private static int cycleIndex = 0;
        private static HashSet<int> checkPoints = new HashSet<int>();
        private static string output = "";

        static void Main()
        {
            checkPoints.Add(20);
            checkPoints.Add(60);
            checkPoints.Add(100);
            checkPoints.Add(140);
            checkPoints.Add(180);
            checkPoints.Add(220);
            // PartOne();
            PartTwo();
        }

        static int cycle(int toAdd = 0) {
            int signalStrength = 0;
            cycleIndex++;
            if (checkPoints.Contains(cycleIndex)) {
                signalStrength = cycleIndex * x;
                Console.WriteLine("Cycle {0} signal strength: {1}", cycleIndex, signalStrength);
            }
            // Console.WriteLine("On cycle: {0}, X={1}", cycleIndex, x);
            x += toAdd;
            return signalStrength;
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int signalStrengthTotal = 0;
            using (StringReader reader = new StringReader(input))
            {
                string? instruction = String.Empty;
                do {
                    instruction = reader.ReadLine();
                    if (instruction != null) {
                        signalStrengthTotal += cycle();
                        if (instruction != "noop") {
                            signalStrengthTotal += cycle(int.Parse(instruction.Split(" ")[1]));
                        }
                    }   
                } while (instruction != null);
            }
            Console.WriteLine("Signal strength total: {0}", signalStrengthTotal);
        }

        static void cycle2(int toAdd = 0) {
            cycleIndex++;
            int diff = cycleIndex%40 - x;
            if (diff >= 0 && diff <= 2) {
                output += "#";
            } else {
                output += ".";
            }
            // Console.WriteLine("On cycle: {0}, X={1}", cycleIndex, x);
            x += toAdd;
        }


        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            using (StringReader reader = new StringReader(input))
            {
                string? instruction = String.Empty;
                do {
                    instruction = reader.ReadLine();
                    if (instruction != null) {
                        cycle2();
                        if (instruction != "noop") {
                            cycle2(int.Parse(instruction.Split(" ")[1]));
                        }
                    }   
                } while (instruction != null);
            }
            Console.WriteLine("Length: {0}", output.Length);
            for (int i = 0;i < 6;i++) {
                Console.WriteLine(output.Substring(i*40, 40));
            }
        }
    }
}
/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day
    {
        static void Main()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            string[] pairs = input.Split("\n\n");
            PartOne(pairs);
            // PartTwo();
        }

        static bool compare(string left, string right) {
            return true;
        }

        static void PartOne(string[] pairs)
        {
            int score = 0;
            for (int i = 0;i < pairs.Length;i++) {
                string[] pair = pairs[i];
                string left = pair[0];
                string right = pair[1];
                bool isOrdered = compare(left, right);
                if (isOrdered) {
                    score += i;
                    Console.WriteLine("Pair {0} was ordered correctly, score tally: {1}", i, score);
                }
            }
        }

        static void PartTwo()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
        }
    }
}
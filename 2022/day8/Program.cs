/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day7
    {
        static void Main()
        {
            PartOne();
            // PartTwo();
        }

        static string[,] make2DArray(string[] rows)
        {
            int length = rows.Length;
            string[,] array2D = new string[length, length];
            int rowIndex = 0;
            foreach (string rowRaw in rows)
            {
                for (int colIndex = 0; colIndex < length; colIndex++)
                {
                    array2D[colIndex, rowIndex] = rowRaw[colIndex].ToString();
                }
                rowIndex++;
            }
            for (int y = 0; y < length; y++)
            {
                for (int x = 0; x < length; x++)
                {
                    // Console.WriteLine("{0}:{1} = {2}", x, y, array2D[x, y]);
                }
            }
            return array2D;
        }

        static List<string> check(int[] direction, List<string> candidates)
        {
            return candidates;
        }

        static void PartOne()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            string[] rows = input.Split("\n");
            int length = rows.Length;
            string[,] array2D = make2DArray(rows);
            List<string> candidates = new List<string>();
            for (int x = 1; x < length - 1; x++)
            {
                for (int y = 1; y < length - 1; y++)
                {
                    string address = "";
                    address += x;
                    address += ":";
                    address += y;
                    candidates.Add(address);
                    // Console.WriteLine("Candidate: {0}", address);
                }
            }
            int[] up = { 0, -1 };
            int[] right = { 1, 0 };
            int[] down = { 0, 1 };
            int[] left = { -1, 0 };
            candidates = check(up, candidates);
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
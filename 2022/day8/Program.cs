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

        static int[,] make2DArray(string[] rows)
        {
            int length = rows.Length;
            int[,] array2D = new int[length, length];
            int rowIndex = 0;
            foreach (string rowRaw in rows)
            {
                for (int colIndex = 0; colIndex < length; colIndex++)
                {
                    array2D[colIndex, rowIndex] = int.Parse(rowRaw[colIndex].ToString());
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

        static List<string> check(int[] direction, List<string> candidates, int[,] array2D, int length)
        {
            int rise = direction[1];
            int run = direction[0];
            List<string> toRemove = new List<string>();
            foreach (string candidateAddress in candidates)
            {
                string[] bits = candidateAddress.Split(":");
                int x = int.Parse(bits[0]);
                int y = int.Parse(bits[1]);
                // Console.WriteLine("candidate: {0}:{1} is {2}", x, y, array2D[x, y]);
                int candidateHeight = array2D[x, y];
                while (x > 0 && x < length - 1 && y > 0 && y < length - 1)
                {
                    x += run;
                    y += rise;
                    // Console.WriteLine("x: {0} y: {1}", x, y);
                    int comparatorHeight = array2D[x, y];
                    if (comparatorHeight >= candidateHeight)
                    {
                        toRemove.Add(candidateAddress);
                        // Console.WriteLine("Candidate {0} will be removed", candidateAddress);
                    }
                }
            }
            foreach (string candidateAddress in toRemove)
            {
                // Console.WriteLine("Removing {0}", candidateAddress);
                candidates.Remove(candidateAddress);
            }
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
            int[,] array2D = make2DArray(rows);
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
            Console.WriteLine("BEFORE UP");
            foreach (var candidate in candidates)
            {
                Console.WriteLine(candidate);
            }
            candidates = check(up, candidates, array2D, length);
            Console.WriteLine("AFTER");
            foreach (var candidate in candidates)
            {
                Console.WriteLine(candidate);
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
/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day7
    {
        static void Main()
        {
            // PartOne();
            PartTwo();
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

        static bool checkPath(int[] direction, string candidate, int[,] array2D, int length) {
            int rise = direction[1];
            int run = direction[0];
            string[] bits = candidate.Split(":");
            int x = int.Parse(bits[0]);
            int y = int.Parse(bits[1]);
            // Console.WriteLine("candidate: {0}:{1} is {2}", x, y, array2D[x, y]);
            int candidateHeight = array2D[x, y];
            bool visible = true;
            while (x > 0 && x < length - 1 && y > 0 && y < length - 1)
            {
                x += run;
                y += rise;
                // Console.WriteLine("x: {0} y: {1}", x, y);
                int comparatorHeight = array2D[x, y];
                if (comparatorHeight >= candidateHeight)
                {
                    visible = false;
                    // Console.WriteLine("Candidate {0} will be removed", candidateAddress);
                }
            }
            return visible;
        }

        static List<string> check(List<string> candidates, int[,] array2D, int length)
        {
            int[] up = { 0, -1 };
            int[] right = { 1, 0 };
            int[] down = { 0, 1 };
            int[] left = { -1, 0 };
            List<string> toRemove = new List<string>();
            foreach (string candidate in candidates)
            {
                bool visibleFromNorth = checkPath(up, candidate, array2D, length);
                bool visibleFromEast = checkPath(right, candidate, array2D, length);
                bool visibleFromSouth = checkPath(down, candidate, array2D, length);
                bool visibleFromWest = checkPath(left, candidate, array2D, length);
                if (!(visibleFromNorth || visibleFromEast || visibleFromSouth || visibleFromWest)) {
                    toRemove.Add(candidate);
                }
            }
            foreach (string candidate in toRemove)
            {
                Console.WriteLine("Removing {0}", candidate);
                candidates.Remove(candidate);
            }
            return candidates;
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
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
            Console.WriteLine("BEFORE");
            foreach (var candidate in candidates)
            {
                Console.WriteLine(candidate);
            }
            candidates = check(candidates, array2D, length);
            Console.WriteLine("AFTER");
            foreach (var candidate in candidates)
            {
                Console.WriteLine(candidate);
            }
            int visibleTrees = (length - 1)*4 + candidates.Count;
            Console.WriteLine("Number of visible trees: {0}", visibleTrees);
        }

        static int checkDistance(int[] direction, string candidate, int[,] array2D, int length) {
            int rise = direction[1];
            int run = direction[0];
            string[] bits = candidate.Split(":");
            int x = int.Parse(bits[0]);
            int y = int.Parse(bits[1]);
            // Console.WriteLine("candidate: {0}:{1} is {2}", x, y, array2D[x, y]);
            int candidateHeight = array2D[x, y];
            int distance = 0;
            while (x > 0 && x < length - 1 && y > 0 && y < length - 1)
            {
                x += run;
                y += rise;
                // Console.WriteLine("x: {0} y: {1}", x, y);
                int comparatorHeight = array2D[x, y];
                distance++;
                if (candidateHeight <= comparatorHeight) {
                    break;
                }

            }
            return distance;
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
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
            int highestScore = 0;
            string winner = "";
            List<string> toRemove = new List<string>();
            foreach (string candidate in candidates)
            {
                int visibilityToNorth = checkDistance(up, candidate, array2D, length);
                int visibilityToEast = checkDistance(right, candidate, array2D, length);
                int visibilityToSouth = checkDistance(down, candidate, array2D, length);
                int visibilityToWest = checkDistance(left, candidate, array2D, length);
                int score = visibilityToNorth * visibilityToEast * visibilityToSouth * visibilityToWest;
                Console.WriteLine("Candidate {0} scores N: {1} E: {2} S: {3} W: {4} total: {5}", candidate, visibilityToNorth, visibilityToEast, visibilityToSouth, visibilityToWest, score);
                if (score > highestScore) {
                    highestScore = score;
                    winner = candidate;
                }
                Console.WriteLine("Winner is {0} at {1}", winner, highestScore);
            }
      }
    }
}
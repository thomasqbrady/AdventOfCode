/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    public class Coords {
        public int X;
        public int Y;

        public Coords(int x, int y) {
            X = x;
            Y = y;
        }

        public override string ToString() => $"{X}:{Y}";
    }

    class Day
    {
        static IDictionary<string, int> map = new Dictionary<string, int>();
        static Coords startPosition;
        static Coords finishPosition;
        static int lastRow = 0;
        static int lastCol = 0;

        static void Main()
        {
            PartOne();
            // PartTwo();
        }

        static void searchPath(Coords startFrom, List<string> visited) {
            if (startFrom.ToString() == finishPosition.ToString()) {
                Console.WriteLine("!!!!!!!!!!arrived!!!!!!!!!!");
                Console.WriteLine("Took {0} steps", visited.Count);
            // } else {
            //     Console.WriteLine("{0} is not {1}", startFrom, finishPosition);
            }
            visited.Add(startFrom.ToString());
            int startHeight = map["" + startFrom.X + ":" + startFrom.Y];
            // Console.WriteLine("{0}:{1} - height: {2}", startFrom.X, startFrom.Y, startHeight);
            // Console.WriteLine("  been to {0}", string.Join(",", visited));
            Coords up;
            Coords down;
            Coords left;
            Coords right;
            List<Coords> candidates = new List<Coords>();
            if (startFrom.Y > 0) {
                up = new Coords(startFrom.X, startFrom.Y - 1);
                // Console.WriteLine("  been to up({0}): {1}", up, visited.Contains(up.ToString()));
                int diff = map[up.ToString()] - map[startFrom.ToString()];
                // Console.WriteLine("  {0} is at most 1 higher than {1}: {2}", map[up.ToString()], map[startFrom.ToString()], diff <= 1);
                if (!visited.Contains(up.ToString()) && diff <=1) {
                    candidates.Add(up);
                }
            }
            if (startFrom.Y < lastRow) {
                down = new Coords(startFrom.X, startFrom.Y + 1);
                // Console.WriteLine("  been to down({0}): {1}", down, visited.Contains(down.ToString()));
                int diff = map[down.ToString()] - map[startFrom.ToString()];
                // Console.WriteLine("  {0} is at most 1 higher than {1}: {2}", map[down.ToString()], map[startFrom.ToString()], diff <= 1);
                if (!visited.Contains(down.ToString()) && diff <=1) {
                    candidates.Add(down);
                }
            }
            if (startFrom.X > 0) {
                left = new Coords(startFrom.X - 1, startFrom.Y);
                // Console.WriteLine("  been to left({0}): {1}", left, visited.Contains(left.ToString()));
                int diff = map[left.ToString()] - map[startFrom.ToString()];
                // Console.WriteLine("  {0} is at most 1 higher than {1}: {2}", map[left.ToString()], map[startFrom.ToString()], diff <= 1);
                if (!visited.Contains(left.ToString()) && diff <=1) {
                    candidates.Add(left);
                }
            }
            if (startFrom.X < lastCol) {
                right = new Coords(startFrom.X + 1, startFrom.Y);
                // Console.WriteLine("  been to right({0}): {1}", right, visited.Contains(right.ToString()));
                int diff = map[right.ToString()] - map[startFrom.ToString()];
                // Console.WriteLine("  {0} is at most 1 higher than {1}: {2}", map[right.ToString()], map[startFrom.ToString()], diff <= 1);
                if (!visited.Contains(right.ToString()) && diff <=1) {
                    candidates.Add(right);
                }
            }
            // Console.WriteLine(" ");
            // foreach(Coords candidate in candidates) {
                // Console.WriteLine("From {0} could go next to {1}", startFrom, candidate.ToString());
            // }
            // Console.WriteLine(" ");
            foreach(Coords candidate in candidates) {
                List<string> newVisited = new List<string>(visited);
                searchPath(candidate, newVisited);
            }
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            using (StringReader reader = new StringReader(input))
            {
                int rowIndex = 0;
                string? legendRow = String.Empty;
                do {
                    legendRow = reader.ReadLine();
                    if (legendRow != null) {
                        char[] positions = legendRow.ToCharArray();
                        int colIndex = 0;
                        foreach (char position in positions) {
                            int height = 0;
                            switch (position) {
                                case 'S':
                                    startPosition = new Coords(colIndex, rowIndex);
                                    height = 0;
                                    break;
                                case 'E':
                                    finishPosition = new Coords(colIndex, rowIndex);
                                    height = 26;
                                    break;
                                default :
                                    height = (int)position - 97;
                                    break;
                            }
                            string address = "" + colIndex + ":" + rowIndex;
                            map[address] = height;
                            Console.WriteLine("{0} - {1}", address, height);
                            colIndex++;
                        }
                        lastCol = colIndex - 1;
                    }
                    rowIndex++;
                } while (legendRow != null);
                lastRow = rowIndex - 2;
            }
            List<string> visited = new List<string>();
            Console.WriteLine("Starting search. Last col: {0}, last row: {1}, startPosition: {2}, finishPosition: {3}", lastCol, lastRow, startPosition, finishPosition);
            searchPath(startPosition, visited);
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
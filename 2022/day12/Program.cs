/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    public class Square
    {
        public char id;
        public int x;
        public int y;
        public int height;
        public int? distance;
    }

    public class Map
    {
        public List<Square> Columns = new();
        public List<List<Square>> Rows = new();
    }

    class Day12
    {

        static void Main()
        {
            PartOne();
            // PartTwo();
        }

        static void PartOne()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            string[] line;
            Map map = new Map();
            Queue<Square> queue = new();
            {
                line = input.Split("\n");

                for (int i = 0; i < line.Count(); i++)
                {
                    List<Square> y = new();
                    for (int j = 0; j < line[i].Length; j++)
                    {
                        Square square = new Square();
                        square.id = line[i][j];
                        square.x = j;
                        square.y = i;
                        square.distance = null;
                        switch (square.id) {
                            case 'S':
                                square.height = 0;
                                break;
                            case 'E':
                                square.height = 25;
                                break;
                            default:
                                square.height = (int)square.id - 97;
                                square.distance = 0;
                                queue.Enqueue(square);
                                break;
                        }
                        y.Add(square);
                    }
                    map.Rows.Add(y);
                }
            }

            Square Part1 = new Square();
            List<Square> Part2 = new List<Square>();
            while (queue.Count > 0)
            {
                Square square = queue.Dequeue();
                AssignDistances(square.x, square.y, (int)square.distance, square.height);
                if (square.id == 'S') { Part1 = square; }
                if (square.id == 'a') { Part2.Add(square); }
            }
            Console.WriteLine($"Part 1: {Part1.distance}");
            Part2 = Part2.OrderBy(x => x.distance).ToList();
            Console.WriteLine($"Part 2: {Part2[0].distance}");

            void AssignDistances(int x, int y, int d, int h)
            {
                //LEFT

                if (x > 0 && map.Rows[y][x - 1].height <= h + 1)
                {
                    if (map.Rows[y][x - 1].distance == null)
                    {
                        map.Rows[y][x - 1].distance = d + 1;
                        queue.Enqueue(map.Rows[y][x - 1]);
                    }
                    else if (map.Rows[y][x - 1].distance > d + 1)
                    {
                        map.Rows[y][x - 1].distance = d + 1;
                        queue.Enqueue(map.Rows[y][x - 1]);
                    }
                }

                //RIGHT
                if (x + 2 <= line[0].Length && map.Rows[y][x + 1].height <= h + 1)
                {
                    if (map.Rows[y][x + 1].distance == null)
                    {
                        map.Rows[y][x + 1].distance = d + 1;
                        queue.Enqueue(map.Rows[y][x + 1]);
                    }
                    else if (map.Rows[y][x + 1].distance > d + 1)
                    {
                        map.Rows[y][x + 1].distance = d + 1;
                        queue.Enqueue(map.Rows[y][x + 1]);
                    }
                }

                //UP
                if (y > 0 && map.Rows[y - 1][x].height <= h + 1)
                {
                    if (map.Rows[y - 1][x].distance == null)
                    {
                        map.Rows[y - 1][x].distance = d + 1;
                        queue.Enqueue(map.Rows[y - 1][x]);
                    }
                    else if (map.Rows[y - 1][x].distance > d + 1)
                    {
                        map.Rows[y - 1][x].distance = d + 1;
                        queue.Enqueue(map.Rows[y - 1][x]);
                    }
                }

                //DOWN
                if (y + 2 <= line.Length && map.Rows[y + 1][x].height <= h + 1)
                {
                    if (map.Rows[y + 1][x].distance == null)
                    {
                        map.Rows[y + 1][x].distance = d + 1;
                        queue.Enqueue(map.Rows[y + 1][x]);
                    }
                    else if (map.Rows[y + 1][x].distance > d + 1)
                    {
                        map.Rows[y + 1][x].distance = d + 1;
                        queue.Enqueue(map.Rows[y + 1][x]);
                    }
                }
            }
        }
    }
}


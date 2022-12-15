/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day12
    {
        private static char[,] map = new char[0,0];
        private static int[,] distances = new int[0,0];
        private static List<(int, int)> lowestStarts = new List<(int, int)>();
        private static int width, height, startX, startY, endX, endY, generation;

        static void Main()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            string[] lines = input.Split("\n");
            parse(lines);
            Console.WriteLine("MAP");
            width = lines[0].Length;
            height= lines.Length;
            for (int y = 0;y < height;y++) {
                for (int x = 0;x < width;x++) {
                    Console.Write("{0} ", map[x, y]);
                }
                Console.WriteLine();
            }
            Console.WriteLine("===========");
            Console.WriteLine("DISTANCE");
            for (int y = 0;y < height;y++) {
                for (int x = 0;x < width;x++) {
                    Console.Write("{0} ", distances[x, y]);
                }
                Console.WriteLine();
            }
            // PartOne();
            PartTwo();
        }

        static void parse(string[] input) {
            width = input[0].Length;
            height= input.Length;
            map = new char[width, height];
            distances = new int[width, height];
            for (int y = 0;y < height;y++) {
                for (int x = 0;x < width;x++) {
                    map[x, y] = input[y][x];
                    distances[x, y] = 0;
                    if (map[x, y] == 'S') { startX = x; startY = y; map[x, y] = 'a';}
                    if (map[x, y] == 'E') { endX = x; endY = y; map[x, y] = 'z';}
                    if (map[x, y] == 'a') { lowestStarts.Add((x, y)); }
                }
            }
        }

        static int bfs(List<(int, int)> start) {
            List<(int, int)> stack = start;
            List<(int, int)> directions = new List<(int, int)> { (-1, 0), (1, 0), (0, -1), (0, 1) };
            generation += 10000;
            int distance = ++generation;
            Console.WriteLine("distance: {0} generation {1}", distance, generation);
            foreach ((int sx, int sy) in start) distances[sx, sy] = distance;
            while (stack.Count > 0) {
                List<(int, int)> next = new List<(int, int)>();
                distance++;
                foreach ((int candidateX, int candidateY) in stack) {
                    foreach ((int dx, int dy) in directions) {
                        int nextX = candidateX + dx, nextY = candidateY + dy;
                        if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height) {
                            if (distances[nextX, nextY] < generation && map[nextX, nextY] <= map[candidateX, candidateY] + 1) {
                                if ((nextX, nextY) == (endX, endY)) return distance - generation;
                                Console.WriteLine("distance: {0} generation: {1}", distance, generation);
                                distances[nextX, nextY] = distance;
                                next.Add((nextX, nextY));
                            }
                        }
                    }
                }
                stack = next;
            }
            return -1;
        }

        static void PartOne()
        {
            // Console.WriteLine("===========");
            Console.WriteLine("Part one");
            Console.WriteLine(bfs(new List<(int, int)> {(startX, startY)}).ToString());
        }

        static void PartTwo() {
            // Console.WriteLine("===========");``
            Console.WriteLine("Part one");
            Console.WriteLine(bfs(lowestStarts).ToString());
        }
    }
}


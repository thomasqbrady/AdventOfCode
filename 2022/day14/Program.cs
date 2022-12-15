/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    // class CaveMapCoord {
    //     public int X;
    //     public int Y;
    //     public string Material;

    //     public static void Main(int x, int y, string material) {
    //         this.X = x;
    //         this.Y = y;
    //         this.Material = material;
    //     }
    // }
    class Day
    {
        static void LogObject(object o) {
            Console.WriteLine(JsonSerializer.Serialize(o));
        }

        static void Main()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            PartOne(input);
            // PartTwo();
        }

        static IDictionary<string, string> makeWall(int x1, int y1, int x2, int y2, IDictionary<string, string> map) {
            if (x2 == x1 && y2 == y1) {
                Console.WriteLine("make spot at {0},{1}", x1, y1);
                map[$"{x1},{y1}"] = "rock";
            } else {
                if (x2 == x1) {
                    int startY = y1;
                    for (int i = 0;Math.Abs(i) < Math.Abs(y2 - y1);i += Math.Sign(y2 - y1)) {
                        Console.WriteLine("make wall part on Y wall at {0},{1}", x1, y1 + i);
                        map[$"{x1},{y1 + i}"] = "rock";
                    }
                }
                if (y2 == y1) {
                    int startX = x1;
                    for (int i = 0;Math.Abs(i) < Math.Abs(x2 - x1);i += Math.Sign(x2 - x1)) {
                        Console.WriteLine("make wall part on X wall at {0},{1}", x1 + i, y1);
                        map[$"{x1 + i},{y1}"] = "rock";
                    }
                }
            }
            return map;
        }

        static IDictionary<string, string> parseMap(string input) {
            IDictionary<string, string> map = new Dictionary<string, string>();
            string[] formations = input.Split("\n");
            int ? leftWall = null;
            int ? rightWall = null;
            int ? topWall = null;
            int ? bottomWall = null;
            foreach (string formation in formations) {
                string[] points = formation.Split(" -> ");
                int ? lastX = null;
                int ? lastY = null;
                for (int i = 0;i < points.Length;i++) {
                    string[] coords = points[i].Split(",");
                    int x = int.Parse(coords[0]);
                    if (leftWall == null || x < leftWall) {
                        leftWall = x;
                    }
                    if (rightWall == null || x > rightWall) {
                        rightWall = x;
                    }
                    int y = int.Parse(coords[1]);
                    if (topWall == null || y < topWall) {
                        topWall = y;
                    }
                    if (bottomWall == null || y > bottomWall) {
                        bottomWall = y;
                    }
                    if (lastX != null) {
                        Console.WriteLine("make wall from {0},{1} to {2},{3}", x, y, lastX, lastY);
                        map = makeWall(x, y, (int)lastX, (int)lastY, map);
                    } else {
                        Console.WriteLine("no last postition, yet");
                        Console.WriteLine("make point at {0}", points[i]);
                        map = makeWall(x, y, x, y, map);
                    }
                    lastX = x;
                    lastY = y;
                }
            }
            LogObject(map);
            Console.WriteLine("leftWall: {0} rightWall: {1} bottomWall: {2} topWall: {3}", leftWall, rightWall, bottomWall, topWall);
            return map;
        }

        static void PartOne(string input)
        {
            IDictionary<string, string> map = parseMap(input);

        }

        static void PartTwo()
        {
        }
    }
}
/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    class Day
    {
        static void LogObject(object o) {
            Console.WriteLine(JsonSerializer.Serialize(o));
        }

        static void Main()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            // PartOne(input);
            PartTwo(input);
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

        static (IDictionary<string, string>, (int, int, int, int)) parseMap(string input, int sandEmitterX, int sandEmitterY) {
            IDictionary<string, string> map = new Dictionary<string, string>();
            string[] formations = input.Split("\n");
            int ? leftWall = null;
            int ? rightWall = null;
            int topWall = sandEmitterY;
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
                    if (y < topWall) {
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
            if (sandEmitterX < leftWall) {
                leftWall = sandEmitterX;
            }
            if (sandEmitterX > rightWall) {
                rightWall = sandEmitterX;
            }
            LogObject(map);
            Console.WriteLine("leftWall: {0} rightWall: {1} bottomWall: {2} topWall: {3}", leftWall, rightWall, bottomWall, topWall);
            return (map, ((int)leftWall, (int)topWall, (int)rightWall, (int)bottomWall));
        }

        static void printMap(int leftWall, int topWall, int rightWall, int bottomWall, IDictionary<string, string> map) {
            for (int i = topWall;i <= (int)bottomWall;i++) {
                for (int j = (int)leftWall;j <= (int)rightWall;j++) {
                    if (map.ContainsKey($"{j},{i}") && map[$"{j},{i}"] == "rock") {
                        Console.Write("#");
                    } else if (map.ContainsKey($"{j},{i}") && map[$"{j},{i}"] == "sand") {
                        Console.Write("O");
                    } else {
                        Console.Write(".");
                    }
                }
                Console.WriteLine();
            }
        }

        static IDictionary<string, string> grainFall(IDictionary<string, string> map, int sandEmitterX, int sandEmitterY, int bottomWall, int? grainX, int? grainY) {
            int currX;
            int currY;
            if (grainX != null && grainY != null) {
                currX = (int)grainX;
                currY = (int)grainY;
            } else {
                currX = sandEmitterX;
                currY = sandEmitterY;
            }
            int candX = 0;
            int candY = 0;
            bool sandHasComeToRest= false;
            while (!sandHasComeToRest) {
                // down
                candX = currX;
                candY = currY + 1;
                string candidate = "";
                if (map.ContainsKey($"{candX},{candY}")) {
                    candidate = map[$"{candX},{candY}"];
                }
                if (candidate == string.Empty) {
                    // Console.WriteLine("sand falls one row to {0}:{1}", candX, candY);
                    if (candY > bottomWall) {
                        Console.WriteLine("We have fallen off the bottom!");
                        map["FINISHED"] = "FINISHED";
                        return map;
                    } else {
                        return grainFall(map, sandEmitterX, sandEmitterY, bottomWall, candX, candY);
                    }
                } else {
                    // Console.WriteLine("sand can't go down because there is {0} at {1}:{2}", candidate, candX, candY);
                    //down and left
                    candX = currX - 1;
                    candY = currY + 1;
                    candidate = "";
                    if (map.ContainsKey($"{candX},{candY}")) {
                        candidate = map[$"{candX},{candY}"];
                    }
                    if (candidate == string.Empty) {
                        // Console.WriteLine("sand falls one row to {0}:{1}", candX, candY);
                        return grainFall(map, sandEmitterX, sandEmitterY, bottomWall, candX, candY);
                    } else {
                        // Console.WriteLine("sand can't go down and left because there is {0} at {1}:{2}", candidate, candX, candY);
                        //down and right
                        candX = currX + 1;
                        candidate = "";
                        if (map.ContainsKey($"{candX},{candY}")) {
                            candidate = map[$"{candX},{candY}"];
                        }
                        if (candidate == string.Empty) {
                            // Console.WriteLine("sand falls one row to {0}:{1}", candX, candY);
                            return grainFall(map, sandEmitterX, sandEmitterY, bottomWall, candX, candY);
                        } else {
                            // are we at the source?
                            if (currX == sandEmitterX && currY == sandEmitterY) {
                                Console.WriteLine("Finished at source");
                                map["FINISHED"] = "FINISHED";
                                return map;
                            }
                            // Console.WriteLine("sand comes to rest because there is {0} at {1}:{2}", candidate, candX, candY);
                            map[$"{currX},{currY}"] = "sand";
                            sandHasComeToRest = true;
                        }
                    }
                }
            }
            return map;
        }

        static void PartOne(string input)
        {
            (IDictionary<string, string>, (int,int,int,int)) stuff = parseMap(input, 500, 0);
            IDictionary<string, string> map = stuff.Item1;
            (int, int, int, int) walls = stuff.Item2;
            int leftWall = walls.Item1;
            int topWall = walls.Item2;
            int rightWall = walls.Item3;
            int bottomWall = walls.Item4;
            printMap(leftWall, topWall, rightWall, bottomWall, map);
            int sandCount = 0;
            while (!map.ContainsKey("FINISHED")) {
                sandCount++;
                map = grainFall(map, 500, 0, bottomWall, null, null);
                printMap(leftWall, topWall, rightWall, bottomWall, map);
            }
            Console.WriteLine("Total sand: {0}", sandCount - 1);
        }

        static void PartTwo(string input)
        {
            (IDictionary<string, string>, (int,int,int,int)) stuff = parseMap(input, 500, 0);
            IDictionary<string, string> map = stuff.Item1;
            (int, int, int, int) walls = stuff.Item2;
            int leftWall = walls.Item1;
            int topWall = walls.Item2;
            int rightWall = walls.Item3;
            int bottomWall = walls.Item4;
            int wallWidth = rightWall - leftWall;
            for (int i = 0;i < wallWidth * wallWidth;i++) {
                map[$"{leftWall - i},{bottomWall + 2}"] = "rock";
                map[$"{rightWall + i},{bottomWall + 2}"] = "rock";
            }
            for (int i = 0;i < wallWidth;i++) {
                map[$"{leftWall + i},{bottomWall + 2}"] = "rock";
            }
            leftWall -= wallWidth * wallWidth;
            rightWall += wallWidth * wallWidth;
            bottomWall += 2;
            // printMap(leftWall, topWall, rightWall, bottomWall, map);
            int sandCount = 0;
            while (!map.ContainsKey("FINISHED")) {
                sandCount++;
                map = grainFall(map, 500, 0, bottomWall, null, null);
                // printMap(leftWall, topWall, rightWall, bottomWall, map);
            }
            printMap(leftWall, topWall, rightWall, bottomWall, map);
            Console.WriteLine("Total sand: {0}", sandCount);
        }
    }
}
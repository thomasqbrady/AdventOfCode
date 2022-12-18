/** author: Thomas Q Brady
*** Advent of Code 2022 day 15
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    class Day15
    {
        private static IDictionary<string, string> map = new Dictionary<string, string>();
        private static Int64 topWall = 0;
        private static Int64 rightWall = 0;
        private static Int64 bottomWall = 0;
        private static Int64 leftWall = 0;

        static void LogObject(object o) {
            Console.WriteLine(JsonSerializer.Serialize(o));
        }

        static void Main()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            // PartOne(input);
            PartTwo(input);
        }

        static (Int64, Int64) parseDevice(string readout, string type) {
            string[] deviceCoords = readout.Split(", ");
            string deviceX = deviceCoords[0];
            string deviceY = deviceCoords[1];
            int xIndex = deviceX.IndexOf("=");
            int yIndex = deviceY.IndexOf("=");
            Int64 x = Int64.Parse(deviceX.Substring(xIndex+1));
            Int64 y = Int64.Parse(deviceY.Substring(yIndex+1));
            if (x < leftWall) {
                leftWall = x;
            }
            if (x > rightWall) {
                rightWall = x;
            }
            if (y < topWall) {
                topWall = y;
            }
            if (y > bottomWall) {
                bottomWall = y;
            }
            if (type == "sensor") {
                map[$"{x}:{y}"] = "S";
            } else {
                map[$"{x}:{y}"] = "B";
            }
            // Console.WriteLine("{0} device at {1}:{2}", type, x, y);
            return (x, y);
        }

        static void drawSensorRadius(Int64 x, Int64 y, Int64 radius) {
            Console.WriteLine("drawing sensor radius from {0}:{1} for {2}", x, y, radius);
            for (Int64 row = y - radius;row <= y + radius;row++) {
                drawSensorRadiusRow(x, y, radius, row);
            }
        }

        static void drawSensorRadiusRow(Int64 x, Int64 y, Int64 radius, Int64 row) {
            Console.WriteLine("drawing sensor radius from {0}:{1} for {2}", x, y, radius);
            Console.WriteLine($"Abs(Abs({y}-{row})-{radius}) = {Math.Abs((y - row) - radius)}");
            Int64 xTravel = Math.Abs(Math.Abs(y - row) - radius);
            Console.WriteLine("row {0} xTravel: {1}", row, xTravel);
            for (Int64 col = x - xTravel;col <= x + xTravel;col++) {
                if (!map.ContainsKey($"{col}:{row}")) {
                    map[$"{col}:{row}"] = "#";
                }
            }
        }

        static void printMap() {
            for (Int64 col = leftWall;col <= rightWall;col++) {
                if (col%10 == 0) {
                    Console.Write(col);
                } else {
                    Console.Write(" ");
                }
            }
            Console.WriteLine();
            for (Int64 row = topWall;row <= bottomWall;row++) {
                printMapRow(row);
            }
        }

        static void printMapRow(Int64 row) {
            Console.Write($"{row} ");
            for (Int64 col = leftWall;col <= rightWall;col++) {
                if(map.ContainsKey($"{col}:{row}")) {
                    Console.Write(map[$"{col}:{row}"]);
                } else {
                    Console.Write(".");
                }
            }
            Console.WriteLine(" |");
        }

        static Int64 checkRow(Int64 row) {
            // perhaps store top/right/bottom/left for each sensor
            // then see which of those overlap with the row you want to check
            // THEN drawSensorRadius just for the ones that will matter
            // then count #s
            Int64 positions = 0;
            for (Int64 col = leftWall;col <= rightWall;col++) {
                if(map.ContainsKey($"{col}:{row}")) {
                    if (map[$"{col}:{row}"] == "#") {
                        positions++;
                    }
                }
            }
            return positions;
        }

        static void PartOne(string input)
        {
            int rowToCheck = 2000000;
            List<(Int64, Int64, Int64)> sensors = new List<(Int64, Int64, Int64)>();
            string[] readouts = input.Split("\n");
            foreach (string readout in readouts) {
                string[] readoutParts = readout.Split(":");
                string sensorReadout = readoutParts[0];
                string beaconReadout = readoutParts[1];
                (Int64, Int64) sensorCoords = parseDevice(sensorReadout, "sensor");
                (Int64, Int64) beaconCoords = parseDevice(beaconReadout, "beacon");
                Int64 sX = sensorCoords.Item1;
                Int64 sY = sensorCoords.Item2;
                Int64 bX = beaconCoords.Item1;
                Int64 bY = beaconCoords.Item2;
                // Console.WriteLine("Sensor {0}:{1} closest beacon is {2}:{3}", sX, sY, bX, bY);
                Int64 manhattanDistance = Math.Abs(bX - sX) + Math.Abs(bY - sY);
                topWall = (topWall > sY - manhattanDistance) ? sY - manhattanDistance : topWall;
                rightWall = (rightWall < sX + manhattanDistance) ? sX + manhattanDistance : rightWall;
                bottomWall = (bottomWall < sY + manhattanDistance) ? sY + manhattanDistance : bottomWall;
                leftWall = (leftWall > sX - manhattanDistance) ? sX - manhattanDistance : leftWall;
                // Console.WriteLine("Manhattan distance: {0}", manhattanDistance);
                sensors.Add((sX, sY, manhattanDistance));
            }
            // LogObject(map);
            // printMap();
            foreach ((Int64, Int64, Int64) sensor in sensors) {
                Int64 sX = sensor.Item1;
                Int64 sY = sensor.Item2;
                Int64 mD = sensor.Item3;
                // if this sensor is close enough to matter for the row we're interested in
                if (rowToCheck >= sY - mD && rowToCheck <= sY + mD) {
                    drawSensorRadiusRow(sX, sY, mD, rowToCheck);
                }
            }
            // printMap();
            // printMapRow(rowToCheck);
            Console.WriteLine("safe positions: {0}", checkRow(rowToCheck));
        }

        static List<(Int64, Int64)> walkPerimeter(Int64 x, Int64 y, Int64 radius, List<(Int64, Int64, Int64)> sensors) {
            List<(Int64, Int64)> candidates = new List<(Int64, Int64)>();
            Console.WriteLine("walking perimeter from {0}:{1} for {2}", x, y, radius);
            for (Int64 row = y - radius;row <= y + radius;row++) {
                Int64 xTravel = Math.Abs(Math.Abs(y - row) - radius);
                for (Int64 col = x - xTravel;col <= x + xTravel;col += (xTravel > 0) ? xTravel * 2 : 1) {
                    Console.WriteLine($"checking {col}:{row} xTravel: {xTravel} {col <= x + xTravel}");
                    if (!map.ContainsKey($"{col}:{row}") && col >= leftWall && col <= rightWall && row >= topWall && row <= bottomWall) {
                        bool outsideAll = true;
                        foreach ((Int64, Int64, Int64) sensor in sensors) {
                            if (sensor.Item1 != x && sensor.Item2 != y) {
                                if (Math.Abs(col - sensor.Item1) + Math.Abs(row - sensor.Item2) <= sensor.Item3) {
                                    outsideAll = false;
                                    // Console.WriteLine($"{col}:{row} is on the perimeter of {x}:{y}({_radius}) but is within range of {sensor.Item1}:{sensor.Item2}({sensor.Item3})");
                                    break;
                                } else {
                                    // Console.WriteLine($"{col}:{row} is on the perimeter of {x}:{y}({_radius}) and is NOT within range of {sensor.Item1}:{sensor.Item2}({sensor.Item3})");
                                }
                            }
                        }
                        if (outsideAll) {
                            Console.WriteLine($"{col}:{row} is a candidate");
                            map[$"{col}:{row}"] = "C";
                            candidates.Add((col, row));
                        }
                    }
                }
            }
            return candidates;
        }

        static void PartTwo(string input)
        {
            //walk along the edge of the diamonds created by the sensors and for every of these positions, 
            // check if it is within range of any of the sensors. If not, we have found the result
             int rowToCheck = 2000000;
            List<(Int64, Int64, Int64)> sensors = new List<(Int64, Int64, Int64)>();
            List<(Int64, Int64)> candidates = new List<(Int64, Int64)>();
            string[] readouts = input.Split("\n");
            foreach (string readout in readouts) {
                string[] readoutParts = readout.Split(":");
                string sensorReadout = readoutParts[0];
                string beaconReadout = readoutParts[1];
                (Int64, Int64) sensorCoords = parseDevice(sensorReadout, "sensor");
                (Int64, Int64) beaconCoords = parseDevice(beaconReadout, "beacon");
                Int64 sX = sensorCoords.Item1;
                Int64 sY = sensorCoords.Item2;
                Int64 bX = beaconCoords.Item1;
                Int64 bY = beaconCoords.Item2;
                // Console.WriteLine("Sensor {0}:{1} closest beacon is {2}:{3}", sX, sY, bX, bY);
                Int64 manhattanDistance = Math.Abs(bX - sX) + Math.Abs(bY - sY);
                topWall = (topWall > sY - manhattanDistance) ? sY - manhattanDistance : topWall;
                rightWall = (rightWall < sX + manhattanDistance) ? sX + manhattanDistance : rightWall;
                bottomWall = (bottomWall < sY + manhattanDistance) ? sY + manhattanDistance : bottomWall;
                leftWall = (leftWall > sX - manhattanDistance) ? sX - manhattanDistance : leftWall;
                // Console.WriteLine("Manhattan distance: {0}", manhattanDistance);
                sensors.Add((sX, sY, manhattanDistance));
                drawSensorRadius(sX, sY, manhattanDistance);
            }
            // LogObject(map);
            // printMap();
            // (Int64, Int64, Int64) sensor = sensors[0];
            // walkPerimeter(sensor.Item1, sensor.Item2, sensor.Item3, sensors);
            foreach ((Int64, Int64, Int64) sensor in sensors) {
                Int64 sX = sensor.Item1;
                Int64 sY = sensor.Item2;
                Int64 mD = sensor.Item3;
                candidates = walkPerimeter(sX, sY, mD + 1, sensors);
            }
            printMap();
            // printMapRow(rowToCheck);
            // Console.WriteLine("safe positions: {0}", checkRow(rowToCheck));
            foreach ((Int64, Int64) candidate in candidates) {
                Console.WriteLine("Could be {0}:{1}", candidate.Item1, candidate.Item2);
            }
        }
    }
}

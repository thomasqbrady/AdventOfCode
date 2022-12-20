/** author: Thomas Q Brady
*** Advent of Code 2022 day 17
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    class Shape {
        public int X;
        public int Y;
        public int Height;
        public int ShapeIndex;

        public Shape(int x, int y, int height, int shapeIndex) {
            this.X = x;
            this.Y = y;
            this.Height = height;
            this.ShapeIndex = shapeIndex;
        }

        public override string ToString() {
            return $"X: {X} Y: {Y} ShapeIndex: {ShapeIndex}";
        }
    }
    class Day17
    {
        static int shapeIndex = 0;
        static int chamberWidth = 7;
        static int initialFallHeight = 2;
        static int initialX = 2;
        static List<Shape> fallenShapes = new List<Shape>();
        static Shape? fallingShape = null;
        static string winds = "";
        static int windIndex = 0;

        static string[][] shapes = new string[][] {
            new string[] {"####"},
            new string[] {" # ", "###", " # "},
            new string[] {"  #", "  #", "###"},
            new string[] {"#", "#", "#", "#"},
            new string[] {"##", "##"}
        };

        static void cycleShape() {
            shapeIndex += 1;
            if (shapeIndex == shapes.Length) {
                shapeIndex = 0;
            }
        }

        static void cycleWind() {
            windIndex += 1;
            if (windIndex == winds.Length) {
                windIndex = 0;
            }
        }

        static int windStringToCoordinateDeltas(string wind) {
            switch (wind) {
                case "<":
                    return -1;
                default :
                    return 1;
            }
        }

        static void spawnShape(int Y) {
            string[] shapeString = shapes[shapeIndex];
            int shapeHeight = shapeString.Length;
            fallingShape = new Shape(initialX, Y + shapeHeight, shapeHeight, shapeIndex);
            cycleShape();
            Console.WriteLine(fallingShape);
        }

        static void print() {
            List<(int, int)> map = new List<(int, int)>();
            
        }

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
            // PartTwo(input);
        }

        static void PartOne(string input)
        {
            int fallFrom = initialFallHeight;
            for (int i = 0;i < 2022;i++) {
                if (fallingShape == null) {
                    spawnShape(fallFrom);
                }
                // while (fallingShape != null) {
                //     string wind = winds[windIndex];
                //     cycleWind();

                // }
            }
        }

        static void PartTwo(string input)
        {
        }
    }
}
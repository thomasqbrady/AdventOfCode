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
        public int Width;
        public int ShapeIndex;

        public Shape(int x, int y, int height, int width, int shapeIndex) {
            this.X = x;
            this.Y = y;
            this.Height = height;
            this.Width = width;
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
        static int initialFallHeight = 3;
        static int initialX = 2;
        static IDictionary<(int, int), string> board = new Dictionary<(int, int), string>();
        static Shape? fallingShape = null;
        static string winds = "";
        static int windIndex = 0;
        static int tallestPoint = 0;

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

        static int windStringToCoordinateDeltas(char wind) {
            switch (wind) {
                case '<':
                    return -1;
                default :
                    return 1;
            }
        }

        static Shape spawnShape(int Y) {
            string[] shapeStrings = shapes[shapeIndex];
            int shapeHeight = shapeStrings.Length;
            int shapeWidth = shapeStrings[0].Length;
            Shape newShape = new Shape(initialX, Y + shapeHeight, shapeHeight, shapeWidth, shapeIndex);
            cycleShape();
            // Console.WriteLine(newShape);
            return newShape;
        }

        static void print() {
            int fallingY = (fallingShape != null) ? fallingShape.Y : 0;
            int startY = (fallingY > tallestPoint) ? fallingY : tallestPoint;
            for (int row = startY;row >= 0;row--) {
                Console.Write("|");
                for (int col = 0;col < chamberWidth;col++) {
                    if (board.ContainsKey((col, row))) {
                        if (row == 0) {
                            Console.Write("-");
                        } else {
                            Console.Write("#");
                        }
                    } else {
                        if (fallingShape != null) {
                            if (row <= fallingShape.Y && row > fallingShape.Y - fallingShape.Height && col >= fallingShape.X && col < fallingShape.X + fallingShape.Width) {
                                string[] shapeStrings = shapes[fallingShape.ShapeIndex];
                                // Console.WriteLine($"Trying to show shapeStrings {Math.Abs(fallingShape.Y - row)}:{Math.Abs(fallingShape.X - col)}");
                                if (shapeStrings[Math.Abs(fallingShape.Y - row)][col - fallingShape.X] == '#') {
                                    Console.Write("#");
                                } else {
                                    Console.Write(" ");
                                }
                            } else {
                                Console.Write(" ");
                            }
                        } else {
                            Console.Write(" ");
                        }
                    }
                }
                Console.WriteLine("|");
            }
        }

        static bool willItCollide(int x, int y) {
            string[] shapeStrings = shapes[fallingShape.ShapeIndex];
            bool wouldCollide = false;
            for (int row = 0;row < shapeStrings.Length;row++) {
                for (int col = 0;col < shapeStrings[row].Length;col++) {
                    if (shapeStrings[row][col] == '#') {
                        // Console.WriteLine($"Shape located at {fallingShape.X}:{fallingShape.Y} has a # at {fallingShape.X + col}:{fallingShape.Y - row}");
                        // Console.WriteLine($"Checking to see if there is something for it to collide with at {x + col}:{y - row}");
                        (int, int) placeToCheck = (x + col, y - row);
                        if (board.ContainsKey(placeToCheck)) {
                            // Console.WriteLine("  will collide");
                            wouldCollide = true;
                        } else {
                            // Console.WriteLine("  clear");
                        }
                    }
                }
            }
            return wouldCollide;
        }

        static void LogObject(object o) {
            Console.WriteLine(JsonSerializer.Serialize(o));
        }

        static void Main()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            // PartOne(input);
            PartTwo(input);
        }

        static void PartOne(string input)
        {
            for (int i = 0;i < chamberWidth;i++) {
                board[(i, 0)] = "#";
            }
            winds = input;
            for (int i = 0;i < 2022;i++) {
            // for (int i = 0;i < 4;i++) {
                if (fallingShape == null) {
                    fallingShape = spawnShape(tallestPoint + initialFallHeight);
                }
                // Console.WriteLine("Start of round");
                // print();
                while (fallingShape != null) {
                    char wind = winds[windIndex];
                    int delta = windStringToCoordinateDeltas(wind);
                    int nextX = fallingShape.X + delta;
                    // have to check whole shape, not just left and right of top row...
                    bool wouldCollide = willItCollide(nextX, fallingShape.Y);
                    if (wouldCollide || nextX < 0 || nextX + fallingShape.Width > chamberWidth) {
                        // Console.WriteLine($"Cannot blow to {nextX}:{fallingShape.Y}");
                    } else {
                        // Console.WriteLine($"Shape blows to {nextX}:{fallingShape.Y}");
                        fallingShape.X = nextX;
                    }
                    // Console.WriteLine("After blowing");
                    // print();
                    int nextY = fallingShape.Y - 1;
                    string[] shapeStrings = shapes[fallingShape.ShapeIndex];
                    wouldCollide = willItCollide(fallingShape.X, fallingShape.Y - 1);
                    if (wouldCollide) {
                        // Console.WriteLine("shape should stop falling");
                        for (int row = 0;row < shapeStrings.Length;row++) {
                            for (int col = 0;col < shapeStrings[row].Length;col++) {
                                if (shapeStrings[row][col] == '#') {
                                    board[(fallingShape.X + col, fallingShape.Y - row)] = "#";
                                }
                            }
                        }
                        if (fallingShape.Y > tallestPoint) {
                            tallestPoint = fallingShape.Y;
                        }
                        fallingShape = null;
                    } else {
                        fallingShape.Y = nextY;
                        // Console.WriteLine($"Shape falls to {fallingShape.X}:{fallingShape.Y}");
                    }
                    cycleWind();
                    // Console.WriteLine("End of round");
                    // print();
                    Console.WriteLine($"i: {i}");
                }
            }
            Console.WriteLine($"Tallest point is: {tallestPoint}");
        }

        static void PartTwo(string input)
        {
             for (int i = 0;i < chamberWidth;i++) {
                board[(i, 0)] = "#";
            }
            winds = input;
            for (int i = 0;i < 1000000000000;i++) {
            // for (int i = 0;i < 4;i++) {
                if (fallingShape == null) {
                    fallingShape = spawnShape(tallestPoint + initialFallHeight);
                }
                // Console.WriteLine("Start of round");
                // print();
                while (fallingShape != null) {
                    char wind = winds[windIndex];
                    int delta = windStringToCoordinateDeltas(wind);
                    int nextX = fallingShape.X + delta;
                    // have to check whole shape, not just left and right of top row...
                    bool wouldCollide = willItCollide(nextX, fallingShape.Y);
                    if (wouldCollide || nextX < 0 || nextX + fallingShape.Width > chamberWidth) {
                        // Console.WriteLine($"Cannot blow to {nextX}:{fallingShape.Y}");
                    } else {
                        // Console.WriteLine($"Shape blows to {nextX}:{fallingShape.Y}");
                        fallingShape.X = nextX;
                    }
                    // Console.WriteLine("After blowing");
                    // print();
                    int nextY = fallingShape.Y - 1;
                    string[] shapeStrings = shapes[fallingShape.ShapeIndex];
                    wouldCollide = willItCollide(fallingShape.X, fallingShape.Y - 1);
                    if (wouldCollide) {
                        // Console.WriteLine("shape should stop falling");
                        for (int row = 0;row < shapeStrings.Length;row++) {
                            for (int col = 0;col < shapeStrings[row].Length;col++) {
                                if (shapeStrings[row][col] == '#') {
                                    board[(fallingShape.X + col, fallingShape.Y - row)] = "#";
                                }
                            }
                        }
                        if (fallingShape.Y > tallestPoint) {
                            tallestPoint = fallingShape.Y;
                        }
                        fallingShape = null;
                    } else {
                        fallingShape.Y = nextY;
                        // Console.WriteLine($"Shape falls to {fallingShape.X}:{fallingShape.Y}");
                    }
                    cycleWind();
                    // Console.WriteLine("End of round");
                    // print();
                    Console.WriteLine($"i: {i}");
                }
            }
            Console.WriteLine($"Tallest point is: {tallestPoint}");
        }
    }
}
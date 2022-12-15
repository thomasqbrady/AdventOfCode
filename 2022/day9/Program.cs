/** author: Thomas Q Brady
*** Advent of Code 2022 day 9
**/

namespace com.thomasqbrady
{
    public struct Coords {
        public int X;
        public int Y;

        public Coords(int x, int y) {
            X = x;
            Y = y;
        }

        public override string ToString() => $"{X}:{Y}";
    }
    class Day9
    {
        static void Main()
        {
            // PartOne();
            PartTwo();
        }

        static Coords approachX(int diffX, Coords tail) {
            if (diffX < 0) {
                tail.X -= 1;
            }
            if (diffX > 0) {
                tail.X += 1;
            }
            // Console.WriteLine("Moved X tail to {0}", tail);
            return tail;
        }

        static Coords approachY(int diffY, Coords tail) {
            if (diffY < 0) {
                tail.Y -= 1;
            }
            if (diffY > 0) {
                tail.Y += 1;
            }
            // Console.WriteLine("Moved Y tail to {0}", tail);
            return tail;
        }

        static Coords follow(Coords head, Coords tail) {
            int diffX = head.X - tail.X;
            int diffY = head.Y - tail.Y;
            int diffXAbs = Math.Abs(diffX);
            int diffYAbs = Math.Abs(diffY);
            // Console.WriteLine("DiffX: {0} ({1} - {2}), DiffY: {3} ({4} - {5})", diffX, head.X, tail.X, diffY, head.Y, tail.Y);
            // Console.WriteLine("DiffXAbs: {0}, DiffYAbs: {1}", diffXAbs, diffYAbs);
            if (diffXAbs == 2 && diffYAbs == 0) {
                // Console.WriteLine("Move X");
                return approachX(diffX, tail);
            }
            if (diffYAbs == 2 && diffXAbs == 0) {
                // Console.WriteLine("Move Y");
                return approachY(diffY, tail);
            }
            if (diffXAbs > 1 || diffYAbs > 1) {
                // Console.WriteLine("Move Diag");
                tail = approachX(diffX, tail);
                return approachY(diffY, tail);
            }
            // Console.WriteLine("Not moving diffXAbs: {0} diffYAbs: {1}", diffXAbs, diffYAbs);
            return tail;
        }
        
        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            IDictionary<string, Coords> directions = new Dictionary<string, Coords>();
            directions.Add("R", new Coords(1,0));
            directions.Add("D", new Coords(0,1));
            directions.Add("L", new Coords(-1,0));
            directions.Add("U", new Coords(0,-1));
            List<string> visited = new List<string>();
            Coords head = new Coords(0,0);
            Coords tail = new Coords(0,0);
            visited.Add(tail.ToString());
            using (StringReader reader = new StringReader(input))
            {
                string? step = string.Empty;
                do {
                    step = reader.ReadLine();
                    // Console.WriteLine("B4 Head: {0}, Tail: {1}", head, tail);
                    Console.WriteLine(step);
                    if (step != null) {
                        string[] stepParts = step.Split(" ");
                        string direction = stepParts[0];
                        int distance = int.Parse(stepParts[1]);
                        Coords movement = directions[direction];
                        for (int i = 0;i < distance;i++) {
                            head.X += movement.X;
                            head.Y += movement.Y;
                            tail = follow(head, tail);
                            if (!visited.Contains(tail.ToString())) {
                                visited.Add(tail.ToString());
                            }
                            // Console.WriteLine("@R substep Head: {0}, Tail: {1}", head, tail);
                            // Console.WriteLine("------");
                        }
                    }
                } while (step != null);

            }
            // Console.WriteLine("Visited {0} spaces: {1}", visited.Count, string.Join(",", visited));
            Console.WriteLine("Visited {0}", visited.Count);
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            IDictionary<string, Coords> directions = new Dictionary<string, Coords>();
            directions.Add("R", new Coords(1,0));
            directions.Add("D", new Coords(0,1));
            directions.Add("L", new Coords(-1,0));
            directions.Add("U", new Coords(0,-1));
            List<string> visited = new List<string>();
            Coords[] rope = {
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0),
                new Coords(0,0)};
            visited.Add(rope[9].ToString());
            using (StringReader reader = new StringReader(input))
            {
                string? step = string.Empty;
                do {
                    step = reader.ReadLine();
                    Console.WriteLine("B4 Head: {0}, Tail: {1}", rope[0], rope[9]);
                    Console.WriteLine(step);
                    if (step != null) {
                        string[] stepParts = step.Split(" ");
                        string direction = stepParts[0];
                        int distance = int.Parse(stepParts[1]);
                        Coords movement = directions[direction];
                        for (int i = 0;i < distance;i++) {
                            rope[0].X += movement.X;
                            rope[0].Y += movement.Y;
                            for (int j = 1;j < 10;j++) {
                                rope[j] = follow(rope[j-1], rope[j]);
                            }
                            if (!visited.Contains(rope[9].ToString())) {
                                visited.Add(rope[9].ToString());
                            }
                            // Console.WriteLine("@R substep Head: {0}, Tail: {1}", head, tail);
                            for (int k = 0;k < 10;k++) {
                                Console.WriteLine(rope[k].ToString());
                            }
                            Console.WriteLine("------");
                        }
                    }
                } while (step != null);
            }
            for (int i = 0;i < 10;i++) {
                Console.WriteLine(rope[i].ToString());
            }
            // Console.WriteLine("Visited {0} spaces: {1}", visited.Count, string.Join(",", visited));
            Console.WriteLine("Visited {0}", visited.Count);
        }
    }
}
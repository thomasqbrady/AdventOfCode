/** author: Thomas Q Brady
*** Advent of Code 2022 day 5
**/

namespace com.thomasqbrady
{
    class Day5
    {
        public static IDictionary<string, Stack<string>> stacks = new Dictionary<string, Stack<string>>();

        static void Main()
        {
            // PartOne();
            PartTwo();
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");

            string[] parts = input.Split("\n\n");

            string startingArrangement = parts[0];
            string instructions = parts[1];

            string[] layers = startingArrangement.Split("\n");
            int length = layers.Length;
            int columns = (layers[0].Length + 1) / 4;

            for (int index = 0; index < columns; index++)
            {
                Stack<string> stack = new Stack<string>();
                stacks.Add((index + 1).ToString(), stack);
            }

            for (int rowIndex = length - 2; rowIndex >= 0; rowIndex--)
            {
                string layer = layers[rowIndex];
                for (int colIndex = 0; colIndex < columns; colIndex++)
                {
                    string container = layer.Substring((((colIndex + 1) * 4) - 3), 1).Trim();
                    if (container != "")
                    {
                        stacks[(colIndex + 1).ToString()].Push(container);
                    }
                }
            }
            for (int colIndex = 0; colIndex < columns; colIndex++)
            {
                Console.WriteLine("stack {0}: {1}", colIndex, string.Join(',', stacks[(colIndex + 1).ToString()].ToArray()));
            }
            Console.WriteLine("*********");
            string[] steps = instructions.Split("\n");
            foreach (string step in steps)
            {
                string[] stepParts = step.Split(" ");
                int quantity = int.Parse(stepParts[1]);
                string startColumn = stepParts[3];
                string endColumn = stepParts[5];
                for (int counter = 0; counter < quantity; counter++)
                {
                    Stack<string> fromStack = stacks[startColumn];
                    Stack<string> toStack = stacks[endColumn];
                    string container = fromStack.Pop();
                    toStack.Push(container);
                    for (int colIndex = 0; colIndex < columns; colIndex++)
                    {
                        Console.WriteLine("stack {0}: {1}", colIndex, string.Join(',', stacks[(colIndex + 1).ToString()].ToArray()));
                    }
                    Console.WriteLine("---");
                }
            }
            for (int colIndex = 0; colIndex < columns; colIndex++)
            {
                Console.WriteLine(stacks[(colIndex + 1).ToString()].Pop());
            }
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");

            string[] parts = input.Split("\n\n");

            string startingArrangement = parts[0];
            string instructions = parts[1];

            string[] layers = startingArrangement.Split("\n");
            int length = layers.Length;
            int columns = (layers[0].Length + 1) / 4;

            for (int index = 0; index < columns; index++)
            {
                Stack<string> stack = new Stack<string>();
                stacks.Add((index + 1).ToString(), stack);
            }

            for (int rowIndex = length - 2; rowIndex >= 0; rowIndex--)
            {
                string layer = layers[rowIndex];
                for (int colIndex = 0; colIndex < columns; colIndex++)
                {
                    string container = layer.Substring((((colIndex + 1) * 4) - 3), 1).Trim();
                    if (container != "")
                    {
                        stacks[(colIndex + 1).ToString()].Push(container);
                    }
                }
            }
            for (int colIndex = 0; colIndex < columns; colIndex++)
            {
                Console.WriteLine("stack {0}: {1}", colIndex, string.Join(',', stacks[(colIndex + 1).ToString()].ToArray()));
            }
            Console.WriteLine("*********");
            string[] steps = instructions.Split("\n");
            foreach (string step in steps)
            {
                string[] stepParts = step.Split(" ");
                int quantity = int.Parse(stepParts[1]);
                Stack<string> hopper = new Stack<string>();
                string startColumn = stepParts[3];
                string endColumn = stepParts[5];
                for (int counter = 0; counter < quantity; counter++)
                {
                    Stack<string> fromStack = stacks[startColumn];
                    string container = fromStack.Pop();
                    hopper.Push(container);
                }
                for (int counter = 0; counter < quantity; counter++)
                {
                    Stack<string> toStack = stacks[endColumn];
                    string container = hopper.Pop();
                    toStack.Push(container);
                }
                for (int colIndex = 0; colIndex < columns; colIndex++)
                {
                    Console.WriteLine("stack {0}: {1}", colIndex, string.Join(',', stacks[(colIndex + 1).ToString()].ToArray()));
                }
                Console.WriteLine("---");
            }
            for (int colIndex = 0; colIndex < columns; colIndex++)
            {
                Console.WriteLine(stacks[(colIndex + 1).ToString()].Pop());
            }
        }
    }
}
/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{

    class Day
    {
        static void Main()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            string[] pairs = input.Split("\n\n");
            PartOne(pairs);
            // PartTwo();
        }

        static int ParseInt(Queue<char> data) {
            string token = string.Empty;
            while (char.IsDigit(data.Peek())) {
                token += data.Dequeue();
            }
            return int.Parse(token);
        }

        static List<object> ParseList(Queue<char> data) {
            List<object> elements = new ();
            data.Dequeue(); // remove the opening [
            while (data.Peek() != ']') {
                object element = ParseElement(data);
                elements.Add(element);
                if (data.Peek() == ',') {
                    data.Dequeue();
                }
            }
            data.Dequeue(); // remove the closing ]
            return elements;
        }

        static object ParseElement(Queue<char> data) {
            char next = data.Peek();
            if (char.IsDigit(next)) {
                return ParseInt(data);
            } else if (next == '[') {
                return ParseList(data);
            } else {
                throw new Exception($"List is messed up");
            }
        }

        static int CompareElements(object left, object right) {
            return (left, right) switch {
                (int l, int r) => Math.Sign(l - r),
                (List<object> l, List<object> r) => CompareLists(l, r),
                (int l, List<object> r) => CompareLists(new List<object>() {l}, r),
                (List<object> l, int r) => CompareLists(l, new List<object>() {r}),
                _ => throw new Exception($"Could not compare {left} and {right}"),
            };
        }
        
        static int CompareLists(List<object> left, List<object> right) {
            int lengthOfShorterList = Math.Min(left.Count, right.Count);
            for (int i = 0;i < lengthOfShorterList;i++) {
                object leftElement = left[i];
                object rightElement = right[i];
                int diff = CompareElements(leftElement, rightElement);
                if (diff < 0) {
                    return -1;
                } else if (diff > 0) {
                    return 1;
                }
            }
            return Math.Sign(left.Count - right.Count);
        }

        static Queue<char> StringToQueue(string toParse) {
            Queue<char> queue = new Queue<char>();
            foreach (char ch in toParse) {
                queue.Enqueue(ch);
            }
            return queue;
        }

        static List<object> Parse(string list) {
            Queue<char> queue = StringToQueue(list);
            return ParseList(queue);
        }

        static void PartOne(string[] pairs)
        {
            int score = 0;
            for (int i = 0;i < pairs.Length;i++) {
                string[] packets = pairs[i].Split("\n");
                List<object> left = Parse(packets[0].Trim());
                List<object> right = Parse(packets[1].Trim());
                if (CompareLists(left, right) <= 0) {
                    score += i + 1;
                }
            }
            Console.WriteLine("Score: {0}", score);
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
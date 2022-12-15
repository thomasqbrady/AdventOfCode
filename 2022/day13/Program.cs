/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    class ListComparer : IComparer<object> {
        public int Compare(object first, object second) {
            return Day.CompareElements(first, second);
        }
    }

    class Day
    {
        static void Main()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            string[] pairs = input.Split("\n\n");
            // PartOne(pairs);
            PartTwo(input);
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

        public static int CompareElements(object left, object right) {
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

        static void PartTwo(string input)
        {
            string[] packets = input.Replace("\n\n", "\n").Split("\n");
            List<List<object>> sortableList = new List<List<object>>();
            List<object> twoOuter = new List<object>();
            List<object> inner = new List<object>();
            int two = 2;
            inner.Add(two);
            twoOuter.Add(inner);
            sortableList.Add(twoOuter);
            List<object> sixOuter = new List<object>();
            inner = new List<object>();
            int six = 6;
            inner.Add(six);
            sixOuter.Add(inner);
            sortableList.Add(sixOuter);
            foreach (string packet in packets) {
                sortableList.Add(Parse(packet));
            }
            sortableList.Sort(new ListComparer());
            sortableList.ForEach(packet => Console.WriteLine("packet: {0}", JsonSerializer.Serialize(packet)));
            int twoIndex = sortableList.IndexOf(twoOuter) + 1;
            int sixIndex = sortableList.IndexOf(sixOuter) + 1;
            Console.WriteLine("two: {0} six: {1}, answer: {2}", twoIndex, sixIndex, twoIndex * sixIndex);
        }
    }
}
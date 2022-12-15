/** author: Thomas Q Brady
*** Advent of Code 2022 day X
**/
using System.Text.Json;

namespace com.thomasqbrady
{
    class DayX
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
            // PartTwo(input);
        }
        static void PartOne(string input)
        {
        }

        static void PartTwo(string input)
        {
        }
    }
}
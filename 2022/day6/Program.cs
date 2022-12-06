/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day6
    {
        static void Main()
        {
            // PartOne();
            PartTwo();
        }

        static bool checkForDupes(string window)
        {
            for (int i = 0; i < window.Length; i++)
            {
                string letter = window[i].ToString();
                if (window.Substring(i + 1).Contains(letter))
                {
                    return true;
                }
            }
            return false;
        }
        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int i = 0;
            string window = "";
            while (i < input.Length)
            {
                string letter = input[i].ToString();
                Console.WriteLine("i: {0} window: {1} letter: {2}", i, window, letter);
                if (window.Length == 4)
                {
                    window = window.Substring(1);
                    Console.WriteLine("After removal window: {0}", window);
                }
                window += letter;
                Console.WriteLine("After adding letter window: {0}", window);
                if (window.Length == 4)
                {
                    if (!checkForDupes(window))
                    {
                        Console.WriteLine("Found it at {0}! {1}", i + 1, window);
                        return;
                    }
                }
                i++;
            }
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int i = 0;
            string window = "";
            while (i < input.Length)
            {
                string letter = input[i].ToString();
                if (window.Length == 14)
                {
                    window = window.Substring(1);
                }
                window += letter;
                if (window.Length == 14)
                {
                    if (!checkForDupes(window))
                    {
                        Console.WriteLine("Found it at {0}! {1}", i + 1, window);
                        return;
                    }
                }
                i++;
            }
        }
    }
}
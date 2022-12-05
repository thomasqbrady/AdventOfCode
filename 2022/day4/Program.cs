/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day3
    {

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
            int score = 0;
            string[] sacks = input.Split("\n");
            foreach (string sack in sacks)
            {
                int length = sack.Length;
                string alreadySearched = "";
                bool keepGoing = true;
                int index = 0;
                while (keepGoing)
                {
                    string letter = sack[index].ToString();
                    if (alreadySearched.Contains(letter))
                    {
                        index++;
                    }
                    else
                    {
                        alreadySearched += letter;
                        bool foundDuplicate = sack.LastIndexOf(letter) >= length / 2;
                        if (foundDuplicate)
                        {
                            keepGoing = false;
                            int priority = 0;
                            int letterAsciiCode = (int)letter.ToCharArray()[0];
                            if (letterAsciiCode >= 97)
                            {
                                priority = letterAsciiCode - 96;
                            }
                            else
                            {
                                priority = letterAsciiCode - 38;
                            }
                            score += priority;
                        }
                        else
                        {
                            index++;
                        }
                    }
                }

            }
            Console.WriteLine("Final score: {0}", score);
        }

        static int FindBadgePriority(string one, string two, string three)
        {
            string alreadySearched = "";
            bool keepGoing = true;
            int priority = 0;
            int index = 0;
            while (keepGoing)
            {
                string letter = one[index].ToString();
                if (!alreadySearched.Contains(letter))
                {
                    alreadySearched += letter;
                    if (two.Contains(letter) && three.Contains(letter))
                    {
                        int letterAsciiCode = (int)letter.ToCharArray()[0];
                        if (letterAsciiCode >= 97)
                        {
                            priority = letterAsciiCode - 96;
                        }
                        else
                        {
                            priority = letterAsciiCode - 38;
                        }
                        keepGoing = false;
                    }
                    else
                    {
                        index++;
                    }
                }
                else
                {
                    index++;
                }
            }
            return priority;
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int score = 0;
            string one = "";
            string two = "";
            string three = "";
            string[] sacks = input.Split("\n");
            foreach (string sack in sacks)
            {
                if (one == "")
                {
                    one = sack;
                    continue;
                }
                if (two == "")
                {
                    two = sack;
                    continue;
                }
                if (three == "")
                {
                    three = sack;
                    int priority = FindBadgePriority(one, two, three);
                    score += priority;
                    one = "";
                    two = "";
                    three = "";
                }
            }
            Console.WriteLine("Sum or priority is {0}", score);
        }
    }
}
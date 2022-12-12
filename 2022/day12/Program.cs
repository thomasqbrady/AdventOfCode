/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day
    {
        static void Main()
        {
            PartOne();
            // PartTwo();
        }
        static void PartOne()
        {
            string input = System.IO.File.ReadAllText(@"test.txt");
            // string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            
            using (StringReader reader = new StringReader(input))
            {
                int rowIndex = 0;
                string? legendRow = String.Empty;
                do {
                    legendRow = reader.ReadLine();
                    if (legendRow != null) {
                        char[] positions = legendRow.ToCharArray();
                        int colIndex = 0;
                        foreach (char position in positions) {
                            switch (char) {
                                case 'S':
                                    break;
                                case 'E':
                                    break'
                                default :
                                    break;
                            }
                            colIndex++;
                        }
                    }
                    rowIndex++;
                } while (legendRow != null);
            }
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
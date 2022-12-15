/** author: Thomas Q Brady
*** Advent of Code 2022 day 4
**/

namespace com.thomasqbrady
{
    class Day4
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
            int fullOverlaps = 0;
            string[] rows = input.Split("\n");
            foreach (string row in rows)
            {
                string[] assignments = row.Split(",");
                string[] firstAssignment = assignments[0].Split("-");
                int firstAssignmentStart = int.Parse(firstAssignment[0]);
                int firstAssignmentEnd = int.Parse(firstAssignment[1]);
                string[] secondAssignment = assignments[1].Split("-");
                int secondAssignmentStart = int.Parse(secondAssignment[0]);
                int secondAssignmentEnd = int.Parse(secondAssignment[1]);
                if (secondAssignmentStart >= firstAssignmentStart && secondAssignmentEnd <= firstAssignmentEnd) {
                    fullOverlaps++;
                } else {
                    if (firstAssignmentStart >= secondAssignmentStart && firstAssignmentEnd <= secondAssignmentEnd) {
                        fullOverlaps++;
                    }
                }
            }
            Console.WriteLine("Full overlaps: {0}", fullOverlaps);
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int partialOverlaps = 0;
            string[] rows = input.Split("\n");
            foreach (string row in rows)
            {
                string[] assignments = row.Split(",");
                string[] firstAssignment = assignments[0].Split("-");
                int firstAssignmentStart = int.Parse(firstAssignment[0]);
                int firstAssignmentEnd = int.Parse(firstAssignment[1]);
                string[] secondAssignment = assignments[1].Split("-");
                int secondAssignmentStart = int.Parse(secondAssignment[0]);
                int secondAssignmentEnd = int.Parse(secondAssignment[1]);
                // Console.WriteLine("sAS {0} >= fAS {1}: {2}",secondAssignmentStart, firstAssignmentStart, secondAssignmentStart >= firstAssignmentStart);
                // Console.WriteLine("sAS {0} <= fAE {1}: {2}",secondAssignmentStart, firstAssignmentEnd, secondAssignmentStart <= firstAssignmentEnd);
                // Console.WriteLine("=================");
                if (secondAssignmentStart >= firstAssignmentStart && secondAssignmentStart <= firstAssignmentEnd) {
                    partialOverlaps++;
                } else {
                    if (firstAssignmentStart >= secondAssignmentStart && firstAssignmentStart <= secondAssignmentEnd) {
                        // Console.WriteLine("fAS {0} >= sAS {1}: {2}", firstAssignmentStart, secondAssignmentStart, firstAssignmentStart >= secondAssignmentStart);
                        // Console.WriteLine("fAS {0} <= sAE {1}: {2}", secondAssignmentStart, secondAssignmentEnd, firstAssignmentStart <= secondAssignmentEnd);
                        // Console.WriteLine("=================");
                        partialOverlaps++;
                    }
                }
            }
            Console.WriteLine("Partial overlaps: {0}", partialOverlaps);
       }
    }
}
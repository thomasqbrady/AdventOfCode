/** author: Thomas Q Brady
*** Advent of Code 2022 day 1
**/

namespace com.thomasqbrady
{
    class Day1 {
        static void Main() {
            // PartOne();
            PartTwo();
        }

        static void PartOne() {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            Int32 highestCalorieCount = 0;
            string[] inventories = input.Split("\n\n");
            foreach(string inventory in inventories) {
                Int32 totalForElf = 0;
                string[] strFoodItems = inventory.Split("\n");
                foreach(string foodItem in strFoodItems) {
                    Int32 calories = Int32.Parse(foodItem);
                    totalForElf += calories;
                    if (totalForElf > highestCalorieCount) {
                        highestCalorieCount = totalForElf;
                    }
                }
                Console.WriteLine("Adding elf with a total calorie count of {0}", totalForElf);
            }
            Console.WriteLine("The largest count of calories carried by one elf is {0}", highestCalorieCount);
        }

        static void PartTwo() {
             //string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            List<Int32> calorieCounts = new List<Int32>();
            string[] inventories = input.Split("\n\n");
            foreach(string inventory in inventories) {
                string[] strFoodItems = inventory.Split("\n");
                Int32 totalForElf = 0;
                foreach(string foodItem in strFoodItems) {
                    Int32 calories = Int32.Parse(foodItem);
                    totalForElf += calories;
                }
                calorieCounts.Add(totalForElf);
            }
            calorieCounts.Sort();
            calorieCounts.Reverse();
            Console.WriteLine("The three elves carrying the most calories have {0} in total", calorieCounts[0] + calorieCounts[1] + calorieCounts[2]);
      }
    }
}
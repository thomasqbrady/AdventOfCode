/** author: Thomas Q Brady
*** Advent of Code 2022 day 2
**/

namespace com.thomasqbrady
{
    class Day2 {
        public static IDictionary<string, int> plays = new Dictionary<string, int>();

        static void Main() {
            plays.Add("A", 1);
            plays.Add("X", 1);
            plays.Add("B", 2);
            plays.Add("Y", 2);
            plays.Add("C", 3);
            plays.Add("Z", 3);
            // PartOne();
            PartTwo();
        }

        static void PartOne() {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            int score = 0;
            string[] rounds = input.Split("\n");
            foreach(string round in rounds) {
                string[] moves = round.Split(" ");
                int opponentMove = (int)plays[moves[0]];
                int myMove = (int)plays[moves[1]];
                score += myMove;
                Console.WriteLine("Add {0} for a move of {1}", myMove, moves[1]);
                int roundScore = 0;
                // tie
                if (myMove == opponentMove) {
                    roundScore = 3;
                } else {
                    // if our plays are neighbors in the list of possible moves (1/2, 2/3)
                    if (Math.Abs(myMove - opponentMove) == 1) {
                        // if my play has a higher index in the list then I win
                        if (myMove > opponentMove) {
                            roundScore = 6;
                        }
                    } else {
                        //our plays are at opposite ends of the list (values of 1 and 3)
                        // if my play has the lower index I win
                        if (myMove < opponentMove) {
                            roundScore = 6;
                        }
                    }                 
                }
                score += roundScore;
            }
            Console.WriteLine("Final score: {0}", score);
        }

        static void lose() {

        }

        static void PartTwo() {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            // Console.WriteLine("===========");
            int score = 0;
            string[] rounds = input.Split("\n");
            foreach(string round in rounds) {
                string[] moves = round.Split(" ");
                int opponentMove = (int)plays[moves[0]];
                string outcome = moves[1];
                int losingPlay = (opponentMove - 1 > 0) ? opponentMove - 1 : 3;
                int winningPlay = (opponentMove + 1 <= 3) ? opponentMove + 1 : 1;
                switch (outcome) {
                    // if we are to lose, we only get the points of their move
                    case "X":
                        score += losingPlay;
                        // Console.WriteLine("Opponent played {0}, so you played {1} to lose getting {2} points", moves[0], losingPlay, losingPlay);
                        break;
                    // if we are to tie we get points for our play and for tieing
                    case "Y":
                        score += 3 + opponentMove;
                        // Console.WriteLine("Opponent played {0}, so you played {1} to tie getting {2} points", moves[0], moves[0], opponentMove + 3);
                        break;
                    // if we are to win we get points for our play and for winning
                    case "Z":
                        score += 6 + winningPlay;
                        // Console.WriteLine("Opponent played {0}, so you played {1} to win getting {2} points", moves[0], winningPlay, winningPlay + 6);
                        break;
                }
            }
            Console.WriteLine("Final score: {0}", score);
      }
    }
}
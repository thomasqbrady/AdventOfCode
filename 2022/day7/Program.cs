/** author: Thomas Q Brady
*** Advent of Code 2022 day 7
**/

namespace com.thomasqbrady
{
    class File {
        public string name = "";
        public int size = 0;

        public File(string name, int size) {
            this.name = name;
            this.size = size;
        }
    }

    class Directory {
        public string name = "";
        public List<File> files;
        public int size = 0;
        public IDictionary<string, Directory> directories;
        public Directory? parent = null;

        public Directory(string name, Directory? parent) {
            this.name = name;
            this.files = new List<File>();
            this.directories = new Dictionary<string, Directory>();
            this.parent = parent;
        }
    }

    class Day7
    {

        static void Main()
        {
            // PartOne();
            PartTwo();
        }

        static void createFileSystem(string[] lines, Directory root, Directory currentDirectory) {
            foreach (string line in lines) {
                if (line.Substring(0,2) == "$ ") {
                    switch (line.Substring(2,2)) {
                        case "cd":
                            // Console.WriteLine("changing directory from {0}", currentDirectory.name);
                            string newDirectoryName = line.Substring(5);
                            switch (newDirectoryName) {
                                case "/":
                                    currentDirectory = root;
                                    break;
                                case "..":
                                    currentDirectory = currentDirectory.parent is null ?  root : currentDirectory.parent;
                                    break;
                                default:
                                    currentDirectory = currentDirectory.directories[newDirectoryName];
                                    break;
                            }
                            // Console.WriteLine("changing directory to {0}", currentDirectory.name);
                            break;
                        case "ls":
                            // technically a no-op, but would not be the case if there were
                            // other commands with output
                            break;
                    }
                } else {
                    if (line.Substring(0,3) == "dir") {
                        string directoryName = line.Substring(4);
                        Directory newDirectory = new Directory(directoryName, currentDirectory);
                        currentDirectory.directories.Add(directoryName, newDirectory);
                        // Console.WriteLine("new directory {0} added to {1}", directoryName, newDirectory.parent!.name);
                    } else {
                        string[] parts = line.Split(" ");
                        int fileSize = int.Parse(parts[0]);
                        string fileName = parts[1];
                        File newFile = new File(fileName, fileSize);
                        currentDirectory.files.Add(newFile);
                        // Console.WriteLine("new file {0} added to {1}", fileName, currentDirectory.name);
                    }
                }
            }
        }

        static int calculateFileSizes(Directory directory) {
            int totalSize = 0;
            foreach (File file in directory.files) {
                totalSize += file.size;
            }
            foreach (var dirDict in directory.directories) {
                Directory dir = dirDict.Value;
                totalSize += calculateFileSizes(dir);
            }
            directory.size = totalSize;
            return totalSize;
        }

        static void findAllDirectoriesUnder(Directory startDir, int threshold, List<Directory> results) {
            foreach (var dirDict in startDir.directories) {
                Directory dir = dirDict.Value;
                // Console.WriteLine("does {0} have less than {1} at {2}?", dir.name, threshold.ToString(), dir.size);
                if (dir.size <= threshold) {
                    results.Add(dir);
                }
                findAllDirectoriesUnder(dir, threshold, results);
            }
        }

        static void PartOne()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            // Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            string[] lines = input.Split("\n");
            Directory root = new Directory("/", null);
            Directory currentDirectory = root;
            createFileSystem(lines, root, currentDirectory);
            calculateFileSizes(root);
            List<Directory> results = new List<Directory>();
            findAllDirectoriesUnder(root, 100000, results);
            int total = 0;
            foreach (var dir in results) {
                Console.WriteLine("directory {0} has {1}", dir.name, dir.size);
                total += dir.size;
            }
            Console.WriteLine("Total: {0}", total);
        }

        static void PartTwo()
        {
            // string input = System.IO.File.ReadAllText(@"test.txt");
            string input = System.IO.File.ReadAllText(@"input.txt");
            Console.WriteLine("Input:\n{0}", input);
            Console.WriteLine("===========");
            int totalDiskSpace = 70000000;
            int requiredSpace = 30000000;
            string[] lines = input.Split("\n");
            Directory root = new Directory("/", null);
            Directory currentDirectory = root;
            createFileSystem(lines, root, currentDirectory);
            calculateFileSizes(root);
            int availableSpace = totalDiskSpace - root.size;
            int needToFree = requiredSpace - availableSpace;
            Console.WriteLine("Need to free up {0}", needToFree);
            List<Directory> results = new List<Directory>();
            findAllDirectoriesUnder(root, requiredSpace, results);
            List<int> candidateDirectories = new List<int>();
            foreach (Directory dir in results) {
                if (availableSpace + dir.size > requiredSpace) {
                    Console.WriteLine("could delete {0} at {1}", dir.name, dir.size);
                    candidateDirectories.Add(dir.size);
                }
            }
            candidateDirectories.Sort();
            Console.WriteLine("first candidate in list: {0}", candidateDirectories[0]);
        }
    }
}
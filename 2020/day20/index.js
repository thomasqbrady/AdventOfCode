const utils = require('../utils.js');
const log = utils.log;

// let input = `Tile 2539:
// #.##......
// ##......#.
// #.#...#..#
// ###..#...#
// ....#.#.##
// #........#
// ..#..###.#
// #..#..#...
// .....#####
// ##.##..##.

// Tile 2909:
// ....##..#.
// #........#
// ....##....
// ..###..#..
// #..#......
// #...#..###
// .........#
// #...#...#.
// ....#.....
// .##..##.##

// Tile 1373:
// #..###.##.
// #......#.#
// ..#.....##
// ..##.#...#
// ........##
// ....#...#.
// ..........
// #..##.#.#.
// .....#...#
// ..##.#....

// Tile 2953:
// ######....
// ........#.
// ..#.......
// #.#.......
// ##........
// ##........
// ..#.....##
// #.#......#
// ##..#....#
// #.####.###

// Tile 2437:
// #..##..##.
// .....#...#
// #.#..##...
// .#......##
// #.....#..#
// #......#..
// ...#.#...#
// #...#....#
// #.........
// .##.....#.

// Tile 1823:
// ##.....###
// ##.#..#..#
// ....##....
// #.........
// ..#.....#.
// #..#......
// ..#.......
// ..#.#....#
// .....#..#.
// ####....#.

// Tile 3889:
// ..##...#.#
// #........#
// #.......##
// .......###
// ..........
// ....#..#..
// ..#...#..#
// .##...#..#
// ##.....#.#
// .######.#.

// Tile 2549:
// ..#.#.###.
// ..........
// .........#
// #........#
// #.........
// #..#....##
// ..........
// #.....#...
// #.#...####
// #...#####.

// Tile 3797:
// #.#.#..#..
// #........#
// .#.##.....
// #........#
// #........#
// #.........
// #.#...##..
// #..#.....#
// #.#.##....
// .#######..

// Tile 1249:
// .##..##...
// .....#....
// #....#...#
// ..#......#
// ###..#...#
// ...#....#.
// #.....#..#
// .#.#......
// #.#.##.#.#
// #.#.##..#.

// Tile 3821:
// .####.##.#
// .........#
// #...##...#
// .##.#...##
// ##..#.##..
// .....#.#.#
// ..#...#.##
// #.......##
// ...#.....#
// ....#.###.

// Tile 3329:
// ##.##.###.
// ......#...
// ...#....##
// ....#....#
// #.........
// ..#...#...
// ....#.....
// ..#......#
// ..........
// ...#.##..#

// Tile 1279:
// ##...#....
// #.#.#...##
// .#..#...#.
// .#....#.#.
// .##......#
// .........#
// ##......##
// ..........
// .#........
// ..#..##...

// Tile 3907:
// .#....##.#
// #.#...###.
// ##.....###
// ##......#.
// ..####....
// .#...#....
// #....#..#.
// #.#.......
// .#......#.
// ##....###.

// Tile 3833:
// ....#.###.
// .......#.#
// ...#...#..
// #.#.......
// ..#.....##
// #.........
// .....#.#..
// #.....#...
// ..#..#....
// .#####....

// Tile 2011:
// .#...#...#
// #.#.......
// #..#....##
// .....#....
// .......#..
// .#.......#
// ......#.#.
// #.##...###
// ##..#..###
// ###..#.###

// Tile 3881:
// ###..#...#
// #..#.....#
// ##..#...##
// .....#.##.
// .........#
// .#.......#
// ....#..#.#
// ..#.....##
// ##......##
// ...#..#.#.

// Tile 2341:
// .....##.#.
// #....#..#.
// ....#.#...
// #.....#...
// .....#....
// #.......#.
// .........#
// ##....#..#
// .........#
// ##.#..###.

// Tile 2917:
// ###.##....
// ##.......#
// #........#
// #......#..
// #.........
// ........##
// .........#
// ....#....#
// #.##...#..
// ..#######.

// Tile 2333:
// #####.....
// .....#...#
// ....##...#
// ..........
// ...#...#.#
// ....##....
// ....#.....
// .......#..
// ###....#.#
// ..##.#..#.

// Tile 2287:
// .#..#.#.#.
// ##...#....
// ....#.....
// .......#..
// .....#...#
// #....#.###
// .........#
// #.##..###.
// #......#.#
// .##.#.#.##

// Tile 3391:
// #..#.#..#.
// ......#...
// #......#..
// #.#.#....#
// ....#....#
// #..#....##
// ....#....#
// ..#.....##
// #........#
// .###.#..##

// Tile 2677:
// #..#.#....
// ..#...#..#
// #...##...#
// ##.......#
// .........#
// ..........
// #...##.###
// #....#....
// ..##..#.#.
// ...#...##.

// Tile 2273:
// .###.####.
// ##.##...##
// .....###.#
// #..#..#..#
// .##......#
// #.#..#...#
// #........#
// #.........
// ........##
// ####.#....

// Tile 3967:
// ....#..##.
// ..#......#
// #....##...
// #.....#.##
// ...#...#.#
// #.#.#..##.
// #.......#.
// #.......##
// ...##.#..#
// ...#.#..##

// Tile 1553:
// .###.#..#.
// ##...#....
// .....#...#
// ......#.##
// .........#
// ..........
// #..##.#..#
// #...#.....
// #.........
// ..#..##..#

// Tile 1291:
// .#.......#
// ..#......#
// ......#..#
// ##.#..#..#
// ##........
// ..........
// .........#
// ......#.#.
// ##....#.##
// ##...#.#.#

// Tile 2003:
// ..####.##.
// ##.##....#
// #......##.
// .........#
// ..........
// ...#.##..#
// #.#.....#.
// ..#.#....#
// #..#.....#
// ..##..##.#

// Tile 2267:
// ..#...#...
// ...#....#.
// #..#..#...
// #...#.....
// ...#.....#
// .#........
// #.#...#..#
// ...#..#...
// #.#......#
// .####.#...

// Tile 1237:
// #.#....##.
// .......#.#
// .....#....
// ...#.##...
// ....#.....
// #.#.#....#
// #..#......
// ##........
// #.........
// #.#.##..#.

// Tile 3187:
// #.####..##
// .....#....
// #..#......
// .#.#......
// ..##....##
// ..#......#
// ...#.#....
// #........#
// .....##.#.
// .###.#.##.

// Tile 2393:
// #.#.###.##
// #.........
// #..#.#...#
// #.#.......
// #.#....#.#
// #.#...#...
// ...#.....#
// #.#....#.#
// #...#....#
// ..#.###...

// Tile 3413:
// .##...#...
// #.....#...
// #.........
// #..#..#..#
// #....#.#..
// ##..#.....
// #.....####
// #........#
// ....##....
// ###.###.##

// Tile 3083:
// #####.####
// #..##.....
// ..........
// ........#.
// .#.......#
// .........#
// #...#.#..#
// #....##.#.
// ##..#.##.#
// ....####.#

// Tile 1523:
// ###..##..#
// .#.#..#..#
// ....#...##
// .....#....
// #..#.....#
// #....#...#
// ........##
// ..........
// ##.....#..
// #.#..##..#

// Tile 3673:
// #.####.###
// #........#
// .#...#..#.
// .........#
// ##.....#..
// ..........
// #.........
// ......#..#
// ##.#.....#
// .#..##..##

// Tile 2111:
// #.#.#.####
// ......#.#.
// ..#......#
// ........##
// #.....##..
// .........#
// #..#......
// ........#.
// #........#
// ..#..#.#..

// Tile 1153:
// .#.#..#..#
// #.....##..
// ...#.....#
// ...#.....#
// #..#.....#
// ##.#......
// #.####....
// #........#
// #.........
// ..#.....#.

// Tile 3457:
// ..#......#
// #.##...#..
// #.........
// ...#...##.
// ....#.....
// .#........
// #........#
// ......##.#
// ..........
// #.#.....#.

// Tile 2693:
// .####.....
// #........#
// ..#....#..
// .......###
// ..#...#...
// .....##...
// #.#.#....#
// #.#.......
// ##.##.#..#
// .####.#..#

// Tile 1367:
// ##...##.#.
// .......#..
// ...#..#...
// #....#....
// ##........
// ##....##.#
// #......#.#
// #...#.##.#
// #...#.#..#
// .##.....##

// Tile 2543:
// #..###.#.#
// #....###.#
// ##......#.
// ...#.....#
// #....#..##
// ......#..#
// #..#.#.#..
// ...#....#.
// ....##.###
// #...######

// Tile 1229:
// #.#....##.
// #...#...##
// .##.......
// #...#..#.#
// #.#.#..#..
// #..#..#..#
// ##....#...
// #...#...##
// #.#.......
// ##.#.#..#.

// Tile 2833:
// .#...#..#.
// ........#.
// #.#..#....
// ...##..#.#
// #....#....
// ........##
// .........#
// .........#
// #........#
// .###.#.#.#

// Tile 2089:
// .####.###.
// ..###....#
// #....#.#..
// ##........
// ..#......#
// ###...#..#
// ###...#.##
// ......#...
// #.........
// .###...##.

// Tile 3209:
// .######..#
// .#......#.
// #.#.#.....
// ##.....#.#
// #......###
// ##...##...
// ......#...
// #.#.......
// #..#....#.
// ...#...###

// Tile 1979:
// #...###.##
// #.......##
// #.#.#....#
// ....#.....
// ...#.#..##
// #.##...#..
// ##.#.....#
// #...#.....
// .....#....
// ....##..#.

// Tile 3779:
// ##.##..#..
// ..#......#
// #.#.....#.
// .#........
// #...##..##
// ##.....#..
// ...#.#....
// ##........
// #..#...#..
// .###.##.##

// Tile 3089:
// ##.#.##..#
// #..#......
// ..#......#
// ...#....#.
// #.#.......
// ..........
// #.....#...
// #........#
// #......#.#
// .####.##.#

// Tile 1627:
// #..#....#.
// .#.####.#.
// #...#.....
// ...##.#.##
// ....#...#.
// ...#.##.##
// .......#.#
// #..#..#..#
// #.....##.#
// #...##.#.#

// Tile 2389:
// .##...#.#.
// #..#..#...
// #.........
// .........#
// .....#....
// ....#...#.
// .#.#...#.#
// ....###..#
// #....##.#.
// ####..#.##

// Tile 1193:
// .#.##.####
// .#......##
// #...##...#
// ..##..#.#.
// ..........
// .....##.##
// #......#..
// ...#.##...
// ....#..##.
// ##.#######

// Tile 3323:
// #..#...###
// ........#.
// ##.....#.#
// #....#...#
// ....#.....
// #...#..#..
// #.........
// .#.....#.#
// ..#......#
// #..#.#....

// Tile 2719:
// ####......
// ..#.....#.
// .#....#...
// #...#..#..
// #.........
// #......#..
// #..#....##
// .....#....
// #.##...##.
// #.#.#..#.#

// Tile 2399:
// #..##.####
// .........#
// #.........
// ...#...##.
// .........#
// #...#....#
// ..........
// ........##
// ..........
// .#.#...#..

// Tile 1543:
// ##..#.####
// ....#....#
// ....######
// #..####.##
// ...##..#..
// #..#.#...#
// #.#.......
// ...#....#.
// ##..###.#.
// #.##.....#

// Tile 1723:
// .#.##..#..
// ...#....#.
// ...#......
// ##....#.##
// .#....##..
// #.#......#
// ##.##....#
// .....#...#
// ..#.......
// #..#.##..#

// Tile 2503:
// ..###...##
// ..........
// #..#.##..#
// ...#.#...#
// ...###..##
// .....#....
// #.....#..#
// .#.#.#.##.
// #......#.#
// ..####..##

// Tile 2887:
// ......##.#
// ##........
// .#........
// #.......##
// #.##...##.
// #...#...##
// ##.....##.
// ....#.....
// ........##
// #.######..

// Tile 3467:
// #..#..#.#.
// ....###...
// ....##...#
// ....#.#...
// ..........
// ........#.
// ......#.#.
// #.#...#..#
// #........#
// #.##.##.##

// Tile 3677:
// ....##...#
// #.##..#...
// .#....##..
// .#.#......
// #.##..#...
// ....#.....
// ......#.#.
// #..###..#.
// #.#....#..
// .####.##..

// Tile 1493:
// .##.#...##
// #.##...##.
// .#...#####
// #..#....#.
// #.#......#
// .........#
// ##......#.
// #......#.#
// #....#.#.#
// #.#...#..#

// Tile 2687:
// .##.##..##
// .......#.#
// #........#
// ##...##..#
// ...#....##
// .....#.#..
// #.##.#.#.#
// #.........
// #....#...#
// ###.....##

// Tile 1861:
// ####..##..
// ...#..#...
// .......#.#
// #.........
// #.........
// #........#
// ...#.....#
// #.#......#
// #.#..##.#.
// .#..#..#.#

// Tile 2081:
// #..#####.#
// ...#.....#
// .#......#.
// #........#
// .......#.#
// #....####.
// #....###.#
// .#....####
// ....#.....
// .##.##...#

// Tile 2113:
// #..#..##..
// .#.....##.
// .....#.#.#
// #........#
// .......#.#
// ...##.##..
// ......##..
// #....#.#.#
// #.....#..#
// #...#..#.#

// Tile 2203:
// .#.##..#.#
// ....###..#
// .#.#....##
// #...#.....
// ##.#...#.#
// ..#..#..#.
// #..#......
// #......#..
// #...###...
// .#...##.#.

// Tile 3943:
// #....###..
// #.....##.#
// #....#...#
// #..#....##
// ###..#...#
// .#.#.#...#
// .......##.
// #....##..#
// .#.......#
// .#..#.#.##

// Tile 2579:
// .#...###..
// #.........
// #........#
// .......#.#
// ##.#......
// ....#....#
// #.......#.
// .#...#....
// .....#...#
// ..#.##..##

// Tile 1103:
// .#.##.###.
// #......#.#
// ....#....#
// ....#.#...
// #......#.#
// ..........
// ..........
// #...#....#
// #........#
// ....#####.

// Tile 1993:
// .##..#....
// ....#.#..#
// ##...#....
// .........#
// #...#....#
// ..........
// ..#..#.#..
// .....##...
// .##...##.#
// ..##.##...

// Tile 1801:
// #..##.####
// #.......##
// #......#.#
// #.#....#.#
// #.##....#.
// .#..#.###.
// ...#......
// #.....##.#
// .#.......#
// ##.###..##

// Tile 3319:
// .###.##.#.
// ##......#.
// .#........
// #.#......#
// #..#...#.#
// #.#......#
// .#.......#
// #........#
// #......#..
// ....###..#

// Tile 3229:
// ###...###.
// #....##..#
// ....#...##
// ...#......
// ..#.#....#
// .......#.#
// ......#.#.
// .##..#.#.#
// ...#..###.
// ##...#.#..

// Tile 1033:
// #..#.##.##
// ....##....
// #.......#.
// #......#.#
// #........#
// ##.......#
// #..##..#.#
// .......###
// #.........
// .##.#.#..#

// Tile 3769:
// ###...#.##
// ........#.
// #.........
// #........#
// ..#.#.####
// #...#...##
// .#.#.....#
// ..........
// #........#
// #.##.#...#

// Tile 1571:
// .####.....
// #......#.#
// #.#.#.#.#.
// .........#
// ##.......#
// .......#.#
// ..#.....#.
// #.........
// #..#....#.
// ######...#

// Tile 1657:
// ...#.#.##.
// ........##
// #.........
// #.#..#....
// #..#.#.#.#
// ...#.###..
// ....#.....
// ...#.....#
// #.....##.#
// #####.#.##

// Tile 3541:
// .####.####
// ..........
// #......##.
// #......#..
// #........#
// #.....#..#
// ........#.
// ##.....#.#
// .......#..
// #.#.###.##

// Tile 3019:
// ...##..##.
// #..##...#.
// #....##...
// #........#
// #..#.#...#
// #..#.....#
// .#........
// #.#..#...#
// ...#.....#
// .#......##

// Tile 2383:
// .#.#....##
// #....#....
// ......#..#
// #.....#..#
// #.##.#..#.
// #..#....##
// .....#...#
// ....#...#.
// #.....#.#.
// .#.#.#.###

// Tile 3929:
// ...#.###.#
// #.#..#....
// .........#
// ..#......#
// .#......##
// #.....#.##
// #...#...##
// #.##......
// #.....##..
// #...##....

// Tile 1697:
// ##.##.....
// ...#.....#
// #..#.....#
// .........#
// ...#...##.
// .#..#...##
// ...###...#
// #..#..#...
// .#.#..#...
// ..#...#...

// Tile 1999:
// ..##....#.
// .........#
// ...#.#...#
// #.........
// ..#.#.#...
// #......#.#
// .#.##...#.
// #....#...#
// #....#.#.#
// #.#..##...

// Tile 1289:
// #..###....
// ...#......
// ....#.....
// #.....##.#
// #.##....#.
// ...#.#..##
// #.#...#...
// ..........
// ..#......#
// ####..###.

// Tile 1163:
// .###.#..#.
// #..#....#.
// #...#...##
// ...#.....#
// #.....#...
// .........#
// ..........
// ###.......
// #........#
// ###...####

// Tile 3121:
// ##....#...
// #..#.#.#.#
// .#....#...
// ..#......#
// #....#.#..
// .##......#
// ......#.##
// ....#.#...
// ...#......
// #...#...#.

// Tile 2939:
// ..##.#.###
// #....##..#
// ....#..###
// ###....#..
// #..###..#.
// ..##.....#
// #..#....##
// ..#.#.....
// #......#..
// .#.#.#..##

// Tile 1129:
// ....#..#.#
// #........#
// ...#.#....
// ...#...#.#
// #........#
// ..........
// ..#...####
// ...#.#....
// #....#..##
// ##.#.##..#

// Tile 1877:
// ..##..#...
// #.#...#...
// ..#...##.#
// #......#..
// ......#.##
// .##....#.#
// ....#..#..
// ......#...
// #..#..#..#
// #..#..##..

// Tile 3061:
// ..#.#.....
// .#........
// ..........
// #...#.#...
// ..#......#
// ........##
// #......#..
// #..#.....#
// #.#....#..
// .####.#.##

// Tile 2851:
// .#####..##
// ..##...###
// #......#..
// .#..#....#
// .....###..
// .........#
// .......###
// .....#.###
// #......#..
// .##.##..##

// Tile 1409:
// ##.##..###
// #.........
// #...###..#
// .........#
// ........##
// #.#.#...#.
// .#...#.##.
// ....#..#..
// #..#...#.#
// #.###.....

// Tile 3853:
// ...###.#.#
// ##.#......
// .....##.#.
// .#.......#
// ....#....#
// #.#.#..#.#
// ....##....
// ........##
// #.#.......
// .#.#.##.##

// Tile 2803:
// .#...####.
// #..##...#.
// #.#..#....
// .....#...#
// .........#
// #....##...
// #........#
// ##....#...
// #..#..#..#
// ..#.#...##

// Tile 1709:
// ....#.....
// .........#
// .........#
// ....#....#
// ..##.#....
// ....#.....
// #.#.......
// #.......##
// #...#....#
// .#.....#.#

// Tile 2351:
// ..#.#.#...
// ##.......#
// ....#.#...
// ......#..#
// ..........
// .......#.#
// ##........
// #.......#.
// .....#..#.
// .#...##..#

// Tile 2347:
// ###..#..##
// ###......#
// #..##.#.##
// #...#...#.
// #.........
// .....#.###
// ...#....##
// #......#..
// #.#.##...#
// .###..#...

// Tile 1307:
// ##..#####.
// .#....#..#
// ..........
// #...#..#..
// .....#....
// #.##.#...#
// ###..##.#.
// .##.#..#.#
// #.#.#.....
// ..######.#

// Tile 1901:
// ######..#.
// ##.#.....#
// #....#.#.#
// ........#.
// ....#....#
// #.......##
// #........#
// .......#.#
// .#..##...#
// .#.#.#####

// Tile 2029:
// #...##.##.
// #........#
// ##....##.#
// #.#..#....
// .##..#....
// .#....#...
// .##......#
// ..........
// ##..#.....
// #.......##

// Tile 3571:
// ##...#.#.#
// ##....#..#
// ....#.#...
// ..#......#
// #......#.#
// ..#....###
// ..........
// #.#......#
// .##.....##
// .##.#...##

// Tile 1399:
// ...###...#
// ......#..#
// ##...#.#.#
// #........#
// #.#.#.#..#
// ....####..
// #.....#..#
// .....#.#.#
// #......#.#
// #...#..#.#

// Tile 1381:
// #..#....#.
// #....#...#
// ......##..
// #....#...#
// ..#.#...#.
// ##..#....#
// #....#...#
// .....#....
// #.......##
// #####..#.#

// Tile 1549:
// ##...####.
// ........#.
// ........#.
// ..#...##.#
// .........#
// #.#.#.#..#
// .#.....#.#
// .....##.#.
// ##.......#
// ..#.##....

// Tile 3623:
// ..#....###
// ...#...#..
// .......#..
// .##......#
// ..#..##...
// .........#
// #...#.....
// ..#......#
// ..#......#
// ..##..###.

// Tile 2143:
// #.#..#.#..
// #...#...#.
// #......#..
// .#..#...##
// #.....#.##
// ......##.#
// ..#.#...#.
// ..........
// #...#....#
// #....#..##

// Tile 3631:
// #######...
// #.......##
// ..........
// .....##..#
// ........##
// #..#.#....
// .......#.#
// ........#.
// #.......#.
// ..####..##

// Tile 3359:
// #..#...#..
// ...#......
// ...#.#.#.#
// .......#..
// ...#.#....
// ##.....#.#
// #.........
// #..#......
// #........#
// #.....#.##

// Tile 2239:
// ......#.#.
// ###.#.....
// .#....#...
// ..##......
// ##.####..#
// ..........
// ..#...#..#
// #..##....#
// ##...#....
// ##.#.#...#

// Tile 1741:
// ....###.##
// ##...#...#
// ....##...#
// #.......##
// #.#.......
// ...###...#
// #.......#.
// .##....#..
// #.........
// ..###.####

// Tile 1597:
// ..#..###..
// #...##.###
// #.#..#....
// #.#...#..#
// #....#...#
// #.......##
// ......#..#
// ##...##...
// #.####....
// ..#.#....#

// Tile 3761:
// #.###.####
// ..#.#.#..#
// ....#.##.#
// .###....#.
// #......#.#
// #......#..
// #.#......#
// ##.......#
// #.#.......
// .#..#.#.#.

// Tile 3203:
// #......#.#
// #.....#...
// #.#.#..#..
// ......#...
// #..##.....
// ##...#...#
// .....#...#
// ..#...#..#
// #.........
// .#.#..###.

// Tile 1579:
// ###.#.....
// .#.###..#.
// .....###.#
// #...#.##.#
// ...#..#...
// ...#.....#
// ...#.....#
// #.......##
// ..#.#..#..
// ###.....#.

// Tile 3617:
// #......#..
// #.....#...
// .....#.##.
// #....#.#.#
// ...#..#..#
// ......#.#.
// #..##....#
// ##....#...
// .#...#....
// #.....##.#

// Tile 1667:
// #.....#.##
// ##....#..#
// ..........
// ##........
// .#..#.....
// #........#
// ...#.#.#.#
// #.........
// .#........
// ..#.#.###.

// Tile 2153:
// ....##.##.
// ........#.
// .#..#.....
// ....###..#
// ..##...#..
// .#.....###
// .#...###..
// #.#..#.##.
// ..##....##
// ####.#....

// Tile 1721:
// .###..##..
// #.#....#.#
// .....##..#
// #.........
// ##...#...#
// #......#.#
// .#......##
// #........#
// ...#...###
// ####..#...

// Tile 3539:
// #.##.#.#.#
// .........#
// #..#.....#
// .....#....
// ..#.......
// ##.#....##
// ..#.##...#
// ........##
// #....#....
// #.#..#.#.#

// Tile 3313:
// ...#..####
// .......#.#
// #........#
// .....#.#..
// #..#..##..
// #...#.....
// #..#...#.#
// ...#......
// ##....#.#.
// .#.###..#.

// Tile 3851:
// ...#..##..
// #......#.#
// ...#..##..
// #........#
// #....#...#
// #.....#..#
// #...##.##.
// ##.......#
// .#.##..##.
// ..###..#..

// Tile 3389:
// .####.##..
// .#...#..##
// ..........
// .#......##
// .##.......
// ###......#
// ...#.#...#
// .....#...#
// #.#....#.#
// ..####.#.#

// Tile 1933:
// ..###.#..#
// ..#......#
// #.#....#.#
// #..#......
// ##...#....
// .....#....
// ....#..#.#
// .#..##...#
// #......#..
// ......#.#.

// Tile 1361:
// #..##...##
// ..........
// .........#
// #.#......#
// #........#
// ..##..#..#
// ..#..#..##
// .....#....
// ....#....#
// #.#.###.#.

// Tile 2789:
// .##.##.###
// #....#.#.#
// .....#.#..
// ..........
// ...#.#...#
// .........#
// ....#.....
// ......##..
// #......#..
// #.###.####

// Tile 3637:
// .##.##....
// ###...#...
// ###...#.#.
// ..........
// ###......#
// #.......##
// ##.....###
// ....###..#
// #.......#.
// ...##..#.#

// Tile 2411:
// .##.#.###.
// ......#.#.
// #...#..###
// ##.#....##
// #.........
// ..####....
// #..#.#...#
// ..........
// #...#..#.#
// #.##...##.

// Tile 1487:
// ...#.#...#
// .#..##...#
// #....#....
// ###.###..#
// ..##..#..#
// #..#......
// ##...##...
// ..#..#....
// .....#.#..
// .....##.##

// Tile 1061:
// .#####..#.
// #.......#.
// ...#......
// ....#...#.
// ....#.#...
// #.###...#.
// ....##...#
// ###.....#.
// ...##...#.
// #....#.#..

// Tile 1669:
// ##...##..#
// #........#
// .#.#......
// .###.##...
// #...#.....
// ..#.....##
// #...#..#.#
// #.##....#.
// #........#
// ##.#.#.##.

// Tile 1123:
// ...###...#
// ....#.....
// #...#....#
// ...#.....#
// #.........
// #....#..#.
// .........#
// .#....##.#
// ......##.#
// #.#..#.#..

// Tile 2767:
// ..###.####
// #...##....
// .........#
// .........#
// #....##...
// #.#.......
// .........#
// .#........
// #........#
// #...#...##

// Tile 1931:
// ##..###...
// ##..##..##
// ..##..##..
// .#...#....
// ...#......
// #...##....
// .#.......#
// ...#.....#
// ....#.....
// .#.#.###.#

// Tile 2731:
// ...#.#..##
// ..........
// ..#......#
// ##....#..#
// ..#..#.#.#
// ..........
// #.....#...
// .##.##.#..
// #....##...
// .###..#.#.

// Tile 2689:
// ###.#..###
// .......###
// .#....#..#
// ......##.#
// ##...#...#
// ........##
// #...#...##
// .........#
// ....##....
// ....##.#.#

// Tile 2897:
// #.........
// #.#...#...
// ##.#......
// ....#.##.#
// #........#
// #.......#.
// .#....#...
// .....#...#
// .....#..##
// ..#.####.#

// Tile 3931:
// #.#..##.#.
// #......#..
// #...###.#.
// .##.##....
// #...###..#
// #...###...
// .....#.#.#
// #......##.
// .........#
// #.#######.

// Tile 1783:
// #......###
// .........#
// ##....#..#
// .#..#.#.##
// ........#.
// #..#......
// ..........
// ..........
// ##...#...#
// ...##.#.##

// Tile 2293:
// ##...#...#
// ..###.....
// .........#
// .........#
// ..#..#....
// .....#...#
// #....##.#.
// #.........
// ...#.....#
// .###..#.##

// Tile 3709:
// #####.###.
// .###......
// #..#....#.
// #........#
// ##..#.#..#
// .#.......#
// .....#...#
// ........#.
// ####..##..
// .#..##.###

// Tile 2357:
// .#..###..#
// ##..#....#
// .....#..##
// #...#.....
// ..........
// ##...#...#
// .#....#..#
// ##.#....##
// ....#.#...
// #.##.#...#

// Tile 3331:
// #.#..#.###
// #...##.###
// ....#.#...
// ..#..#...#
// .#.##..#.#
// #.....#.#.
// ..#....#..
// #.#.##.#..
// #...###...
// ##..####.#

// Tile 1297:
// ..####.###
// #..#....#.
// #....#...#
// #.........
// ###.#....#
// ....#..#..
// .##.......
// .........#
// #..#......
// #...#.....
// `;

let input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

class Tile {
	constructor(input) {
		let parts = input.split(':\n');
		this.id = parts[0].split(' ')[1];
		this.rows = parts[1].split('\n');
		this.connections = {
			top: '',
			bottom: '',
			left: '',
			right: ''
		}
		this.matched = false;
	}

	rotate(direction) {
		log(`rotating ${ this.id } which has ${ (this.matched) ? '' : 'not '} matched`);
		// log('before', this.rows);
		let newRows = [];
		let length = this.rows.length;
		if (direction == 'r') {
			for (let newRowIndex = 0;newRowIndex < length;newRowIndex++) {
				let newRow = '';
				for (let oldRowIndex = length - 1;oldRowIndex >=0;oldRowIndex--) {
					// log(`${ newRowIndex } ${ oldRowIndex}`);
					newRow += this.rows[oldRowIndex].substr(newRowIndex,1);
				}
				newRows.push(newRow);
			}
		} else {
			for (let newRowIndex = length - 1;newRowIndex >= 0;newRowIndex--) {
				let newRow = '';
				for (let oldRowIndex = 0;oldRowIndex < length;oldRowIndex++) {
					// log(`${ newRowIndex } ${ oldRowIndex}`);
					newRow += this.rows[oldRowIndex].substr(newRowIndex,1);
				}
				newRows.push(newRow);
			}
		}
		this.rows = newRows;
		// log('after', this.rows);
	}

	flip(direction) {
		if (direction == 'h') {
			// log('before', this.rows);
			let newRows = [];
			this.rows.forEach((row) => {
				newRows.push(row.split('').reverse().join(''));
			});
			this.rows = newRows;
			// log('after', this.rows);
		} else {
			// log('before', this.rows);
			this.rows = this.rows.reverse();
			// log('after', this.rows);
		}
	}

	edges() {
		let length = this.rows.length;
		let edges = {
			top: this.rows[0],
			bottom: this.rows[length - 1],
			left: '',
			right: ''
		}
		this.rows.forEach((row) => {
			edges.left += row[0];
			edges.right += row[length-1];
		});
		return edges;
	}
}

let tileInput = input.split('\n\n');

let tiles = [];

tileInput.forEach((tileString) => {
	tiles.push(new Tile(tileString));
});

function match(tile1, tile2) {
	let matchFound = false;
	let edgeNames = ['top', 'bottom', 'left', 'right'];
	edgeNames.forEach((tile1EdgeName) => {
		let tile1Edge = tile1.edges()[tile1EdgeName];
		edgeNames.forEach((tile2EdgeName) => {
			let tile2Edge = tile2.edges()[tile2EdgeName];
			if (tile1Edge == tile2Edge) {
				if (tile1EdgeName == 'left') {
					if (tile2EdgeName == 'top') {
						tile2.rotate('r');
					}
					if (tile2EdgeName == 'bottom') {
						tile2.rotate('l');
						tile2.flip('v');
					}
					if (tile2EdgeName == 'left') {
						tile2.flip('h');
					}
					tile2EdgeName = 'right';
				}

				if (tile1EdgeName == 'right') {
					if (tile2EdgeName == 'top') {
						tile2.rotate('l');
						tile2.flip('v');
					}
					if (tile2EdgeName == 'bottom') {
						tile2.rotate('r');
					}
					if (tile2EdgeName == 'right') {
						tile2.flip('h');
					}
					tile2EdgeName = 'left';
				}

				if (tile1EdgeName == 'top') {
					if (tile2EdgeName == 'top') {
						tile2.flip('v');
					}
					if (tile2EdgeName == 'right') {
						tile2.rotate('l');
						tile2.flip('v');
					}
					if (tile2EdgeName == 'left') {
						tile2.rotate('l');
					}
					tile2EdgeName = 'bottom';
				}

				if (tile1EdgeName == 'bottom') {
					if (tile2EdgeName == 'right') {
						tile2.rotate('l');
					}
					if (tile2EdgeName == 'bottom') {
						tile2.flip('v');
					}
					if (tile2EdgeName == 'left') {
						tile2.rotate('l');
						tile2.flip('v');
					}
					tile2EdgeName = 'top';
				}

				tile1.connections[tile1EdgeName] = tile2.id;
				tile2.connections[tile2EdgeName] = tile1.id;
				// log(`MATCH! ${ tile1.id } ${ tile1EdgeName } : ${ tile2.id } ${ tile2EdgeName }`);
				matchFound = true;
				tile1.matched = true;
				tile2.matched = true;
				return;
			}
		});
	});
	return matchFound;
}

function checkRotations(tile1, tile2) {
	let doTheyMatch = match(tile1, tile2);
	return (doTheyMatch);
	if (!doTheyMatch && !tile2.matched) {
		let rotatedMatchFound = false;
		for (let i = 0;i < 4;i++) {
			tile2.rotate('r');
			rotatedMatchFound = match(tile1, tile2);
			// log(rotatedMatchFound);
			if (rotatedMatchFound) {
				return;
			}
		}
		if (rotatedMatchFound) {
			return true;
		}
		tile2.flip('h');
		for (let i = 0;i < 4;i++) {
			tile2.rotate('r');
			rotatedMatchFound = match(tile1, tile2);
			// log(rotatedMatchFound);
			if (rotatedMatchFound) {
				return;
			}
		}
		return rotatedMatchFound;
	}
}

function findMatches(startPieces, tiles) {
	let matches = [...startPieces];
	startPieces.forEach((tile1) => {
		tiles.forEach((tile2) => {
			if (tile1 != tile2) {
				// log(tiles);
				let matched = checkRotations(tile1, tile2);
				if (matched) {
					if (matches.indexOf(tile2) == -1) {
						matches.push(tile2);
					}
				}
			}
		});
	});
	return matches;
	// tiles.forEach((tile) => {
	// 	log(tile.id,tile.connections);
	// });
}

function oldfindMatches(tiles) {
	tiles.forEach((tile1) => {
		tiles.forEach((tile2) => {
			if (tile1 != tile2) {
				// log(tiles);
				log(checkRotations(tile1, tile2));
			}
		});
	});
	// tiles.forEach((tile) => {
	// 	log(tile.id,tile.connections);
	// });
}

/*
2729 1427
1951 2311
*/

let round = findMatches([tiles[0]], tiles);
// log(round);
// log(round.length, '---')
round = findMatches(round, tiles);
round = findMatches(round, tiles);
round = findMatches(round, tiles);
round = findMatches(round, tiles);
// log(round);
// log(round.length, '---')
// round = findMatches(round, tiles);
// log(round);
// log(round.length, '---')

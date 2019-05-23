// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.time('time');

  class Roomba {
    constructor(x, y, width, length, dirtPatches) {
      // Subtract one to account for space occupied by the Roomba itself.
      this.width = Number(width) > 0 ? Number(width) -1 : 0;
      this.length = Number(length) > 0 ? Number(length) -1 : 0;
      // If start position is invalid, default to the nearest valid position.
      this.x = Number(x) <= this.width ? Number(x) : this.width;
      this.y = Number(y) <= this.length ? Number(y) : this.length;
      
      this.dirtPathces = dirtPatches;
      this.counter = 0;

      // Logger in case we want to track which patches of dirt were cleaned up.
      // Not relevant to functionality or program output!
      this.coordinatesOfCleanedPatches = [];
    }

    iterate(directions) {
      this.move(directions);
      this.checkIfCurrentlyOnDirtPatch(this.x, this.y);
    }

    // checkIfCurrentlyOnDirtPatch(x, y) and removeDirt(x, y), could be merged into one function, given
    // our assumtion that the vaccum is always turned on. Code-readability is better this way.
    checkIfCurrentlyOnDirtPatch(x, y) {
      if (this.dirtPathces[x] && this.dirtPathces[x][y] === true) {
        this.removeDirt(x, y);
        this.counter++;
      }
    }

    removeDirt(x, y) {
      delete this.dirtPathces[x][y];
      this.coordinatesOfCleanedPatches.push(`${x} ${y}`);
    }

    move(direction) {
      switch(direction) {
        case 'N':
          if(this.y >= this.length) break;
          else this.y++
          break;
        case 'S':
          if(this.y <= 0) break;
          else this.y--;
          break;
        case 'E':
          if(this.x >= this.width) break;
          else this.x++;
          break;
        case 'W':
          if(this.x <= 0) break;
          else this.x--;
          break;
        default:
          break;
      }
    }

  }

  // Get input data from text file. Declare and assign variables to appropriate pieces of data.
  // Assertions: 
  //    1. Lines are seperated by line-breaks ('\n').
  //    2. Last non-empty string preceeded by a line-break is assumed to be directions input (no input validation).
  //    3. First non-empty string preceeded by a line-break is assumed to be the room dimensions.
  //    4. Second non-empty string preceeded by a line-break is assumed to be the starting position.
  data = data.split('\n').filter(str => str.length > 0);
  const directions = data.pop().split('');
  const [dimensions, startPosition, ...dirtPatches] = data.map(val => val.split(' '))

  // Create a two-dimensional object that containins the locations of dirt patches.
  // Time complexity is constant. Space complexity is a linear to number of dirt patches.
  const dirtPatchesObject = { }
  for (let el of dirtPatches) {
    if (!dirtPatchesObject[el[0]]) dirtPatchesObject[el[0]] = {};
    dirtPatchesObject[el[0]][el[1]] = true;
  }

  const vaccum = new Roomba(...startPosition, ...dimensions, dirtPatchesObject)

  directions.forEach(move => vaccum.iterate(move));

  console.log(`${vaccum.x} ${vaccum.y}`);
  console.log(`${vaccum.counter}`);

  console.timeEnd('time');
});
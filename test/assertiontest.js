var colors = require('colors');

const input1 = ['1 3', '1'];
const input2 = ['29 29', '5'];
const input3 = ['0 0', '0'];

var fs = require('fs');
const [,,filename1, filename2, filename3] = process.argv;

fs.readFile(filename1, 'utf8', function(err, data) {
  if (err) throw err;
  const assertion = 'It should remove patches and count them only once: ';
  data = data.split('\n').filter(str => str.length > 0);
  data.pop();
  data[0] == input1[0] && data[1] == input1[1] ? console.log(assertion.yellow + 'true'.green) : console.log(assertion.yellow + 'false'.red);
})

fs.readFile(filename2, 'utf8', function(err, data) {
  if (err) throw err;
  const assertion = 'It should stay in place if direction is invalid: ';
  data = data.split('\n').filter(str => str.length > 0);
  data.pop();
  data[0] == input2[0] && data[1] == input2[1] ? console.log(assertion.yellow + 'true'.green) : console.log(assertion.yellow + 'false'.red);
})

fs.readFile(filename3, 'utf8', function(err, data) {
  if (err) throw err;
  const assertion = 'It should default to nearest valid square if starting point is invalid: ';
  data = data.split('\n').filter(str => str.length > 0);
  data.pop();
  data[0] == input3[0] && data[1] == input3[1] ? console.log(assertion.yellow + 'true'.green) : console.log(assertion.yellow + 'false'.red);
})


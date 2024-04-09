const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

const file = process.argv[2];
if (!fs.existsSync(file)) {
    console.error(` '${file}' does not exist.`);
    process.exit(1);
  }

const rl = readline.createInterface({
  input: process.stdin

});

rl.question('Enter the number of lines to print: ', (tl) => {
  tl = parseInt(tl);

  if (isNaN(tl) || tl <= 0) {
    console.error('Invalid');
    rl.close();
    process.exit(1);
  }

  const readStream = fs.createReadStream(file);
  const unZip = readStream.pipe(zlib.createGunzip());
  const rl = readline.createInterface({
    input: unZip,
    crlfDelay: Infinity
  });

  let lines = 0;

  rl.on('line', (line) => {
    console.log(line);

    lines++;

    if (lines >= tl) {
      rl.close();
      readStream.close();
    }
  });

  rl.on('close', () => {
    console.log('Finished reading the file.');
    rl.close();
  });
});

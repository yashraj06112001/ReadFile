const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

const filename = process.argv[2];



const rl = readline.createInterface({
  input: process.stdin,

});

rl.question('Enter the number of lines to print: ', (totalLines) => {
  totalLines = parseInt(totalLines);

  if (isNaN(totalLines) || totalLines <= 0) {
    console.error('Invalid');
    rl.close();
    process.exit(1);
  }

  const readStream = fs.createReadStream(filename);
  const unZip = readStream.pipe(zlib.createGunzip());
  const rl = readline.createInterface({
    input: unZip,
    crlfDelay: Infinity
  });

  let lines = 0;

  rl.on('line', (line) => {
    console.log(line);

    lines++;

    if (lines >= totalLines) {
      rl.close();
      readStream.close();
    }
  });

  rl.on('close', () => {
    console.log('Finished reading the file.');
    rl.close();
  });
});

const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const filepath = 'file.gz';
const totalLines = 1000;
const readStream = fs.createReadStream(filepath);
const unZip = readStream.pipe(zlib.createGunzip());
const rl = readline.createInterface({
  input: unZip,
  crlfDelay: Infinity 
});

let lines = 0;

rl.on('line', (line) => {
  // Print the line
  console.log(line);

  lines++;

  if (lines >= totalLines) {
    rl.close();
    readStream.close(); 
  }
});

rl.on('close', () => {
  console.log('Finished reading the file.');
});

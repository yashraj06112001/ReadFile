const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const gzFilePath = 'file.gz';
const numLinesToRead = 1000;
const readStream = fs.createReadStream(gzFilePath);
const unzipStream = readStream.pipe(zlib.createGunzip());
const rl = readline.createInterface({
  input: unzipStream,
  crlfDelay: Infinity 
});

let linesRead = 0;

rl.on('line', (line) => {
  // Print the line
  console.log(line);

  linesRead++;

  if (linesRead >= numLinesToRead) {
    rl.close();
    readStream.close(); 
  }
});

rl.on('close', () => {
  console.log('Finished reading the file.');
});

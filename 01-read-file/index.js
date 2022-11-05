const { stdout } = process;
const path = require("path");
const fs = require("fs");
const pathName = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(pathName, 'utf-8', (err) => {
  if (err) console.log(err);
});
readStream.on('data', (data, err) => {
  if (err) console.log(err);
  else stdout.write(data);
})

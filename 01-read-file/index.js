const { stdout } = process;
const path = require("path");
const fs = require("fs");
const pathName = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(pathName);
stream.on("readable", () => {
  const data = stream.read();
  if (data) {
    stdout.write(data);
  }
});

const fs = require("fs");
const path = require("path");
const { stdout } = process;

const dirName = path.join(__dirname, "secret-folder");

const errorHandler = (err) => {
  if (err) console.log(err)
};

fs.readdir(dirName, { withFileTypes: true }, (err, files) => {
  if (err) {
    errorHandler(err);
  } else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const name = file.name;
        const extName = path.extname(name.toString());
        const pathName = path.join(dirName, file.name);
        fs.stat(pathName, (err, stats) => err ? errorHandler(err) : stdout.write(`${name} - ${extName} - ${stats.size}\n`));
      }
    });
  }
});

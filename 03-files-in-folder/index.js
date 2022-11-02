const fs = require("fs");
const path = require("path");
const { stdout } = process;

const dirName = path.join(__dirname, "secret-folder");

fs.readdir(dirName, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  } else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const name = file.name;
        const extName = path.extname(name.toString());
        const pathName = path.join(dirName, file.name);
        fs.stat(pathName, (err, stats) => {
          if (err) {
            throw new Error("Что-то пошло не так");
          } else {
            stdout.write(`${name} - ${extName} - ${stats.size}\n`);
          }
        });
      }
    });
  }
});

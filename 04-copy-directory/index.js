const path = require("path");
const fs = require("fs");

const copyiedFolder = path.join(__dirname, "files-copy");
const parentFolder = path.join(__dirname, "files");

fs.mkdir(copyiedFolder, { recursive: true }, (err, data) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  } else {
    console.log("Папка создана");
  }
});

fs.readdir(parentFolder, (error, data) => {
  if (error) {
    throw new Error("Что-то пошло не так");
  } else {
    data.forEach((file) => {
        const filePath = path.join(__dirname, 'files', file);
        const destinationPath = path.join(copyiedFolder, file);
      fs.copyFile(filePath, destinationPath, (err) => {
        if (err) {
            throw new Error("Что-то пошло не так");
        }
      });
    });
  }
});

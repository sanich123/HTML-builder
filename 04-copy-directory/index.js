const path = require("path");
const fs = require("fs");

const copyiedFolder = path.join(__dirname, "files-copy");
const parentFolder = path.join(__dirname, "files");

const errorHandler = (err) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  }
};

fs.mkdir(copyiedFolder, { recursive: true }, errorHandler);
fs.readdir(parentFolder, (error, data) => {
  if (error) {
    throw new Error("Что-то пошло не так");
  } else {
    data.forEach((file) => {
        const filePath = path.join(parentFolder, file);
        const destinationPath = path.join(copyiedFolder, file);
      fs.copyFile(filePath, destinationPath, errorHandler);
    });
  }
});

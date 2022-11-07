const path = require("path");
const fs = require("fs");

const copyiedFolder = path.join(__dirname, "files-copy");
const parentFolder = path.join(__dirname, "files");

const errorHandler = (err) => {
  if (err) console.log(err);
};

fs.mkdir(copyiedFolder, { recursive: true }, errorHandler);
unlinkFiles();

function unlinkFiles() {
  fs.readdir(copyiedFolder, (err, files) => {
    if (err) errorHandler(err);
    else {
      files.forEach((file) => {
        fs.unlink(path.join(copyiedFolder, file), (err) => {
          if (err) errorHandler(err);
        });
      });
      copyFiles();
    }
  });
}

function copyFiles() {
  fs.readdir(parentFolder, (error, data) => {
    if (error) {
      errorHandler(err);
    } else {
      data.forEach((file) => {
        const filePath = path.join(parentFolder, file);
        const destinationPath = path.join(copyiedFolder, file);
        fs.copyFile(filePath, destinationPath, errorHandler);
      });
    }
  });
}

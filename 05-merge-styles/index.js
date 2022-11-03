const path = require("path");
const fs = require("fs");
const errorHandler = (err) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  }
};

const stylesPath = path.join(__dirname, "styles");
const bundleFile = path.join(__dirname, "project-dist", "bundle.css");

fs.writeFile(bundleFile, "", errorHandler);
fs.readdir(stylesPath, { withFileTypes: true }, (err, data) =>
  err
    ? errorHandler(err)
    : data.forEach((file) => {
        const pathToFile = path.join(stylesPath, file.name);
        const extName = path.extname(pathToFile);

        if (!file.isDirectory() && extName === ".css") {
          fs.readFile(pathToFile, "utf-8", (err, data) =>
            err
              ? errorHandler(err)
              : fs.appendFile(bundleFile, data, errorHandler)
          );
        }
      })
);

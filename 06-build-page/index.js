const path = require("path");
const fs = require("fs");
const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const distPath = path.join(__dirname, "project-dist");
const stylesCss = path.join(distPath, "style.css");
const stylesPath = path.join(__dirname, "styles");
const assetsPath = path.join(__dirname, "assets");

const errorHandler = (err) => {
  if (err) {
    throw err;
  }
};
let template = "";
let parts = [];

fs.mkdir(distPath, { recursive: true }, errorHandler);
fs.writeFile(stylesCss, "", errorHandler);
fs.readdir(stylesPath, { withFileTypes: true }, (err, data) =>
  err
    ? errorHandler(err)
    : data.forEach((file) => {
        const pathToFile = path.join(stylesPath, file.name);
        const extName = path.extname(pathToFile);
        if (!file.isDirectory() && extName === ".css") {
          fs.readFile(pathToFile, "utf-8", (err, styles) =>
            err
              ? errorHandler(err)
              : fs.appendFile(stylesCss, styles, errorHandler)
          );
        }
      })
);
const templateStream = fs.createReadStream(templatePath, "utf-8");
templateStream.on("data", (data) => (template += data));
templateStream.on("end", () => {
  parts = template
    .slice()
    .split("\n")
    .filter((el) => el.includes("{") && el.includes("}"))
    .map((el) => el.trim().replace(/{|}/gi, ""));
  template = template.split("\n");
  readAnything();
});

function readAnything() {
  if (parts.length > 0) {
    const name = parts.pop();
    const filePath = path.join(componentsPath, `${name}.html`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        readAnything();
      } else {
        let insertData = "";
        const readStream = fs.createReadStream(filePath, "utf-8");
        readStream.on("data", (data) => (insertData += data));
        readStream.on("end", () => {
          template = template.map((el) =>
            el.includes(`{{${name}}}`) ? insertData : el
          );
          if (parts.length > 0) {
            readAnything();
          } else {
            fs.writeFile(
              path.join(distPath, "index.html"),
              template.join(""),
              errorHandler
            );
          }
        });
      }
    });
  } else {
    return;
  }
}

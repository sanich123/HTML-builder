const path = require("path");
const fs = require("fs");

const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const distPath = path.join(__dirname, "project-dist");
const stylesCss = path.join(distPath, "style.css");
const stylesPath = path.join(__dirname, "styles");
const distAssets = path.join(__dirname, "project-dist/assets");
const distFonts = path.join(distAssets, "fonts");
const distImg = path.join(distAssets, "img");
const distSvg = path.join(distAssets, "svg");
const assets = path.join(__dirname, "assets");

const errorHandler = (err) => {
  if (err) {
    console.log(err);
  }
};

fs.mkdir(distPath, { recursive: true }, errorHandler);

let template = "";
let parts = [];

fs.writeFile(stylesCss, "", errorHandler);
fs.readdir(stylesPath, { withFileTypes: true }, (err, data) =>
  err ? errorHandler(err) : data.forEach((file) => {
    const pathToFile = path.join(stylesPath, file.name);
    const extName = path.extname(pathToFile);
    if (!file.isDirectory() && extName === ".css") {
      fs.readFile(pathToFile, "utf-8", (err, styles) => err ? errorHandler(err) : fs.appendFile(stylesCss, styles, errorHandler));
    }
  })
);

const templateStream = fs.createReadStream(templatePath, "utf-8");
templateStream.on("data", (data) => (template += data));
templateStream.on("end", () => {
  parts = template
    .slice()
    .split("\n")
    .filter((el) => el.includes("{{") && el.includes("}}"))
    .map((el) => el.trim().replace(/{|}/gi, ""));
  template = template.split("\n");
  readAnything();
});
copyEverything();

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
          template = template.map((el) => el.includes(`{{${name}}}`) ? insertData : el);
          parts.length > 0 ? readAnything() : fs.writeFile(path.join(distPath, "index.html"), template.join(""), errorHandler);
        });
      }
    });
  } else {
    return;
  }
}

function copyEverything() {
  fs.mkdir(distAssets, { recursive: true }, errorHandler);
  fs.mkdir(distFonts, { recursive: true }, errorHandler);
  fs.mkdir(distImg, { recursive: true }, errorHandler);
  fs.mkdir(distSvg, { recursive: true }, errorHandler);
  fs.readdir(assets, (err, folders) => {
    if (err) {
      errorHandler(err);
    } else {
      folders.forEach((folder) => {
        const folderPath = path.join(assets, folder);
        fs.readdir(folderPath, (err, assets) => {
          if (err) {
            errorHandler(err);
          } else {
            assets.forEach((asset) => {
              const extname = asset.split(".")[1];
              let innerFolder;
              if (extname === "woff2") innerFolder = "fonts";
              if (extname === "jpg") innerFolder = "img";
              if (extname === "svg") innerFolder = "svg";
              const assetsPath = path.join(__dirname, `assets/${innerFolder}`, asset);
              const distPath = path.join(__dirname, `project-dist/assets/${innerFolder}`, asset);
              fs.mkdir(path.join(distAssets, `${innerFolder}`), { recursive: true },
                (error) => error ? console.log(error) : fs.copyFile(assetsPath, distPath, errorHandler));
            });
          }
        });
      });
    }
  });
}

const path = require("path");
const fs = require("fs");
const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const distPath = path.join(__dirname, "project-dist");
const stylesCss = path.join(distPath, "style.css");
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const errorHandler = (err) => {
  if (err) {
    throw err;
  }
};
let template = "";
let articles = "";
let footer = "";
let header = "";

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
templateStream.on("end", readArticles);

function readArticles() {
  const articlesPath = path.join(componentsPath, "articles.html");
  const readArticles = fs.createReadStream(articlesPath, "utf-8");
  readArticles.on("data", (data) => (articles += data));
  readArticles.on("end", () => {
    template = template
      .split("\n")
      .map((el) => (el.includes("{{articles}}") ? articles : el));
  });
  readFooter();
}

function readFooter() {
  const footerPath = path.join(componentsPath, "footer.html");
  const readFooter = fs.createReadStream(footerPath, "utf-8");
  readFooter.on("data", (data) => (footer += data));
  readFooter.on("end", () => {
    template = template.map((el) => (el.includes("{{footer}}") ? footer : el));
    readHeader();
  });
}

function readHeader() {
  const headerPath = path.join(componentsPath, "header.html");
  const readHeader = fs.createReadStream(headerPath, "utf-8");
  readHeader.on("data", (data) => (header += data));
  readHeader.on("end", () => {
    template = template
      .map((el) => (el.includes("{{header}}") ? header : el))
      .join("");
    fs.writeFile(path.join(distPath, "index.html"), template, errorHandler);
  });
}

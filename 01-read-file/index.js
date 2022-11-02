const { stdout } = process;
const path = require("path");
const fs = require("fs");

fs.readFile(path.join(__dirname, "text.txt"), "utf-8", (error, data) => {
  if (error) {
    throw new Error("Что-то пошшо не так");
  }
  if (data) {
    stdout.write(data);
  }
});

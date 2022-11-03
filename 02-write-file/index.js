const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const pathName = path.join(__dirname, "text.txt");

const errorHandler = (err) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  }
};

const exitMaker = () => {
  stdout.write("Желаю творческих узбеков и счастья в личной жизни. Пух.");
  process.exit();
};

fs.writeFile(pathName, "", errorHandler);

stdout.write("Введите текст, который нужно сохранить в файл\n");

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    exitMaker();
  }
  fs.appendFile(pathName, data.toString(), errorHandler);
  stdout.write("Успешно записалось, бахни еще ченить\n");
});

process.on("SIGINT", () => {
  exitMaker();
});

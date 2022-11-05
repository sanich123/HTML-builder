const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const pathName = path.join(__dirname, "text.txt");
const wishGoodLuck = "Желаю творческих узбеков и счастья в личной жизни. Пух.";
const writeTheText = "Введите текст, который нужно сохранить в файл\n";
const successWrite = "Успешно записалось, бахни еще ченить\n";

const errorHandler = (err) => {
  if (err) console.log(err);
};

const exitMaker = () => {
  stdout.write(wishGoodLuck);
  process.exit();
};

fs.writeFile(pathName, "", errorHandler);

stdout.write(writeTheText);

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") exitMaker();
  fs.appendFile(pathName, data.toString(), errorHandler);
  stdout.write(successWrite);
});

process.on("SIGINT", () => exitMaker());

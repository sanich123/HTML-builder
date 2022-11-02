const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

const errorHandler = (err) => {
  if (err) {
    throw new Error("Что-то пошло не так");
  }
};

fs.writeFile(path.join(__dirname, "text.txt"), "", errorHandler);

stdout.write("Введите текст, который нужно сохранить в файл\n");

stdin.on("data", (data) => {
  fs.appendFile(
    path.join(__dirname, "text.txt"),
    data.toString(),
    errorHandler
  );
  stdout.write("Успешно записалось, бахни еще ченить\n");

});

process.on('SIGINT', () => {
    stdout.write('Желаю творческих узбеков и счастья в личной жизни. Пух.');
    process.exit();
});
const fs = require("fs");

const importData = (file) => {
  return new Promise((res) =>
    fs.readFile(file, "utf8", (err, data) => res(data))
  );
};

module.exports = {
  importData,
};

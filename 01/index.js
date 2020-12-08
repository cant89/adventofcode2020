const { importData } = require("../utils");

function partOne(expenses) {
  for (i = 0; i < expenses.length; i++) {
    for (j = i + 1; j < expenses.length; j++) {
      if (Number(expenses[i]) + Number(expenses[j]) === 2020) {
        return expenses[i] * expenses[j];
      }
    }
  }
}

function partTwo(expenses) {
  for (i = 0; i < expenses.length; i++) {
    for (j = i + 1; j < expenses.length; j++) {
      for (k = j + 1; k < expenses.length; k++) {
        if (
          Number(expenses[i]) + Number(expenses[j]) + Number(expenses[k]) ===
          2020
        ) {
          return expenses[i] * expenses[j] * expenses[k];
        }
      }
    }
  }
}

async function run() {
  const data = (await importData("01/data.txt")).split(/\n/);
  const res1 = partOne(data);
  const res2 = partTwo(data);

  console.log(res1, res2);
}

run();

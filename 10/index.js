const { importData } = require("../utils");

const getPartOne = (adapters) => {
  const res = adapters.reduce(
    (acc, a, i, list) => {
      if (!list[i + 1]) return acc;
      const diff = list[i + 1] - a;
      return { ...acc, [diff]: acc[diff] + 1 };
    },
    { 1: 0, 2: 0, 3: 1 }
  );
  return res["1"] * res["3"];
};

async function run() {
  const data = (await importData("10/data.txt")).split(/\n/gm);
  const adapters = [0, ...data].map(Number).sort((a, b) => a - b);

  const res1 = getPartOne(adapters);

  console.log(res1);
}

run();

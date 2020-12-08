const { importData } = require("../utils");

function partOne(pssw) {
  return pssw.reduce((acc, v, i) => {
    const [, min, max, char, val] = v.match(
      /([0-9]+)-([0-9]+)\s([a-z]):\s(\w+)/
    );
    const occ = val.split(char).length - 1;
    return acc + Number(occ >= min && occ <= max);
  }, 0);
}

function partTwo(pssw) {
  return pssw.reduce((acc, v, i) => {
    const [, p1, p2, char, val] = v.match(/([0-9]+)-([0-9]+)\s([a-z]):\s(\w+)/);
    return acc + ((val[p1 - 1] === char) ^ (val[p2 - 1] === char));
  }, 0);
}

async function run() {
  const data = (await importData("02/data.txt")).split(/\n/);
  const res1 = partOne(data);
  const res2 = partTwo(data);

  console.log(res1, res2);
}

run();

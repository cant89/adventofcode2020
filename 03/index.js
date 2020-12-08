const { importData } = require("../utils");

function getTrees(levels, right, down) {
  return levels.reduce(
    ({ tot, pos, top }, lev, i) => {
      if (!i) return { tot, pos, top };
      if (top !== 1) return { tot, pos, top: Math.max(top - 1, 1) };

      const newPos = pos + right;
      const rightPos = newPos > lev.length - 1 ? newPos - lev.length : newPos;

      return {
        tot: lev[rightPos] === "#" ? tot + 1 : tot,
        pos: rightPos,
        top: down,
      };
    },
    { tot: 0, pos: 0, top: down }
  ).tot;
}

async function run() {
  const data = (await importData("03/data.txt")).split(/\n/);
  const res1 = getTrees(data, 3, 1);
  const res2 = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map((args) => getTrees(data, ...args))
    .reduce((tot, v) => v * tot, 1);

  console.log(res1, res2);
}

run();

const { importData } = require("../utils");

function step({ i, ins, acc, history }) {
  const isInHistory = history.includes(i);

  if (isInHistory) {
    return acc;
  }

  const [op, amount] = ins[i].split(" ");
  const isAcc = op === "acc";

  return step({
    i: i + Number(op === "nop" || isAcc || amount),
    ins,
    acc: isAcc ? acc + Number(amount) : acc,
    history: [...history, i],
  });
}

function stepWithFix({ i, ins, acc, history, fixHistory, trying }) {
  if (i > ins.length - 1) {
    return acc;
  }

  const isInHistory = history.includes(i);

  if (isInHistory) {
    return stepWithFix({
      ...fixHistory[fixHistory.length - 1],
      fixHistory,
      trying: false,
    });
  }

  const [op, amount] = ins[i].split(" ");

  if (op === "acc") {
    return stepWithFix({
      i: i + 1,
      ins,
      acc: acc + Number(amount),
      history: [...history, i],
      fixHistory,
      trying,
    });
  }

  const isInFixFixHistory = fixHistory.filter(({ i: index }) => index === i)
    .length;
  const hasToTry = !isInFixFixHistory && !trying;

  return stepWithFix({
    i: i + ((op === "nop") ^ hasToTry ? 1 : Number(amount)),
    ins,
    acc,
    history: [...history, i],
    fixHistory: [
      ...fixHistory,
      ...(hasToTry
        ? [
            {
              i,
              ins,
              acc,
              history,
            },
          ]
        : []),
    ],
    trying: trying || hasToTry,
  });
}

function getPartOne(ins) {
  return step({ i: 0, ins, acc: 0, history: [] });
}

function getPartTwo(ins) {
  return stepWithFix({ i: 0, ins, acc: 0, history: [], fixHistory: [] });
}

async function run() {
  const data = (await importData("08/data.txt")).split(/\n/gm);

  const res1 = getPartOne(data);
  const res2 = getPartTwo(data);

  console.log(res1, res2);
}

run();

const { importData } = require("../utils");

function getPartOne(answers) {
  return answers.reduce((unique, group) => {
    const yes = Object.keys(
      group.split("").reduce((obj, key) => ({ ...obj, [key]: true }), {})
    );
    return unique + yes.length;
  }, 0);
}

function getUniqueAnswersInGroup(group) {
  const groupArr = group.split(",");
  return groupArr.reduce(
    (res, person) => {
      const personAnswers = person.split("");

      return {
        ...res,
        ...personAnswers.reduce(
          (obj, key) => ({
            ...obj,
            [key]: (res[key] || 0) + 1,
          }),
          {}
        ),
      };
    },
    { length: groupArr.length }
  );
}

function getPartTwo(answers) {
  return answers.reduce((unique, group) => {
    const { length, ...results } = getUniqueAnswersInGroup(group);
    const uniqueInGroup = Object.keys(results).reduce(
      (acc, key) => (results[key] === length ? acc + 1 : acc),
      0
    );
    return unique + uniqueInGroup;
  }, 0);
}

async function run() {
  const data = await importData("06/data.txt");
  const answersByGroup = data.replace(/(?<!\n)\n(?!\n)/gm, "").split(/\n\n/);
  const answersByGroupByPerson = data
    .replace(/\n\n/gm, ";\n")
    .replace(/(?<!;)\n/gm, ",")
    .split(";\n");

  const res1 = getPartOne(answersByGroup);
  const res2 = getPartTwo(answersByGroupByPerson);

  console.log(res1, res2);
}

run();

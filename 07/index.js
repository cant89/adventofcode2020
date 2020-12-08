const { importData } = require("../utils");

function getContain(rules, type) {
  return rules.reduce((acc, rule) => {
    const regex = new RegExp(`contain.*${type}`, "gm");
    const match = rule.match(regex);
    if (match) {
      const [, biggerBag] = /(.*)\sbags contain/gm.exec(rule);
      const containsBiggerBag = getContain(rules, biggerBag);
      return [...acc, biggerBag, ...containsBiggerBag];
    }
    return acc;
  }, []);
}

function getPartOne(rules) {
  const containsShinyGold = getContain(rules, "shiny gold");
  const uniq = [...new Set([containsShinyGold].flat(2))];
  return uniq.length;
}
async function run() {
  const data = (await importData("07/data.txt")).split(/\n/gm);

  const res1 = getPartOne(data);

  console.log(res1);
}

run();

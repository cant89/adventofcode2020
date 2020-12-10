const { importData } = require("../utils");

function getContained(rules, type) {
  return rules.reduce((acc, rule) => {
    const regex = new RegExp(`contain.*${type}`, "gm");
    const match = rule.match(regex);
    if (match) {
      const [, biggerBag] = /(.*)\sbags contain/gm.exec(rule);
      const containsBiggerBag = getContained(rules, biggerBag);
      return [...acc, biggerBag, ...containsBiggerBag];
    }
    return acc;
  }, []);
}

function getContain(rules, type) {
  const regex = new RegExp(`${type} bags contain (.*).`, "g");
  const [, contained] = regex.exec(rules) || [];

  if (contained && contained !== "no other bags") {
    const bags = contained.split(", ");

    const total = bags.map((bag) => {
      const [amount, adj, color] = bag.split(" ");
      const amountOfContained = getContain(rules, `${adj} ${color}`);
      return Number(amount) * amountOfContained;
    });

    return total.reduce((a, b) => a + b, !Boolean(type === "shiny gold"));
  }

  return 1;
}

function getPartOne(rules) {
  const rulesArr = rules.split(/\n/gm);
  const containsShinyGold = getContained(rulesArr, "shiny gold");
  const uniq = [...new Set([containsShinyGold].flat(2))];

  return uniq.length;
}

function getPartTwo(rules) {
  const containedInShinyGold = getContain(rules, "shiny gold");

  return containedInShinyGold;
}

async function run() {
  const data = await importData("07/data.txt");

  const res1 = getPartOne(data);
  const res2 = getPartTwo(data);

  console.log(res1, res2);
}

run();

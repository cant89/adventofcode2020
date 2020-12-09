const { importData } = require("../utils");

function getContained(rules, type) {
  const regex = new RegExp(`(.*) bags contain.*[0-9] ${type}`, "gm");
  const match = rules.match(regex);

  if (match) {
    return match
      .map((rule) => {
        const [adj, color] = rule.split(" ");
        const biggerBag = `${adj} ${color}`;
        const containsBiggerBag = getContained(rules, biggerBag);
        return [biggerBag, ...containsBiggerBag];
      })
      .flat();
  }

  return [];
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
  const containsShinyGold = getContained(rules, "shiny gold");
  const uniq = [...new Set(containsShinyGold)];

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

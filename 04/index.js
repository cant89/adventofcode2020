const { importData } = require("../utils");

const REQ_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const FIELD_RULES = {
  byr: (e) => e.length === 4 && Number(e) >= 1920 && Number(e) <= 2002,
  iyr: (e) => e.length === 4 && Number(e) >= 2010 && Number(e) <= 2020,
  eyr: (e) => e.length === 4 && Number(e) >= 2020 && Number(e) <= 2030,
  hgt: (e) => {
    if (e.endsWith("cm"))
      return Number(e.slice(0, -2)) >= 150 && Number(e.slice(0, -2)) <= 193;
    if (e.endsWith("in"))
      return Number(e.slice(0, -2)) >= 59 && Number(e.slice(0, -2)) <= 76;
    return false;
  },
  hcl: (e) => Boolean(e.match(/^#[0-9a-f]{6}$/g)),
  ecl: (e) => Boolean(e.match(/^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/g)),
  pid: (e) => Boolean(e.match(/^[0-9]{9}$/g)),
};

const checkRequiredFields = (pass) =>
  pass.reduce(
    (invalidFields, field) => invalidFields.filter((key) => key !== field[0]),
    REQ_FIELDS
  ).length === 0;

const checkValidFields = (pass) =>
  Object.keys(
    pass.reduce((invalidFields, field) => {
      const fn = invalidFields[field[0]];
      const isValid = fn && fn(field[1]);
      if (!isValid) return invalidFields;
      const { [field[0]]: removed, ...rest } = invalidFields;
      return rest;
    }, FIELD_RULES)
  ).length === 0;

function getPartOne(passports) {
  return passports.reduce(
    (valids, pass) => (checkRequiredFields(pass) ? valids + 1 : valids),
    0
  );
}

function getPartTwo(passports) {
  return passports.reduce(
    (valids, pass) =>
      checkRequiredFields(pass) && checkValidFields(pass) ? valids + 1 : valids,
    0
  );
}

async function run() {
  const data = await importData("04/data.txt");
  const passports = data
    .replace(/(?<!\n)\n(?!\n)/gm, " ")
    .split(/\n\n/)
    .map((pass) => pass.split(" ").map((field) => field.split(":")));
  const res1 = getPartOne(passports);
  const res2 = getPartTwo(passports);

  console.log(res2);
}

run();

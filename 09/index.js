const { importData } = require("../utils");

function search(nums, range, start) {
  const numToFind = Number(nums[start + range]);
  const list = nums.slice(start, start + range);
  const found = list.some((n1) =>
    list.some((n2) => n1 !== n2 && Number(n1) + Number(n2) === numToFind)
  );

  return found ? search(nums, range, start + 1) : numToFind;
}

function searchContiguous(invalidNum, nums) {
  return nums.reduce((acc, n, i) => {
    if (acc) return acc;

    const { index, sum } = nums.slice(i).reduce(
      ({ sum, index }, v, j) => {
        if (index) return { index };
        const newSum = sum + Number(v);
        return newSum === invalidNum ? { index: j + i } : { sum: newSum };
      },
      { sum: 0 }
    );

    if (index) {
      const contiguous = nums.slice(i, index + 1).map((n) => Number(n));
      return Math.min(...contiguous) + Math.max(...contiguous);
    }

    return null;
  }, null);
}

const getPartOne = (nums) => search(nums, 25, 0);
const getPartTwo = (nums) => {
  const invalidNum = getPartOne(nums);
  return searchContiguous(invalidNum, nums);
};

async function run() {
  const data = (await importData("09/data.txt")).split(/\n/gm);

  const res1 = getPartOne(data);
  const res2 = getPartTwo(data);

  console.log(res1, res2);
}

run();

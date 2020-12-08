const { importData } = require("../utils");

const COLUMN_HALF = {
  L: 0,
  R: 1,
};

const ROW_HALF = {
  F: 0,
  B: 1,
};

const ROWS = new Array(128).fill(1).map((_, i) => i);
const COLUMNS = new Array(8).fill(1).map((_, i) => i);

function divideArray(arr) {
  const firstHalf = arr.slice(0, arr.length / 2);
  const secondHalf = arr.slice(arr.length / 2, arr.length);
  return [firstHalf, secondHalf];
}

function getSeatId(seat) {
  const [, rowPath, colPath] = seat.match(/(.{7})(.{3})/);
  const rowPathArr = rowPath.split("");
  const colPathArr = colPath.split("");

  const [rowNumber] = rowPathArr.reduce(
    (res, el) => divideArray(res)[ROW_HALF[el]],
    ROWS
  );

  const [colNumber] = colPathArr.reduce(
    (res, el) => divideArray(res)[COLUMN_HALF[el]],
    COLUMNS
  );

  return rowNumber * 8 + colNumber;
}

function getPartOne(seats) {
  const seatIds = seats.map(getSeatId);
  return Math.max.apply(Math, seatIds);
}

function getPartTwo(seats) {
  const seatIds = seats.map(getSeatId);
  const [seatBefore] = seatIds
    .sort()
    .filter((id, i, ids) => id + 2 === ids[i + 1]);
  return seatBefore + 1;
}

async function run() {
  const data = (await importData("05/data.txt")).split(/\n/);
  const res1 = getPartOne(data);
  const res2 = getPartTwo(data);

  console.log(res1, res2);
}

run();

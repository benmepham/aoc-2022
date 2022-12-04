import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((item) => item.split("-").map((num) => parseInt(num))),
    );

const checkContains = (pt1, pt2) =>
  (pt1[0] >= pt2[0] && pt1[1] <= pt2[1]) ||
  (pt2[0] >= pt1[0] && pt2[1] <= pt1[1]);

// Using for loop
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let line of input) {
    if (checkContains(line[0], line[1])) sum += 1;
  }
  return sum;
};

const checkOverlap = (pt1, pt2) =>
  (pt1[0] >= pt2[0] && pt1[0] <= pt2[1]) ||
  (pt1[1] >= pt2[0] && pt1[1] <= pt2[1]) ||
  (pt2[0] >= pt1[0] && pt2[0] <= pt1[1]) ||
  (pt2[1] >= pt1[0] && pt2[1] <= pt1[1]);

// Using .reduce
const part2 = (rawInput) =>
  parseInput(rawInput).reduce(
    (partial, line) => (checkOverlap(line[0], line[1]) ? partial + 1 : partial),
    0,
  );

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

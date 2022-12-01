import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let splitByBlankLine = input.split("\n\n");
  let splitByLine = splitByBlankLine.map(data => data.split("\n"))
  let elfTotalCalories = splitByLine.map(data => data.reduce((partial, a) => partial + parseInt(a), 0))
  return Math.max(...elfTotalCalories);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let splitByBlankLine = input.split("\n\n");
  let splitByLine = splitByBlankLine.map(data => data.split("\n"))
  let elfTotalCalories = splitByLine.map(data => data.reduce((partial, a) => partial + parseInt(a), 0))
  // above is from part 1
  let elfTotalCaloriesSorted = elfTotalCalories.sort((a,b) => a - b)
  return elfTotalCaloriesSorted.slice(-3).reduce((partial, a) => partial + a, 0)
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

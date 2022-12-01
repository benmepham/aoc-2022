import run from "aocrunner";

const parseInput = (rawInput) => {
  const splitByBlankLine = rawInput.split("\n\n");
  const splitByLine = splitByBlankLine.map(data => data.split("\n"))
  return splitByLine.map(data => data.reduce((partial, a) => partial + parseInt(a), 0)).sort((a,b) => a - b)
};


const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.slice(-1)[0];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.slice(-3).reduce((partial, a) => partial + a, 0)
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

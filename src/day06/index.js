import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("");

const findMarker = (input, num) => {
  for (let i = num; i < input.length; i++) {
    let arr = input.slice(i - num, i + 1);
    if (arr.filter((item, index) => arr.indexOf(item) != index).length == 0)
      return i + 1;
  }
};

const part1 = (rawInput) => findMarker(parseInput(rawInput), 3);

const part2 = (rawInput) => findMarker(parseInput(rawInput), 13);

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

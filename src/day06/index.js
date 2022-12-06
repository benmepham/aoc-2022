import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  for (let i=3;i<input.length;i++) {
    let subArr = input.slice(i-3,i+1);
    if (subArr.filter((item, index) => subArr.indexOf(item) != index).length == 0)
      return i+1
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

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

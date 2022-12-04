import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let line of input) {
    let lineArr = line.split(",").map(item => item.split("-").map(num => parseInt(num)));
    if (lineArr[0][0] >= lineArr[1][0] && lineArr[0][1] <= lineArr[1][1])
      sum+=1
    else if (lineArr[1][0] >= lineArr[0][0] && lineArr[1][1] <= lineArr[0][1])
      sum+=1
  }
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

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

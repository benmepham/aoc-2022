import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let num = 0;
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input.length - 1; j++) {
      const row = input[i];
      const column = input.map((line) => line[j]);

      if (row.slice(0, j).filter((item) => item >= input[i][j]).length == 0)
        num++;
      else if (
        row.slice(j + 1).filter((item) => item >= input[i][j]).length == 0
      )
        num++;
      else if (
        column.slice(0, i).filter((item) => item >= input[i][j]).length == 0
      )
        num++;
      else if (
        column.slice(i + 1).filter((item) => item >= input[i][j]).length == 0
      )
        num++;
    }
  }
  return num + input.length * 2 + input[0].length * 2 - 4;
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
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 21,
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

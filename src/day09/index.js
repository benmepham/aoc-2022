import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const moveRequired = (posT, posH) =>
  !(Math.abs(posT[0] - posH[0]) <= 1 && Math.abs(posT[1] - posH[1]) <= 1);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const tailSet = new Set();
  let currH = [0, 0];
  let currT = [0, 0];
  tailSet.add(currT.toString());

  for (let line of input) {
    let lineArr = line.split(" ");
    for (let i = 0; i < parseInt(lineArr[1]); i++) {
      const moveT = [...currH];
      switch (lineArr[0]) {
        case "R":
          currH = [currH[0], currH[1] + 1];
          break;
        case "L":
          currH = [currH[0], currH[1] - 1];
          break;
        case "U":
          currH = [currH[0] - 1, currH[1]];
          break;
        case "D":
          currH = [currH[0] + 1, currH[1]];
          break;
        default:
          return;
      }
      if (moveRequired(currT, currH)) {
        tailSet.add(currT.toString());
        currT = [...moveT];
        tailSet.add(currT.toString());
      }
    }
  }
  return tailSet.size;
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
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2
        `,
        expected: 13,
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

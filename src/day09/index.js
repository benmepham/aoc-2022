import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const moveRequired = (posT, posH) =>
  !(Math.abs(posT[0] - posH[0]) <= 1 && Math.abs(posT[1] - posH[1]) <= 1);

const decideMove = (posT, posH) => {
  // Diagonals
  if ((posH[0] - posT[0]) % 2 == 0 && (posH[1] - posT[1]) % 2 == 0)
    return [
      posT[0] + (posH[0] - posT[0]) / 2,
      posT[1] + (posH[1] - posT[1]) / 2,
    ];
  // row
  if ((posH[0] - posT[0]) % 2 == 0)
    return [posT[0] + (posH[0] - posT[0]) / 2, posH[1]];
  // col
  if ((posH[1] - posT[1]) % 2 == 0)
    return [posH[0], posT[1] + (posH[1] - posT[1]) / 2];
};

const combinedCalc = (input, num) => {
  const tailSet = new Set();
  const posArr = Array(num).fill([0, 0]);
  tailSet.add(posArr[num - 1].toString());

  for (const line of input) {
    const lineArr = line.split(" ");
    for (let i = 0; i < parseInt(lineArr[1]); i++) {
      let currH = [...posArr[0]];
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
      posArr[0] = [...currH];
      for (let j = 1; j < posArr.length; j++)
        if (moveRequired(posArr[j], posArr[j - 1]))
          posArr[j] = [...decideMove(posArr[j], posArr[j - 1])];
      tailSet.add(posArr[num - 1].toString());
    }
  }
  return tailSet.size;
};

const part1 = (rawInput) => combinedCalc(parseInput(rawInput), 2);

const part2 = (rawInput) => combinedCalc(parseInput(rawInput), 10);

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
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20
        `,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

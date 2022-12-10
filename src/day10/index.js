import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(" "));

const calcSpritePos = (input) => {
  let x = 1;
  let valX = [];
  for (const line of input) {
    if (line[0] === "noop") {
      valX.push(x);
    } else if (line[0] === "addx") {
      valX.push(x);
      x += parseInt(line[1]);
      valX.push(x);
    }
  }
  return valX;
};

const part1 = (rawInput) => {
  const valX = calcSpritePos(parseInput(rawInput));
  let signalStrengthSum = 0;
  for (let i = 20; i < valX.length; i += 40)
    signalStrengthSum += valX[i - 2] * i;
  return signalStrengthSum;
};

const part2 = (rawInput) => {
  const valX = calcSpritePos(parseInput(rawInput));
  const crtOut = Array(240).fill(".");
  for (let i = 0; i < 240; i++)
    if (Math.abs(valX[i - 1] - (i % 40)) <= 1) crtOut[i] = "#";
  for (let i = 0; i < crtOut.length; i += 40)
    console.log(crtOut.slice(i, i + 40).join(" "));
  return "crtOutput";
};

run({
  part1: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop
        `,
        expected: 13140,
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

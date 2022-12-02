import run from "aocrunner";

const score = {
  "A Y": 6,
  "B X": 0,
  "B Z": 6,
  "C Y": 0,
  "C X": 6,
  "A Z": 0,
  "A X": 3,
  "B Y": 3,
  "C Z": 3
}

const play = {
  "X": 1,
  "Y": 2,
  "Z": 3
}

const part2Choice = {
  "X": 0,
  "Y": 3,
  "Z": 6
}

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const splitByLine = parseInput(rawInput);
  let totalScore = 0;
  for (let i=0; i<splitByLine.length; i++) {
    totalScore+=play[splitByLine[i][2]];
    totalScore+=score[splitByLine[i]];
  }
  return totalScore;
};

const part2 = (rawInput) => {
  const splitByLine = parseInput(rawInput);
  let totalScore = 0;
  for (let i=0; i<splitByLine.length; i++) {
    let play2 = Object.keys(score).find(key => score[key] === part2Choice[splitByLine[i][2]] && key[0] === splitByLine[i][0])
    totalScore+=play[play2[2]];
    totalScore+=score[play2];
  }
  return totalScore;
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

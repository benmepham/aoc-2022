import run from "aocrunner";

const parseInput = (rawInput) => {
  let input = rawInput.split("\n");
  let stacks = [];
  let instructions = [];
  for (let line of input) {
    if (!line.replace(/\s/g, "").length) continue;
    if (line[0] != "m") {
      if (/\d/.test(line)) continue;
      line = line.replace(/    /gi, "[x]");
      line = line.replace(/\s/g, "");
      let index = 0;
      for (let i = 1; i < line.length; i += 3) {
        if (line[i] == "x") {
          index++;
          continue;
        }
        while (stacks.length <= index) stacks.push([]);
        stacks[index++].push(line[i]);
      }
    } else {
      instructions.push(line);
    }
  }
  return [stacks, instructions];
};

const part1 = (rawInput) => {
  let [stacks, instructions] = parseInput(rawInput);
  for (let instruction of instructions) {
    const instructionsArr = instruction.split(" ");
    for (let i = 0; i < parseInt(instructionsArr[1]); i++) {
      stacks[parseInt(instructionsArr[5]) - 1].unshift(
        stacks[parseInt(instructionsArr[3]) - 1].shift(),
      );
    }
  }
  return stacks.flatMap((stack) => stack[0]).join("");
};

const part2 = (rawInput) => {
  let [stacks, instructions] = parseInput(rawInput);
  for (let instruction of instructions) {
    const instructionsArr = instruction.split(" ");
    if (instructionsArr[1] == "1") {
      stacks[parseInt(instructionsArr[5]) - 1].unshift(
        stacks[parseInt(instructionsArr[3]) - 1].shift(),
      );
      continue;
    }
    let temp = [];
    for (let j = 0; j < parseInt(instructionsArr[1]); j++) {
      temp.push(stacks[parseInt(instructionsArr[3]) - 1].shift());
    }
    for (let j = 0; j < parseInt(instructionsArr[1]); j++) {
      stacks[parseInt(instructionsArr[5]) - 1].unshift(temp.pop());
    }
  }
  return stacks.flatMap((stack) => stack[0]).join("");
};

run({
  part1: {
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2        
        `,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2        
        `,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});

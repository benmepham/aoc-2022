import run from "aocrunner";

const parseInput = (rawInput) => {
  let input = rawInput.split("\n");
  let arr = [];
  let instructions = [];
  let readIns = false;
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
        while (arr.length <= index) arr.push([]);
        arr[index++].push(line[i]);
      }
    } else {
      instructions.push(line);
    }
  }
  return [arr, instructions];
};

const part1 = (rawInput) => {
  let [stacks, instructions] = parseInput(rawInput);
  for (let instruction of instructions) {
    const instruction_arr = instruction.split(" ");
    for (let i = 0; i < parseInt(instruction_arr[1]); i++) {
      let temp = stacks[parseInt(instruction_arr[3]) - 1].shift();
      stacks[parseInt(instruction_arr[5]) - 1].unshift(temp);
    }
  }
  let output = [];
  for (let stack of stacks) {
    output.push(stack[0]);
  }
  return output.join("");
};

const part2 = (rawInput) => {
  let [stacks, instructions] = parseInput(rawInput);
  for (let instruction of instructions) {
    const instruction_arr = instruction.split(" ");
    if (instruction_arr[1] == "1") {
      let temp = stacks[parseInt(instruction_arr[3]) - 1].shift();
      stacks[parseInt(instruction_arr[5]) - 1].unshift(temp);
      continue;
    }
    let temp = [];
    for (let j = 0; j < parseInt(instruction_arr[1]); j++) {
      temp.push(stacks[parseInt(instruction_arr[3]) - 1].shift());
    }
    for (let j = 0; j < parseInt(instruction_arr[1]); j++) {
      stacks[parseInt(instruction_arr[5]) - 1].unshift(temp.pop());
    }
  }
  let output = [];
  for (let stack of stacks) {
    output.push(stack[0]);
  }
  return output.join("");
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

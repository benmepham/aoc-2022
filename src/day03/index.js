import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const calcTotalPriority = (items) => {
  let val = 0;
  for (let character of items) {
    if (character === character.toUpperCase())
      val += character.charCodeAt()-38;
    else 
      val += character.charCodeAt()-96;
  }
  return val;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let commonItems = [];
  for (let bag of input) {
    const firstCompartment = bag.slice(0, bag.length / 2);
    const secondCompartment = bag.slice(bag.length / 2, bag.length);
    for (let item of firstCompartment) {
      if (secondCompartment.includes(item)) {
        commonItems.push(item);
        break;
      }
    }
  }
  return calcTotalPriority(commonItems);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let commonItems = [];
  for (let i=0; i< input.length; i+=3) {
    for (let item of input[i]) {
      if (input[i+1].includes(item) && input[i+2].includes(item)) {
        commonItems.push(item);
        break;
      }
    }
  }
  return calcTotalPriority(commonItems);
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

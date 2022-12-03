import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let commonItems = []
  let newBag;
  for (let bag of input) {
    newBag = true
    const firstCompartment = bag.slice(0, bag.length / 2)
    const secondCompartment = bag.slice(bag.length / 2, bag.length)
    for (let item of firstCompartment) {
      if (secondCompartment.includes(item) && newBag === true) {
        newBag = false;
        commonItems.push(item);
      }
    }
  }
  let val = 0;
  for (let character of commonItems) {
    if (character === character.toUpperCase())
      val += character.charCodeAt()-38;
    else 
      val += character.charCodeAt()-96;
  }
  return val;
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

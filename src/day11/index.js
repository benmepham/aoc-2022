import run from "aocrunner";

const parseInput = (rawInput) => {
  const monkeyArr = [];
  rawInput.split("\n\n").map((monkey) => {
    const monkeySplit = monkey.split("\n");
    const monkeyDict = {};
    monkeyDict.if = [];
    for (let item of monkeySplit) {
      const itemSplit = item.trim().split(" ");
      switch (itemSplit[0]) {
        case "Starting":
          monkeyDict.items = [];
          for (let i = 2; i < itemSplit.length; i++)
            monkeyDict.items.push(parseInt(itemSplit[i]));
          break;
        case "Operation:":
          monkeyDict.operation = itemSplit.slice(3, 6).join(" ");
          break;
        case "Test:":
          monkeyDict.test = parseInt(itemSplit[3]);
          break;
        case "If":
          monkeyDict.if.push(parseInt(itemSplit[itemSplit.length - 1]));
          break;
        default:
          break;
      }
    }
    monkeyArr.push(monkeyDict);
  });
  return monkeyArr;
};

const calcWorryLevel = (input, part2) => {
  let totalInspections = Array(input.length).fill(0);
  for (let i = 0; i < (part2 ? 10000 : 20); i++) {
    for (let j = 0; j < input.length; j++) {
      while (input[j].items.length > 0) {
        totalInspections[j]++;
        let result = input[j].items[0];
        result = eval(input[j].operation.replace(/old/gi, result));
        result = Math.floor(part2 ? result % part2 : result / 3);
        input[j].items[0] = result;
        if (result % input[j].test == 0)
          input[input[j].if[0]].items.push(result);
        else input[input[j].if[1]].items.push(result);
        input[j].items.shift();
      }
    }
  }
  totalInspections = totalInspections.sort((a, b) => b - a);
  return totalInspections[0] * totalInspections[1];
};

const part1 = (rawInput) => calcWorryLevel(parseInput(rawInput), null);

const testProduct = (input) => input.reduce((prev, curr) => prev * curr.test, 1);

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return calcWorryLevel(input, testProduct(input));
};

run({
  part1: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
    `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
    `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

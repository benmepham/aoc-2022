import run from "aocrunner";

const parseInput = (rawInput) => {
  const input = rawInput.split("\n");
  let tree = {};
  let pathStr;
  let path = [];
  let read = false;

  for (let line of input) {
    const lineArr = line.split(" ");
    if (read == true && lineArr[0] !== "dir" && !isNaN(parseInt(lineArr[0]))) {
      tree[pathStr]+=(parseInt(lineArr[0]));
    } else if (lineArr[0] === "dir") {
    } else {
      read = false;
    }
    if (lineArr[0] === "$" && lineArr[1][0] === "c") {
      if (lineArr[2] === "/") {
        path.push(lineArr[2]);
      } else if (lineArr[2] === "..") {
        path.pop();
      } else {
        path.push(lineArr[2]);
      }
    }
    if (lineArr[1][0] === "l") {
      read = true;
      pathStr = path.join(".");
      tree[pathStr] = 0;
    }
  }
  return tree;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sortedKeys = [...Object.keys(input)];
  sortedKeys.sort((a, b) =>
    a.split(".").length >= b.split(".").length ? 1 : -1,
  );

  const origInput = { ...input };
  for (let item of sortedKeys)
    for (const [key, value] of Object.entries(origInput))
      if (key.includes(item) && key !== item) input[item] += value;

  let total = 0;
  for (const [key, value] of Object.entries(input)) 
    if (value <= 100000)
      total += value

  return total;
};

const part2 = (rawInput) => {
  // const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k
        `,
        expected: 95437,
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

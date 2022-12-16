import run from "aocrunner";

const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map((line) => line.split(""));
  const graph = [];
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[0].length; j++)
      graph.push({ weight: input[i][j], pos: [i, j], name: [i, j].join(" ") });
  return [input, graph];
};

const calcAdjacent = (input, startPos) => {
  const startWeight = startPos.weight == "S" ? "a" : startPos.weight;
  let arr = [];
  let offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const offset of offsets) {
    let newPos;
    try {
      newPos = input[startPos.pos[0] + offset[0]][startPos.pos[1] + offset[1]];
    } catch (error) {
      newPos = null;
    }
    if (newPos) {
      const endWeight = newPos == "E" ? "z" : newPos;
      if (endWeight.charCodeAt() - startWeight.charCodeAt() <= 1) {
        arr.push({
          weight: newPos,
          pos: [startPos.pos[0] + offset[0], startPos.pos[1] + offset[1]],
          name: [startPos.pos[0] + offset[0], startPos.pos[1] + offset[1]].join(
            " ",
          ),
        });
      }
    }
  }
  return arr;
};

const findMinDistInQueue = (queue, dist) => {
  const sortedArr = Object.values(dist).sort((a, b) => a.dist - b.dist);
  for (let item of sortedArr)
    if (queue.indexOf(item.name) !== -1) return item.name;
  return null;
};

const findPath = (graph, source, input) => {
  let dist = [];
  let prev = {};
  let queue = graph.map((item) => item.name);
  queue.forEach((name) => dist.push({ name: name, dist: 9999999 }));
  queue.forEach((name) => (prev[name] = null));
  dist.find((item) => item.name == source.name).dist = 0;
  while (queue.length !== 0) {
    let currSqr = findMinDistInQueue(queue, dist);
    queue.splice(queue.indexOf(currSqr), 1);
    const pos = currSqr.split(" ").map((num) => parseInt(num));
    currSqr = { weight: input[pos[0]][pos[1]], pos: pos, name: currSqr };
    if (currSqr.weight == "E") return prev;
    const neighbours = calcAdjacent(input, currSqr);
    for (const neighbour of neighbours) {
      if (queue.indexOf(neighbour.name) != -1) {
        const alt = dist.find((item) => item.name == currSqr.name).dist + 1;
        if (alt < dist.find((item) => item.name == neighbour.name).dist) {
          dist.find((item) => item.name == neighbour.name).dist = alt;
          prev[neighbour.name] = currSqr.name;
        }
      }
    }
  }
  return prev;
};

const shortestPath = (prev, input, startSqr) => {
  let path = [];
  const row = input.findIndex((row) => row.includes("E"));
  const col = input[row].indexOf("E");
  let currSqr = {
    weight: "E",
    pos: [row, col],
    name: [row, col].join(" "),
  };
  if (prev[currSqr.name] || currSqr.pos == startSqr.pos) {
    while (currSqr) {
      path.unshift(currSqr);
      const pos = prev[currSqr.name];
      if (!pos) break;
      if (currSqr.name == startSqr.name) break;
      const newPos = pos.split(" ").map((num) => parseInt(num));
      currSqr = { weight: input[newPos[0]][newPos[1]], pos: newPos, name: pos };
    }
  }
  return path.length;
};

const part1 = (rawInput) => {
  const [input, graph] = parseInput(rawInput);
  const row = input.findIndex((row) => row.includes("S"));
  const col = input[row].indexOf("S");
  let startSqr = {
    weight: input[row][col],
    pos: [row, col],
    name: [row, col].join(" "),
  };
  const prev = findPath(graph, startSqr, input);
  return shortestPath(prev, input, startSqr) - 1;
};

// Works ONLY for test input
const part2 = (rawInput) => {
  const [input, graph] = parseInput(rawInput);
  let lenArr = [];
  graph.forEach((sqr) => {
    if (sqr.weight == "a")
      lenArr.push(shortestPath(findPath(graph, sqr, input), input, sqr));
  });
  lenArr.sort((a, b) => a - b);
  return lenArr[0] - 1;
};

const testInput = `
  Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

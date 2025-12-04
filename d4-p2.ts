const text = await Deno.readTextFile("d4-input.txt");
const rows = text.split("\n").filter(Boolean);
const grid = rows.map((row) => row.split(""));

const isAccessibleByAForklift = (grid: string[][], i: number, j: number) => {
  const allAdjacentPositions: string[] = [];

  //get all positions above
  if (i - 1 >= 0) {
    if (j - 1 >= 0) allAdjacentPositions.push(grid[i - 1][j - 1]);

    allAdjacentPositions.push(grid[i - 1][j]);

    if (j + 1 <= grid[i].length - 1)
      allAdjacentPositions.push(grid[i - 1][j + 1]);
  }

  //get left and right
  if (j - 1 >= 0) allAdjacentPositions.push(grid[i][j - 1]);
  if (j + 1 <= grid[i].length - 1) allAdjacentPositions.push(grid[i][j + 1]);

  //get all positions bellow
  if (i + 1 <= grid.length - 1) {
    if (j - 1 >= 0) allAdjacentPositions.push(grid[i + 1][j - 1]);

    allAdjacentPositions.push(grid[i + 1][j]);

    if (j + 1 <= grid[i + 1].length - 1)
      allAdjacentPositions.push(grid[i + 1][j + 1]);
  }

  //if the number of @ in all adjacent positions is fewer than 4 return true
  return allAdjacentPositions.filter((pos) => pos === "@").length < 4;
};

let qtyOfRollsAccessibleByAForklift = Infinity;
let accoumulatedQtyOfRemovedRolls = 0;
let round = 1;

while (qtyOfRollsAccessibleByAForklift > 0) {
  qtyOfRollsAccessibleByAForklift = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentPos = grid[i][j];
      if (currentPos === "@" && isAccessibleByAForklift(grid, i, j)) {
        qtyOfRollsAccessibleByAForklift++;
        grid[i][j] = "x";
        accoumulatedQtyOfRemovedRolls++;
      }
    }
  }
  console.log(
    `Amount of rolls removed in round ${round}:`,
    qtyOfRollsAccessibleByAForklift,
  );
  round++;
}

console.log(
  "Accumulated amount of removed rolls:",
  accoumulatedQtyOfRemovedRolls,
);

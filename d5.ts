const text = await Deno.readTextFile("d5-input.txt");
const strRanges: string[] = [];
const ids: number[] = [];

text
  .split("\n")
  .filter(Boolean)
  .forEach((line) => {
    if (line.includes("-")) strRanges.push(line);
    else ids.push(parseInt(line));
  });

const numRanges = strRanges.map((rangeStr) => {
  const split = rangeStr.split("-");
  const min = parseInt(split[0]);
  const max = parseInt(split[1]);
  return [min, max];
});

const freshIds = ids.filter((id) =>
  numRanges.some((range) => range[0] <= id && id <= range[1]),
);

console.log("Amount of fresh ids:", freshIds.length);

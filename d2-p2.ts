const text = await Deno.readTextFile("d2-input.txt");
const ranges = text.split(",");

const foundInvalidIds = [];

const hasOnlySequenceOfDigitsRepeated = (id: string) => {
  for (let i = 0; i < id.length - 1; i++) {
    const substr = id.slice(0, i + 1);
    const arr = id.split(substr);
    if (arr.every((str) => str === "")) {
      return true;
    }
  }
  return false;
};

for (const range of ranges) {
  const ids = range.split("-");
  const firstId = parseInt(ids[0]);
  const lastId = parseInt(ids[1]);
  for (let id = firstId; id <= lastId; id++) {
    const stringId = String(id);
    if (hasOnlySequenceOfDigitsRepeated(stringId)) foundInvalidIds.push(id);
  }
}

const sumOfInvalidIds = foundInvalidIds.reduce((prev, curr, currIdx) => {
  if (currIdx === 0) return curr;
  return prev + curr;
});

console.log("The sum of invalid ids is:", sumOfInvalidIds);

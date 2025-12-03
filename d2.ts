const text = await Deno.readTextFile("d2-input.txt");
const ranges = text.split(",");

const foundInvalidIds = [];

const isPalindrome = (id: string) => {
  if (id.length % 2 !== 0) return false;
  for (let i = 0; i < id.length / 2; i++) {
    if (id.charAt(i) !== id.charAt(id.length / 2 + i)) {
      return false;
    }
  }
  return true;
};

for (const range of ranges) {
  const ids = range.split("-");
  const firstId = parseInt(ids[0]);
  const lastId = parseInt(ids[1]);
  for (let id = firstId; id <= lastId; id++) {
    const stringId = String(id);
    if (isPalindrome(stringId)) foundInvalidIds.push(id);
  }
}

const sumOfInvalidIds = foundInvalidIds.reduce((prev, curr, currIdx) => {
  if (currIdx === 0) return curr;
  return prev + curr;
});

console.log("The sum of invalid ids is:", sumOfInvalidIds);

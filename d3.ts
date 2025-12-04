const text = await Deno.readTextFile("d3-input.txt");
const banks = text.split("\n").filter(Boolean);

const maximumJoltages = [];

const getMaxJoltage = (bank: string) => {
  const battery1 = Math.max(
    ...bank
      .substring(0, bank.length - 1)
      .split("")
      .map((battery) => parseInt(battery)),
  ).toString();

  const battery2 = Math.max(
    ...bank
      .slice(bank.indexOf(battery1) + 1)
      .split("")
      .map((battery) => parseInt(battery)),
  ).toString();

  return parseInt(battery1 + battery2);
};

for (const bank of banks) {
  const maxJoltageFound = getMaxJoltage(bank);
  maximumJoltages.push(maxJoltageFound);
}

const totalOutputJoltage = maximumJoltages.reduce((prev, curr, currIdx) => {
  if (currIdx === 0) return curr;
  return prev + curr;
});

console.log("The total output joltage is:", totalOutputJoltage);

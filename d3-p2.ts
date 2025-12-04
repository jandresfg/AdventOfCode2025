const text = await Deno.readTextFile("d3-input.txt");
const banks = text.split("\n").filter(Boolean);

const maximumJoltages = [];

const getMaxJoltage = (selectedBatteries: string[], bank: string) => {
  if (selectedBatteries.length === 12)
    return parseInt(selectedBatteries.join(""));

  console.log(
    "selectedBatteries:",
    selectedBatteries.join(""),
    " | bank:",
    bank,
  );

  const newBattery = Math.max(
    ...bank
      .substring(0, bank.length - 12 + 1 + selectedBatteries.length)
      .split("")
      .map((battery) => parseInt(battery)),
  ).toString();
  const remainingBank = bank.slice(bank.indexOf(newBattery) + 1);
  console.log(
    "new battery found:",
    newBattery,
    " | remaining bank:",
    remainingBank,
  );
  console.log("---");

  return getMaxJoltage([...selectedBatteries, newBattery], remainingBank);
};

for (const bank of banks) {
  console.log("bank:", bank);
  const maxJoltageFound = getMaxJoltage([], bank);
  console.log("maxJoltageFound:", maxJoltageFound);
  maximumJoltages.push(maxJoltageFound);
  console.log("--------------------------------");
}

const totalOutputJoltage = maximumJoltages.reduce((prev, curr, currIdx) => {
  if (currIdx === 0) return curr;
  return prev + curr;
});

console.log("The total output joltage is:", totalOutputJoltage);

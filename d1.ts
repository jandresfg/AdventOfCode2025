const text = await Deno.readTextFile("d1-input.txt");
const lines = text.split("\n");

let dial = 50;
console.log("dial starts at:", dial);
let password = 0;

const readjustDialWithinBoundaries = (dial: number) => {
  const remainder = dial % 100;
  return remainder < 0 ? 100 + remainder : remainder;
};

for (const line of lines) {
  const direction = line.at(0);
  const rotation = parseInt(line.replace(direction!, ""));

  if (direction === "R") {
    dial = dial - rotation;
  }
  if (direction === "L") {
    dial = dial + rotation;
  }

  dial = readjustDialWithinBoundaries(dial);
  console.log(`${line} -> dial is now ${dial}`);
  if (dial === 0) password++;
}

console.log("The password is:", password);

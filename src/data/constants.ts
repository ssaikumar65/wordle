import words from "./wordList.json";

export const KEYS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["help", "z", "x", "c", "v", "b", "n", "m", "enter", "clear"],
];

export const getRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)];
};
export const WORD_SIZE = 5;
export const CELL_SIZE = 8;
export const CHANCES = 5;

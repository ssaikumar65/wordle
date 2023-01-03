export type Cell = {
  id: string;
  match: "exact" | "nearby" | "none" | null;
};

export type BoardProps = {
  guessedWords: Cell[][];
  incorrectGuess: string[];
  addGuess: (letter: string) => void;
  onGuessSubmit: () => void;
  onGuessClear: () => void;
  incorrectArr: string[];
};

export type Props = {
  guessedWords: Cell[][];
  incorrectGuess: string[];
};

export type GameOver = "won" | "lost" | null;

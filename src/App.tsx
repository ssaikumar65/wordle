import { useState } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { CHANCES, getRandomWord, WORD_SIZE } from "./data/constants";
import { Cell, GameOver } from "./data/types";
import "./index.css";

const App = () => {
  const [word, setWord] = useState<string>(getRandomWord());
  const [gameOver, setGameOver] = useState<GameOver>(null);
  const [guessedWords, setGuessedWords] = useState<Cell[][]>(
    Array.from({ length: CHANCES }, () =>
      Array.from({ length: WORD_SIZE }, () => ({ id: "", match: null }))
    )
  );
  const [incorrectGuess, setIncorrectGuess] = useState<string[]>([]);
  const [incorrectArr, setIncorrectArr] = useState<string[]>([]);

  const addGuess = (letter: string) => {
    let index = incorrectGuess.length;
    let arr = [...guessedWords];

    if (index > CHANCES - 1 || arr[index].every((item) => item.id.length > 0)) {
      return;
    }
    arr[index].every((item) => {
      if (item.id === "") {
        (item.id = letter), (item.match = null);
        return false;
      }
      return true;
    });

    setGuessedWords(arr);
  };

  const onGuessSubmit = () => {
    let temp = [...word];
    let arr = [...guessedWords];
    let index = incorrectGuess.length;
    let currentWord = arr[index].map((e) => e.id).join("");
    let exactFlag: string[] = [];
    let nearbyFlag: string[] = [];

    if (index > CHANCES - 1 || currentWord.length < WORD_SIZE) return;

    if (word === currentWord) {
      arr[index].forEach((item) => {
        item.match = "exact";
      });

      setGuessedWords(arr);
      setGameOver("won");
      return;
    }

    if (incorrectGuess.length >= CHANCES - 1) {
      setGameOver("lost");
    }

    arr[index].every((item, i) => {
      if (temp[i] === item.id) {
        item.match = "exact";
        exactFlag.push(item.id);
      }
      return true;
    });
    arr[index].every((item) => {
      if (
        temp.includes(item.id) &&
        !exactFlag.includes(item.id) &&
        !nearbyFlag.includes(item.id)
      ) {
        item.match = "nearby";
        nearbyFlag.push(item.id);
      } else if (item.match === null) {
        item.match = "none";
      }
      return true;
    });

    exactFlag = [];
    nearbyFlag = [];
    incorrectGuess.push(currentWord);
    setGuessedWords(arr);
    setIncorrectGuess(incorrectGuess);
    setIncorrectLetters();
  };

  const setIncorrectLetters = () => {
    let uniqueArr: string[] = [];

    incorrectGuess.forEach((item) => {
      let i = Array.from(new Set(item));

      i.forEach((item) => {
        if (!word.split("").includes(item)) {
          uniqueArr.push(item);
        }
      });
    });

    setIncorrectArr(uniqueArr);
  };

  const onGuessClear = () => {
    let index = incorrectGuess.length;
    let arr = [...guessedWords];

    if (index < 0 || arr[index].every((item) => item.id.length <= 0)) {
      return;
    }

    for (let i = WORD_SIZE - 1; i >= 0; i--) {
      if (arr[index][i].id !== "") {
        (arr[index][i].id = ""), (arr[index][i].match = null);
        break;
      }
    }

    setGuessedWords(arr);
  };

  const onGameOver = (): void => {
    setWord(getRandomWord());
    setIncorrectGuess([]);
    setIncorrectArr([]);
    setGuessedWords(
      Array.from({ length: CHANCES }, () =>
        Array.from({ length: WORD_SIZE }, () => ({ id: "", match: null }))
      )
    );
    setGameOver(null);
  };

  return (
    <div className="app">
      <div className="title">Wordle</div>
      <Board incorrectGuess={incorrectGuess} guessedWords={guessedWords} />
      {gameOver ? (
        <div className="gameover">
          <span>
            You {gameOver}. The word is
            <span className={`${gameOver === "won" ? "won" : "lost"}`}>
              {" "}
              {word}
            </span>
            .
          </span>
          <button onClick={onGameOver}>
            <span>Restart</span>
          </button>
        </div>
      ) : (
        <Keyboard
          addGuess={addGuess}
          guessedWords={guessedWords}
          incorrectGuess={incorrectGuess}
          onGuessSubmit={onGuessSubmit}
          onGuessClear={onGuessClear}
          incorrectArr={incorrectArr}
        />
      )}
    </div>
  );
};

export default App;

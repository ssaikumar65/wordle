import "./index.css";
import { BoardProps } from "../../data/types";
import { KEYS } from "../../data/constants";
import { useState } from "react";

const Keyboard = ({
  guessedWords,
  incorrectGuess,
  addGuess,
  onGuessClear,
  onGuessSubmit,
  incorrectArr,
}: BoardProps) => {
  const [help, setHelp] = useState(false);
  const onSubmit = (letter: string) => {
    if (letter === "enter") {
      onGuessSubmit();
      return;
    }
    if (letter === "clear") {
      onGuessClear();
      return;
    }
    if (letter === "help") {
      onHelp();
      return;
    }
    addGuess(letter);
  };

  const onHelp = () => {
    setHelp(true);
  };

  const disable = (letter: string): boolean => {
    if (
      letter === "enter" &&
      !guessedWords[incorrectGuess.length].every((item) => item.id.length > 0)
    )
      return true;
    if (incorrectArr.includes(letter)) return true;
    return false;
  };

  return (
    <div className="keyboardHolder">
      {help ? (
        <div className="keyboard">
          <span className="help title">How to Play</span>
          <span className="help">Guess the word in 5 tries.</span>
          <ul className="list">
            <li>Each guess must be a 5 letter word</li>
            <li>Each color of the tile specifies -</li>
            <li>
              <span className="green">Green</span> - The letter is in the
              correct spot.
            </li>
            <li>
              <span className="coral">Orange</span> - The letter is in the wrong
              spot.
            </li>
            <li>
              <span className="gray">Gray</span> - The letter is not in the
              word.
            </li>
          </ul>
          <button className="helpButton" onClick={() => setHelp(false)}>
            <span>Close</span>
          </button>
        </div>
      ) : (
        <div className="keyboard">
          {KEYS.map((keys, index) => (
            <div key={index} className="buttonHolder">
              {keys.map((letter) => (
                <button
                  disabled={disable(letter)}
                  key={letter}
                  onClick={() => onSubmit(letter)}
                  className="letter"
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Keyboard;

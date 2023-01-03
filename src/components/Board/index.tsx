import "./index.css";
import { Props } from "../../data/types";
import { CELL_SIZE, CHANCES } from "../../data/constants";

const Board = ({ guessedWords }: Props) => {
  return (
    <div className="board">
      <div className="cells">
        {guessedWords.map((word, index) => (
          <div
            key={index}
            style={{
              gridTemplateColumns: `repeat(${CHANCES},auto)`,
            }}
            className={`row `}
          >
            {word.map((letter, index) => (
              <div
                key={index}
                style={{
                  width: `${CELL_SIZE}vh`,
                  height: `${CELL_SIZE}vh`,
                }}
                className={`cell ${letter.id !== "" ? "zoom" : ""} ${
                  letter.match
                }`}
              >
                {letter.id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Board;

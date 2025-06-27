import { useReducer } from "react";
import "./App.css";

type gameAppState = {
  gameButtonDisabled: boolean;
  inputDisabled: boolean;
  guessBtnDisabled: boolean;
  gameInfo: string | null;
  numTrials: number;
  userGuess: string;
  randomSecretNumber: number | null;
};

type gameAction =
  | {
      type: "NEW_GAME";
    }
  | {
      type: "SET_USER_GUESS";
      payload: string;
    };

function reducerFunction(state: gameAppState, action: gameAction) {
  if (action.type === "NEW_GAME") {
    return {
      ...state,
      gameButtonDisabled: true,
      inputDisabled: false,
      guessBtnDisabled: false,
      randomSecretNumber: generateRandomNumber(),
      numTrials: 10,
    };
  }

  return state;
}

function generateRandomNumber() {
  return Math.trunc(Math.random() * 100);
}

function App() {
  const [state, dispatch] = useReducer(reducerFunction, {
    gameButtonDisabled: false,
    inputDisabled: true,
    guessBtnDisabled: true,
    gameInfo: null,
    numTrials: 0,
    userGuess: "",
    randomSecretNumber: null,
  });

  return (
    <>
      <section className="header">
        <h2 className="game-instructions">Guess a number between 1 and 100</h2>
        <button
          className="new-game-btn"
          disabled={state.gameButtonDisabled}
          onClick={() => dispatch({ type: "NEW_GAME" })}
        >
          New Game
        </button>
      </section>
      <section className="game-body">
        <form action="" className="game-form">
          {state.numTrials > 0 ? (
            <h2 className="trials-remaining">
              {state.numTrials} Trials Remaining
            </h2>
          ) : (
            <h2 className="trials-remaining">Press 'NewGame'</h2>
          )}
          <input
            type="number"
            placeholder="00"
            className="guess-input"
            readOnly={state.inputDisabled}
            value={state.userGuess}
            onChange={(e) =>
              dispatch({ type: "SET_USER_GUESS", payload: e.target.value })
            }
          />
          <p className="game-info">{state.gameInfo}</p>
          <button className="guess-btn" disabled={state.guessBtnDisabled}>
            Guess
          </button>
        </form>
      </section>
      <section className="footer">
        <h3 className="game-subtitle">Number Guessing Game</h3>
        <p className="copyright">&copy; 2025 Nxthxnael</p>
        <div className="social-icons">
          <a
            href="https://github.com/NathanaelMutua/number-guessing-game"
            className="social-link"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/nathanaelmutua/"
            className="social-link"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </section>
    </>
  );
}

export default App;

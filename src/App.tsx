import { useReducer } from "react";
import "./App.css";

type gameAppState = {
  gameButtonDisabled: boolean;
  inputDisabled: boolean;
  guessBtnDisabled: boolean;
  gameInfo: string | null;
  numTrials: number;
  userGuess: string;
  randomSecretNumber: number;
};

type gameAction =
  | {
      type: "NEW_GAME";
    }
  | {
      type: "SET_USER_GUESS";
      payload: string;
    }
  | {
      type: "GUESS_ACTION";
      payload: number;
    };

function reducerFunction(state: gameAppState, action: gameAction) {
  if (action.type === "NEW_GAME") {
    return {
      ...state,
      gameButtonDisabled: true,
      inputDisabled: false,
      guessBtnDisabled: false,
      randomSecretNumber: generateRandomNumber(),
      userGuess: "",
      numTrials: 10,
      gameInfo: "Good Luck !",
    };
  }

  if (action.type === "SET_USER_GUESS") {
    return {
      ...state,
      userGuess: action.payload,
    };
  }

  if (action.type === "GUESS_ACTION") {
    const trialNumber: number = state.numTrials - 1;

    if (trialNumber === 0) {
      return {
        ...state,
        gameButtonDisabled: false,
        inputDisabled: true,
        guessBtnDisabled: true,
        numTrials: trialNumber,
        gameInfo: "You Lost !",
      };
    }

    if (action.payload === state.randomSecretNumber) {
      return {
        ...state,
        gameInfo: `You won ! Your score is ${state.numTrials * 10}%`,
        guessBtnDisabled: true,
        gameButtonDisabled: false,
        inputDisabled: true,
      };
    }

    if (action.payload > state.randomSecretNumber) {
      return {
        ...state,
        numTrials: trialNumber,
        gameInfo: `${state.userGuess} is too High!`,
      };
    }

    if (action.payload < state.randomSecretNumber) {
      return {
        ...state,
        numTrials: trialNumber,
        gameInfo: `${state.userGuess} is too Low!`,
      };
    }
  }

  return state;
}

function generateRandomNumber() {
  const number = Math.trunc(Math.random() * 100);
  console.log(number);
  return number;
}

function App() {
  const [state, dispatch] = useReducer(reducerFunction, {
    gameButtonDisabled: false,
    inputDisabled: true,
    guessBtnDisabled: true,
    gameInfo: null,
    numTrials: 10,
    userGuess: "",
    randomSecretNumber: 0,
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
          <button
            className="guess-btn"
            type="button"
            disabled={state.guessBtnDisabled}
            onClick={() =>
              dispatch({
                type: "GUESS_ACTION",
                payload: Number(state.userGuess),
              })
            }
          >
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

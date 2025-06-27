import "./App.css";

function App() {
  return (
    <>
      <section className="header">
        <h2 className="game-instructions">Guess a number between 1 and 100</h2>
        <button className="new-game-btn">New Game</button>
      </section>
      <section className="game-body">
        <form action="" className="game-form">
          <h2 className="trials-remaining">10 Trials Remaining</h2>
          <input type="number" placeholder="00" className="guess-input" />
          <p className="game-info">20 is too high</p>
          <button className="guess-btn">Guess</button>
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

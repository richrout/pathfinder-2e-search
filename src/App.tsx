import "./App.css";
import Search from "./Search";

function App() {
  return (
    <div className="body-container column align-center gap-large">
      <header className="App-header">
        <h1>
          Pathfinder 2e Search{" "}
          <span className="icon-font">[three-actions]</span>
        </h1>
      </header>
      <Search />
    </div>
  );
}

export default App;

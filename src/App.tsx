import "./App.css";
import Search from "./Search";

function App() {
  return (
    <div className="body-container column align-center gap-large">
      <header className="App-header">
        <h1>
          Pathsearcher 2e <span className="icon-font">[three-actions]</span>
        </h1>
        <span>A Pathfinder 2e search based on Pathbuilder 2e data</span>
      </header>
      <Search />
    </div>
  );
}

export default App;

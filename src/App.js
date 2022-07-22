import logo from './logo.svg';
import './App.css';

function App() {

  let player = [2,5,10];

  const replay = () => {
    for(let i in player) {
      console.log(player[i]);
    }
  }

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {replay()}
    </div>
  );
}

export default App;

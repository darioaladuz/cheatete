import Links from './components/Links';
import "./App.scss";
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <header>
        <h1>cheatete</h1>
        <Login />
      </header>

      <Links />
    </div>
  )
}

export default App

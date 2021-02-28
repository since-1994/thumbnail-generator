import './app.css';
import Pallette from './components/pallette/pallette';

function App() {
  const colors = ["#4285F3", "#DA4537", "#F3B500", "#0D9D58", "#2D2D2D"];
  return (
    <div className="App">
      <Pallette colors= {colors} />
      <section></section>
    </div>
  );
}

export default App;

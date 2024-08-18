import './App.css';
import { Accordion } from './Components/Accordion';
import 'remixicon/fonts/remixicon.css'
import Sample from './Components/Sample';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2>Accordion</h2>

       <Accordion/>
       {/* <Sample/> */}
      </header>
    </div>
  );
}

export default App;

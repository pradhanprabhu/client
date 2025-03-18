import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Homescreen from './screens/Homescreen';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
      <Routes>
      <Route path="/home" exact Component ={Homescreen}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;



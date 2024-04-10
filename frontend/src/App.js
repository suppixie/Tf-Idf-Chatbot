import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
  </Routes>
    </div>
  );
}

export default App;

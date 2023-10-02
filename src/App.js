import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Shop from './components/Shop';
import User from './components/User';

function App() {
  return (
    <>
    <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/Laptop-Shop/' element={<Home />} exact/>
            <Route path='/Laptop-Shop/shop' element={<Shop />} />
            <Route path='/Laptop-Shop/cart' element={<Cart />} />
            <Route path='/Laptop-Shop/user' element={<User />} />
          </Routes>
        </Router>
    </div>
    </>
  );
}

export default App;

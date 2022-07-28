import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add' element={<AddEdit />}/>
        <Route path='/update/:id' element={<AddEdit />}/>
      </Routes>
      <ToastContainer position='top-right'/>
      </Router>
    </>
  );
}

export default App;

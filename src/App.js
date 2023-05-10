import './App.css';
import {Box} from '@mui/material'
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
function App() {
  return (
  <BrowserRouter>
    <Box>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;

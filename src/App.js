import './App.css';
import {Box} from '@mui/material'
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Show from './Component/Show';
function App() {
  return (
  <BrowserRouter>
    <Box>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Show/>}/>
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;

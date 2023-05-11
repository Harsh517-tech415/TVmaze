import './App.css';
import {Box} from '@mui/material'
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Show from './Component/Show';
import { createContext, useState } from 'react';
import Result from './Component/Result';
export const searchData=createContext();

function App() {
  const [result,setResult]=useState([])
  return (
  <BrowserRouter>
  <searchData.Provider value={{result:result,setResult:setResult}}>
    <Box>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Show/>}/>
        <Route path='result' element={<Result/>}/>

      </Routes>
    </Box>
    </searchData.Provider>
  </BrowserRouter>
  );
}

export default App;

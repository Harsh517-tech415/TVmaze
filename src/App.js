import './App.css';
import {Box} from '@mui/material'
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Show from './Component/Show';
import { createContext, useState } from 'react';
import Result from './Component/Result';
import Login from './Component/Login';
import BookMark from './Component/BookMark';
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
        <Route path="/login" element={<Login/>}/>
        <Route path='/bookmark' element={<BookMark/>}/>
      </Routes>
    </Box>
    </searchData.Provider>
  </BrowserRouter>
  );
}

export default App;

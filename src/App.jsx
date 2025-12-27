import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './Components/Header/Header'
import User from './/Pages/USER/User'
import Tech from './/Pages/TECH/Tech'
import Hod from './/Pages/HOD/Hod'
import Login from './Pages/Login/Login'


function App() {

  return (
  //  <BrowserRouter>
  //   <Header/>
  //   <Routes>
  //     <Route path="/" element={<User />} />
  //     <Route path="/hod" element={<Hod />} />
  //     <Route path="/tech" element={<Tech />} />
  //   </Routes>
  //  </BrowserRouter>

  <Login/>
  )
}

export default App

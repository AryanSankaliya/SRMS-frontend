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
import Footer from './Components/Footer/Footer'
import Forgot_Password from './Pages/Forgot_password/Forgot_password'
import Sidebar from './Components/Sidebar/Sidebar'


function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/hod" element={<Hod />} />
      <Route path="/tech" element={<Tech />} />
      <Route path="/forgot-password" element={<Forgot_Password />} />
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
   </BrowserRouter> 
  )
}

export default App

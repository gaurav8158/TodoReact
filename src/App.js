import React, { useState } from 'react'
import Cardbox from './Components/Cardbox'
import Todo from './Components/Todo'
import Navbar from './Components/Navbar'
import "./App.css"
import Footer from './Components/Footer'

const App = () => {

  return (
    <div>
      <Navbar />
      <Todo />
      <Footer/>
    </div>
  )
}

export default App
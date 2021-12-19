// eslint-disable-next-line no-use-before-define
import React from 'react'
import './App.css'
import MenuAppBar from './Components/MenuAppBar'
import { Routes, Route } from 'react-router-dom'
import RankByYear from './Components/RankByYear'
import Container from '@mui/material/Container'
import Home from './Components/Home'
function App () {
  return (
    <div className="App">
      <MenuAppBar></MenuAppBar>
      <Container fixed>
        <Routes>
          <Route path="/:id" element={<RankByYear />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App

import React from 'react'
import ProgressBar from './ProgressTab/ProgressBar'
import SeeMyData from './SeeMyData/SeeMyData'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element = {<ProgressBar/>} path="/"/>
        <Route element = {<SeeMyData/>} path="/see-my-data"/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
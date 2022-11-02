import React from 'react'
import { Container } from "react-bootstrap"
import Home from "./components/Home.js"
import Past_Events from './components/Past_Events.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return <Container fluid style={{width: "100%", height: "100vh", paddingLeft: "0", paddingRight: "0"}}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Past_Events />}></Route>
      </Routes>
    </Router>
  </Container>
}


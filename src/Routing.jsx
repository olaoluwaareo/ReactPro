import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import AddTodo from './Component/AddTodo';
import ViewTodo from './Component/ViewTodo';


const Routing = () => {
  return (

    <Router>
    <Routes>
      <Route path="/" element={<AddTodo />} />
      <Route path="/viewtodo" element={<ViewTodo />} />

      </Routes>
      </Router>
  )
}

export default Routing
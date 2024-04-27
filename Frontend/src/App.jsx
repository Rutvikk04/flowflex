import React from 'react';
import 'reactflow/dist/style.css';
import NodeCanvas from './pages/nodePages/nodeCanvas';
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/Main/protectedRoute';
import FilePage from './pages/filePage';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Main/nav';
import AllWorkflows from './pages/allWorkflows';





export default function App() {

  return (
    <>
    <Nav/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/workflow-canvas' element={<ProtectedRoute Component={NodeCanvas} />} />
        <Route path='/all-workflow' element={<ProtectedRoute Component={AllWorkflows} />} />
        <Route path='/file-operation' element={<ProtectedRoute Component={FilePage} />} />
      </Routes>
      <ToastContainer/>

    </>

  );

}
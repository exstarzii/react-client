import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import User from './Pages/User';
import ErrorPage from './Pages/ErrorPage';
import UserEdit from './Pages/UserEdit';
import People from './Pages/People';
import Friends from './Pages/Friends';
import Post from './Pages/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/user/:id" element={<User />}/>
        <Route path="/useredit" element={<UserEdit />}/>
        <Route path="/people" element={<People />}/>
        <Route path="/friends" element={<Friends />}/>
        <Route path="/posts" element={<Post />}/>
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

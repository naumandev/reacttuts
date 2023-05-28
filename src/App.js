import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Header from './Components/header';
import Login from './Components/login'
import Signup from './Components/signup'

function App() {

  const registeredUsers = [
    {
      name: "Nauman Bashir",
      email: "nomidev@me.com",
      password: "Secret123",
      cnic: "3520241445273",
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState("login");

  const handleLogin = (loginUser) => {
    const regUser = registeredUsers.filter((user) => {
      return loginUser.email === user.email && loginUser.password === user.password
    })

    
    if (regUser.length > 0) {
      setIsLoggedIn(true);
    } else {
      setMessage('The user is not registered')
    }
  };

  const handleShowPage = (page) => {
    // console.log(page);
    setPage(page)
  };

  return (
    <div className="App">
      <Header setShowPage={handleShowPage}/>
      {isLoggedIn ? <><h2>Dashboard</h2><p>Users List</p></> : 
      (page == 'login' ? <Login loginUser={handleLogin} showMessage={message}/> : <Signup loginUser={handleLogin} showMessage={message}/>)}

    </div>
  );
}

export default App;

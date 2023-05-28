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
      loginAttempts: 0
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setloggedInUserName] = useState('');
  const [message, setMessage] = useState('');
  const [page, setPage] = useState("login");

  const handleLogin = (user) => {
    let _user = registeredUsers.filter((regUser) => {
      return user.email === user.email && user.password === regUser.password
    })

    if (_user.length > 0) {
      setIsLoggedIn(true);
      setloggedInUserName(_user[0]['name'])
    } else {
      setMessage('The user is not registered')
    }
  };

  const handleLogout = (user) => {
    setIsLoggedIn(false);
    setloggedInUserName('')
  };

  const handleShowPage = (page) => {
    setPage(page)
  };

  return (
    <div className="App">
      <Header 
        routePageAction={handleShowPage} 
        showLoggedInUserName={loggedInUserName} 
        logoutAction={handleLogout}
      />
      {isLoggedIn ? 
        <><h2>Dashboard</h2><p>Users List</p></> : 
        (page == 'login' ? 
          <Login 
            loginUser={handleLogin} 
            showMessage={message}
          /> : 
          <Signup 
            loginUser={handleLogin} 
            showMessage={message}
          />
        )}

    </div>
  );
}

export default App;

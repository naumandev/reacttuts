import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Header from './Components/header';
import Login from './Components/login'
import Signup from './Components/signup'
import ListView from './Components/list-view'

function App() {

  const registeredUsers = [
    {
      name: "Nauman Bashir",
      email: "nomidev@me.com",
      password: "Secret123",
      address: "House # 123 Queens Road",
      cnic: "1234567891234",
      loginAttempts: 0
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setloggedInUserName] = useState('');
  const [message, setMessage] = useState('');
  const [page, setPage] = useState("login");
  const [successMsg, setSuccessMsg] = useState('');
  const [users, setUsers] = useState(registeredUsers);


  const handleUserRegistration = (user) => {
    let registeredUser = registeredUsers.filter((regUser) => {
      return user.email === regUser.email
    })

    if (registeredUser.length > 0) {
      setMessage('The user is already registered!');
      return;
    }

    user.loginAttempts = 0;

    setUsers([...users, user]);
    setSuccessMsg(user.name + ' have signed up successfully!');
  }

  const handleLogin = (user) => {
    let registeredUser = users.find((regUser) => {
      return user.email === regUser.email
    })

    if (!registeredUser) {
      setMessage('The user is not registered')
      return;
    }

    if (registeredUser.loginAttempts >= 3) {
      setMessage('You have been blocked!')
      return
    }

    if (user.password !== registeredUser.password) {
      setMessage('The password is incorrect')
      registeredUser.loginAttempts += 1
      console.log(registeredUser.loginAttempts);
      return
    }

    setIsLoggedIn(true);
    setloggedInUserName(registeredUser.name)
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
        <ListView 
          users={users}
        /> : 
        (page == 'login' ? 
          <Login 
            loginUser={handleLogin} 
            showMessage={message}
          /> : 
          <Signup 
            registerUser={handleUserRegistration} 
            showMessage={message}
            showSuccess={successMsg}
            redirectPage={handleShowPage}
          />
        )}

    </div>
  );
}

export default App;

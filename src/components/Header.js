import React from "react";

function Header({LogoutFunction, isLoggedIn}){
  return(
    <header className ="Header">
      <div className = "Header_wrapper">
        <img className = "Header_logo" src="https://i.ya-webdesign.com/images/yoga-clip-borders-3.png" alt="Logo"/>
        <nav className = "Header_nav">
          {isLoggedIn && <a href="/">Profile</a>}
          {!isLoggedIn && <a href="/create-account">Create Account</a>}
          {!isLoggedIn && <a href="/login">Login</a>}
          {isLoggedIn && (
            <a onClick={() => LogoutFunction()}>
            Log Out
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

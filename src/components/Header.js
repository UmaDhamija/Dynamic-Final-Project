import React from "react";

function Header({LogoutFunction, isLoggedIn}){
  return(
    <header className ="Header">
      <div className = "Header_wrapper">
        <div className = "Header_logo">LOGO</div>
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

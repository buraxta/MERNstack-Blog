import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => setUserInfo(userInfo));
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <>
      <main>
        <header>
          <Link to="/" className="logo">
            My Blog
          </Link>
          <nav>
            {userInfo && (
              <>
                <Link to="/create">Create new post</Link>
                <a onClick={logout}>Logout</a>
              </>
            )}
            {!userInfo && (
              <>
                <Link to="/login">Login</Link>
                <Link to="register">Register</Link>
              </>
            )}
          </nav>
        </header>
        <Outlet context={[userInfo, setUserInfo]} />
      </main>
    </>
  );
};

export default Header;

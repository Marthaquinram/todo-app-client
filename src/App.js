import React from "react";
import LoginButton from "./auth/LoginButton"
import LogoutButton from "./auth/LogoutButton";
import Profile from "./auth/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";




function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main className="column">
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>

  );
}

export default App;

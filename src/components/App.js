import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import SavedMovies from "./SavedMovies/SavedMovies";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  const handleBurgerClick = () => {
    setIsMobile(!isMobile);
  };

  const handleMobileMenuClick = () => {
    setIsMobile(false);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Header
                isMobile={isMobile}
                handleBurgerClick={handleBurgerClick}
                handleMobileMenuClick={handleMobileMenuClick}
              />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header
                isMobile={isMobile}
                handleBurgerClick={handleBurgerClick}
                handleMobileMenuClick={handleMobileMenuClick}
              />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                isMobile={isMobile}
                handleBurgerClick={handleBurgerClick}
                handleMobileMenuClick={handleMobileMenuClick}
              />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route path="/profile" element={
          <>
            <Header
                isMobile={isMobile}
                handleBurgerClick={handleBurgerClick}
                handleMobileMenuClick={handleMobileMenuClick}
              />
            <Profile />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

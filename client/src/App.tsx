import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Welcome from "./components/welcome";
import Navbar from "./components/navbar";
import Login from "./components/login";
import UserHome from "./components/userHome";

function App() {

  const [logged, setLogged] = useState(false);


  return (
    <>



      <Router>

        <Navbar logged={logged} setLogged={setLogged}></Navbar>
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
          <Route path="/user/home" element={<UserHome />} />

        </Routes>

      </Router>

    </>
  );
}

export default App;

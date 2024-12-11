import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Welcome from "./components/welcome";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import AddBus from "./pages/Addbus";
import UserHome from "./components/userHome";
import AdminHome from "./components/adminHome";


function App() {
  return (
    <>
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/add-bus" element={<AddBus />} />
        </Routes>

      </Router>

    </>
  );
}

export default App;

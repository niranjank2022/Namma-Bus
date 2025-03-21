import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";

import UserLogin from "./components/User/userLogin";
import UserSearch from "./components/User/userSearch";
import ViewTrips from "./components/User/viewTrips";

import AdminLogin from "./components/Admin/adminLogin";
import AdminBuses from "./components/Admin/adminBuses";
import AdminTrips from "./components/Admin/adminTrips";
import AddBus from "./components/Addbus";
import UserProfile from "./components/UserProfile";


export default function App() {
  return (
    <>
      <Router>

        <Navbar />

        <Routes>
          <Route element={<UserSearch />} path="/" />
          <Route element={<ViewTrips />} path="/buses/search" />
          <Route element={<UserLogin />} path="/login" />
          <Route element={<UserProfile />} path="/profile" />

          <Route element={<AdminLogin />} path="/admin/login" />
          <Route element={<AdminBuses />} path="/admin/buses" />
          <Route element={<AddBus />} path="/admin/buses/add-bus" />
          <Route element={<AdminTrips />} path="/admin/buses/:busId/trips" />
        </Routes>
      </Router>
    </>
  );
}

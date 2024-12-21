import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";

import UserLogin from "./pages/User/userLogin";
import UserSearch from "./pages/User/userSearch";
import ViewTrips from "./pages/User/viewTrips";

import AdminLogin from "./pages/Admin/adminLogin";
import AdminBuses from "./pages/Admin/adminBuses";
import AdminTrips from "./pages/Admin/adminTrips";
import AddBus from "./pages/Addbus";


export default function App() {
  return (
    <>
      <Router>

        <Navbar />

        <Routes>
          <Route element={<UserLogin />} path="/login" />
          <Route element={<UserSearch />} path="/" />
          <Route element={<ViewTrips />} path="/buses/search" />

          <Route element={<AdminLogin />} path="/admin/login" />
          <Route element={<AdminBuses />} path="/admin/buses" />
          <Route element={<AddBus />} path="/admin/buses/add-bus" />
          <Route element={<AdminTrips />} path="/admin/buses/:busId/trips" />
        </Routes>
      </Router>
    </>
  );
}

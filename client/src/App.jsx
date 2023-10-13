import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AddRoom,
  AdminDashboard,
  BookingConfirmation,
  Checkout,
  Landing,
  Rooms,
  Signin,
  UpdateRoom,
} from "./pages";
import ProtectAdminRoute from "./utils/ProtectAdminRoute";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/rooms" element={<Rooms />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route
        exact
        path="/booking-confirmation/:id"
        element={<BookingConfirmation />}
      />
      <Route
        exact
        path="/admin"
        element={
          <ProtectAdminRoute>
            <AdminDashboard />
          </ProtectAdminRoute>
        }
      />
      <Route
        exact
        path="/admin/add_room"
        element={
          <ProtectAdminRoute>
            <AddRoom />
          </ProtectAdminRoute>
        }
      />
      <Route
        exact
        path="/admin/edit_room/:roomId"
        element={
          <ProtectAdminRoute>
            <UpdateRoom />
          </ProtectAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;

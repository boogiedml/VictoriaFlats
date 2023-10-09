import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  About,
  AddCategory,
  AddProduct,
  AdminDashboard,
  Cart,
  Checkout,
  Contact,
  Landing,
  Rentals,
  Signin,
  UpdateProduct,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route exact path="/rentals" element={<Rentals />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path="/admin" element={<AdminDashboard />} />
      <Route
        exact
        path="/admin/add_product"
        element={
          // <ProtectAdminRoute>
          <AddProduct />
          // </ProtectAdminRoute>
        }
      />
      <Route
        exact
        path="/admin/edit_product/:productId"
        element={
          // <ProtectAdminRoute>
          <UpdateProduct />
          // </ProtectAdminRoute>
        }
      />
      <Route
        exact
        path="/admin/add_category"
        element={
          // <ProtectAdminRoute>
          <AddCategory />
          // </ProtectAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;

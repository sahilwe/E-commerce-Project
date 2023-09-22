import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div>
      <div className="text-center ">
        <div classname="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            classname="list-group-item list-group-item-action"
          >
            create category
          </NavLink>
          <hr></hr>
          <br></br>
          <NavLink
            to="/dashboard/admin/create-product"
            classname="list-group-item list-group-item-action "
          >
            create Product
          </NavLink>
          <hr></hr>
          <br></br>
          <NavLink
            to="/dashboard/admin/products"
            classname="list-group-item list-group-item-action "
          >
            All Products
          </NavLink>
          <hr></hr>
          <br></br>
          <NavLink
            to="/dashboard/admin/user"
            classname="list-group-item list-group-item-action"
          >
            User
          </NavLink>
          <hr></hr>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div classname="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            classname="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <hr></hr>
          <br></br>
          <NavLink
            to="/dashboard/user/orders"
            classname="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>

          <hr></hr>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const User = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="container1 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>User</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;

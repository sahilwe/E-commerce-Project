import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
const Orders = () => {
  const [order, setOrder] = useState([]);

  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/auth/orders"
      );
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Orders"}>
      <div className='"container-fluid p-3 m-3'>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <td scope="col">#</td>
                    <td scope="col">Status</td>
                    <td scope="col">Buyer</td>
                    <td scope="col">Orders</td>
                    <td scope="col">Payment</td>
                    <td scope="col">Quantity</td>
                    <td scope="col">Products_Name</td>
                  </tr>
                </thead>

                {order?.map((o, i) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="col">{i + 1}</th>
                        <th>
                          <div className="btn btn-outline-danger">
                            {o?.status}
                          </div>
                        </th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createdAt).fromNow()}</th>
                        <th>{o?.payment.success ? "Success" : "Failed"}</th>
                        <th>{o?.products?.length}</th>
                        <th>{o?.products?.name}</th>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="container">
                {order?.products?.map((p) => {
                  return (
                    <div className="row mb-2 p-3 card flex-row ">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          height={"200px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <h4>{p.name}</h4>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: ${p.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

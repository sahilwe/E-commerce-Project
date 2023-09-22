import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [order, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/all-orders`
      );
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrder();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      console.log(value);
      getAllOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          <table className="table">
            <thead>
              <tr>
                <td scope="col">#</td>
                <td scope="col">Status</td>
                <td scope="col">Buyer</td>
                <td scope="col">Orders</td>
                <td scope="col">Payment</td>
                <td scope="col">Quantity</td>
              </tr>
            </thead>

            {order?.map((o, i) => {
              return (
                <tbody>
                  <tr>
                    <th scope="col">{i + 1}</th>
                    <td>
                      <select
                        className="btn btn-outline-warning"
                        bordered={false}
                        onChange={(e) => {
                          handleChange(o._id, e.target.value);
                        }}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

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
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;

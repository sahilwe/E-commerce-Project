import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState();
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-Us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCardItem = (pid) => {
    try {
      if (auth?.token) {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === pid);
        myCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(myCart));
        setCart(myCart);
      } else {
        toast.error("Please login to Change in Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/braintree/token"
      );
      console.log(data?.clientToken);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please Login to Checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => {
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
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCardItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()} </h4>
            <h6>Current Address:{auth?.user?.address}</h6>

            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />

                  <button
                    className="btn btn-primary"
                    disabled={
                      loading ||
                      !instance ||
                      !auth?.user?.address ||
                      !auth?.token
                    }
                    onClick={handlePayment}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </Layout>
  );
};

export default CartPage;

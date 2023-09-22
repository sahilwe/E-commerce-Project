import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");

  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forget-password",
        {
          email,
          newpassword,
          answer,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce"}>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              type="text"
              value={email}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Security Question
            </label>
            <input
              type="text"
              value={answer}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Favourite Sports"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newpassword}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setnewPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            CHANGE PASSWORD
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ForgotPassword;

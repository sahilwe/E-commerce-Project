import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Register-Ecommerce App">
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
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              ForgotPassword
            </button>
          </div>
          <button type="submit" class="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Register;

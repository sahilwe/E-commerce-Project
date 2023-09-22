import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name,
          email,
          phone,
          password,
          address,
          answer,
        }
      );
      if (response.data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      } else {
        toast.error("Already exist");
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
              Name
            </label>
            <input
              type="text"
              value={name}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
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
            <label for="exampleInputEmail1" class="form-label">
              Phone
            </label>
            <input
              type="Phone"
              value={phone}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Phone No."
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Address"
              onChange={(e) => {
                setAddress(e.target.value);
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
              placeholder="Write Your Favourite Sports "
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Register;

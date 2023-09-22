import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { name, email, phone, password, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setPassword(password);
    setAddress(address);
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title="Register-Ecommerce App">
      <div className='"container-fluid p-3 m-3'>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-3">
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

                <button type="submit" class="btn btn-primary">
                  UPDATE PROFILE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default Profile;

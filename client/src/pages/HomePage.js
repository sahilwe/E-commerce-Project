import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState("");
  const [cart, setCart] = useCart([]);

  const navigate = useNavigate();
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.getcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categroy");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get Filtered PRoduct
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products-Best Offers"}>
      <div className="row">
        <div className="col-md-3 d-flex flex-column">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => {
              return (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              );
            })}
          </div>
          <h6 className="text-center">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setPrice(e.target.value)}>
              {Prices?.map((p) => {
                return (
                  <Radio key={p._id} value={p.array}>
                    {p.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
          <button
            className="btn btn-danger m-3"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products </h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 15)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Add To Cart Successfully!");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </Layout>
  );
};
export default HomePage;

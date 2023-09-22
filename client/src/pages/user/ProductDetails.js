import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedproduct, setRelatedproduct] = useState([]);
  const [productcategory, setCategory] = useState("");
  const [cart, setCart] = useCart();
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.products);
      setCategory(data?.products?.category?.name);
      getSimilarProduct(data?.products?._id, data?.products?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      console.log("Hello");
      setRelatedproduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-5">
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-5">
          <h1>Product Details </h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Categroy:{productcategory}</h6>
          <h6>shipping: {product.shipping ? "Yes" : "No"}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            Add To Cart
          </button>
        </div>
        <div className="row container">
          <h6>Similar Product</h6>
          {relatedproduct.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedproduct?.map((p) => (
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
                  <button class="btn btn-secondary ms-1">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

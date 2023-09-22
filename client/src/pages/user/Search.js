import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSearch } from "../../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                  <button class="btn btn-primary ms-1">More Details</button>
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

export default Search;

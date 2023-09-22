import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login", { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <div className="d-flex flex-columns justify-content-center align-items-center">
        <div className="Text-center"> redirecting to login in {count}</div>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;

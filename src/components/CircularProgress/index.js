import React from "react";
import loader from "../../assets/img/loader.svg"

const CircularProgress = ({ className }) => {
return (
  <div className={`loader ${className}`}>
    {/* <img src={loader} alt="loader" /> */}
  </div>
  );
}
export default CircularProgress;

import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo-transperant.png";

function OPP2016Template() {
  const { state } = useLocation();
  const { productKey, auth } = state;
  return (
    <div className='home d-flex justify-content-center align-items-center flex-direction-column flex-column '>
      <img src={logo} alt='Displaypin logo' className='logo mb-5' />
      <div className='template'>
        <h1 className='product-key'>Product key: {productKey}</h1>
        <ol>
          <li>Go to setup.office.com</li>
          <li>Create/login to your Microsoft Account</li>
          <li>Enter your Product key</li>
          <li>Select Country & Language Begin Download</li>
          <li>Run downloaded setup to install</li>
        </ol>
      </div>
    </div>
  );
}

export default OPP2016Template;

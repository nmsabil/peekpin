import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";

function OPP2016Template() {
  const { state } = useLocation();
  const { productKey, auth, software, email, uniqueCode, status } = state;

  return (
    <div className='templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '>
      <div className='template'>
        <div className='product-key px-5 py-5 text-dark rounded text-center'>
          <a href=''>
            <img src={logo} alt='Displaypin logo' className='logo mb-5 w-50' />
          </a>
          <h5 className='text-left'> Product key:</h5>
          <h3 className='mb-0'>
            <Form.Control
              disabled
              className='inputToDisplayLicense'
              value={productKey}
            />
          </h3>
          {software === "2021" ? (
            "2021"
          ) : (
            <div className='instruct'>
              <h5 className='mt-5 text-left'>Download Steps:</h5>
              <ol className=' instructions'>
                <li>
                  Go to <a href='setup.office.com'>setup.office.com</a>{" "}
                </li>
                <li>Create/login to your Microsoft Account</li>
                <li>Enter your Product key</li>
                <li>Select Country & Language Begin Download</li>
                <li>Run downloaded setup to install</li>
              </ol>
              <p className='mt-5'>
                A copy of the product key and download intructions is also be
                sent to {email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OPP2016Template;

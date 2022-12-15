import React from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import parse from "html-react-parser";
function SuccessBlock(props) {
  return (
    <div className='template'>
      <div className='product-key px-5 py-5 text-dark rounded text-center'>
        <a href=''>
          <img src={logo} alt='Displaypin logo' className='logo mb-5 w-50' />
        </a>

        <h2 className='text-left'> Product key for Office {props.software}:</h2>
        <h3
          className='mb-0'
          onClick={() => navigator.clipboard.writeText(props.productKey)}
        >
          <Form.Control
            disabled
            style={{ cursor: "text" }}
            className='inputToDisplayLicense'
            value={props.productKey}
          />
        </h3>
        <div className='instruct'>
          <div className='text-left'>
            {props.value ? parse(props.value) : ""}
          </div>
        </div>
        <p className='text-left mt-5'>
          The product key and download intructions have also been sent to{" "}
          {props.email}
        </p>
      </div>
    </div>
  );
}

export default SuccessBlock;

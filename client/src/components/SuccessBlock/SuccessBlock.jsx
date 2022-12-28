import React, { useState, useRef } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import parse from "html-react-parser";
import { Button, Overlay, Tooltip } from "react-bootstrap";
function SuccessBlock(props) {
  const target = useRef(null);
  const [show, setShow] = useState(false);

  const copyOnClick = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <div className='template'>
      <div className='product-key px-5 py-5 text-dark rounded text-center'>
        <a href='softwarepin.com'>
          <img src={logo} alt='Displaypin logo' className='logo mb-5 w-50' />
        </a>

        <h2 className='text-left'>
          Product {props.multiple ? "keys" : "key"} for Office {props.software}:
        </h2>
        <h3
          className='mb-0'
          onClick={() => navigator.clipboard.writeText(props.productKey)}
        >
          <div className='copy'>
            <Form.Control
              disabled
              style={{ cursor: "text" }}
              className='inputToDisplayLicense'
              value={props.productKey}
            />
            <Button
              className='copy-btn'
              ref={target}
              onClick={() => copyOnClick()}
            >
              Copy
            </Button>
            <Overlay target={target.current} show={show} placement='bottom'>
              {(props) => (
                <Tooltip id='overlay-example' {...props}>
                  Copied
                </Tooltip>
              )}
            </Overlay>
          </div>
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

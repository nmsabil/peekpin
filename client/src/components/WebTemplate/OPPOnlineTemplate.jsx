import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import parse from "html-react-parser";

function OPP2016Template() {
  const { state } = useLocation();
  const { productKey, auth, software, email, uniqueCode } = state;
  const [value, setValue] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Web Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          software === "Pro Plus 2016" &&
          doc.data().software === "Pro Plus 2016"
        ) {
          setValue(doc.data().html);
        } else if (
          software === "Pro Plus 2019" &&
          doc.data().software === "Pro Plus 2019"
        ) {
          setValue(doc.data().html);
        }
      });
    });
    return () => unsub();
  }, [value]);

  return (
    <div className='templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '>
      <div className='template'>
        <div className='product-key px-5 py-5 text-dark rounded text-center'>
          <a href=''>
            <img src={logo} alt='Displaypin logo' className='logo mb-5 w-50' />
          </a>

          <h5 className='text-left'> Product key for Office {software}:</h5>
          <h3
            className='mb-0'
            onClick={() => navigator.clipboard.writeText(productKey)}
          >
            <Form.Control
              disabled
              style={{ cursor: "text" }}
              className='inputToDisplayLicense'
              value={productKey}
            />
          </h3>
          <div className='instruct'>
            <h5 className='mt-5 text-left'>Download Steps:</h5>
            <div className='text-left'>{value ? parse(value) : ""}</div>

            <p className='mt-5'>
              A copy of the product key and download intructions is successfully
              sent to {email}
              <br />
              {/* <p className='text-center mt-5'>Unique code used: {uniqueCode}</p> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPP2016Template;

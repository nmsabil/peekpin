import React, { useRef, useState } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GetCustomerData from "../../api/GetCustomerData.jsx";
import GetProductKeysData from "../../api/GetProductKeysData";
import GetUniqueCodesData from "../../api/GetUniqueCodesData";

function Home() {
  const navigate = useNavigate();
  // Office pp 2016 data
  const OPP16UC = GetUniqueCodesData("Unique code 2016");
  const OPP16PK = GetProductKeysData("Product key 2016");
  const OPP19UC = GetUniqueCodesData("Unique code 2019");
  const OPP19PK = GetProductKeysData("Product key 2019");
  // customer data
  const customerData = GetCustomerData();
  // message
  const [message, setMessage] = useState("");
  // input fields
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUniqueCode, setEnteredUniqueCode] = useState("");

  const form = useRef();

  const sendEmail = async (
    enteredEmail,
    enteredName,
    enteredUniqueCode,
    refofCustomer
  ) => {
    const data = {
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      refofCustomer,
    };

    let status;
    await axios
      .post("http://localhost:5000/api/sendemail", data)
      .then((res) => {
        if (res.status === 200) {
          status = "Sent";
        }
      })
      .catch((err) => {
        status = "Failed";
      });

    await updateDoc(refofCustomer, {
      Sent: status,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    // check to find if the unique code is used or new in firebase
    let foundInCustomerData = customerData.find(
      (o) => o.UniqueCode === e.target[1].value
    );
    let foundunique2016 = OPP16UC.find(
      (o) => o.UniqueCode === e.target[1].value
    );
    let foundunique2019 = OPP19UC.find(
      (o) => o.UniqueCode === e.target[1].value
    );
    if (foundInCustomerData) {
      existingCustomer(foundInCustomerData, enteredEmail);
    } else if (foundunique2016) {
      newCustomer(foundunique2016, "2016", OPP16PK);
    } else if (foundunique2019) {
      newCustomer(foundunique2019, "2019", OPP19PK);
    } else {
      setMessage("no found");
    }
  };

  // Updated uc & pk status, adds cd, navigates to pk page and emails
  let newCustomer = async (foundUnique, year, pkData) => {
    let activeProductKey = pkData
      .slice()
      .reverse()
      .find((obj) => obj.Status === "Active");
    if (activeProductKey) {
      const refuc = doc(db, `Unique code ${year}`, foundUnique.id);
      await updateDoc(refuc, {
        Status: false,
      });
      const refpk = doc(db, `Product key ${year}`, activeProductKey.id);
      await updateDoc(refpk, {
        Status: false,
      });
      let newCustomerRef = await addDoc(collection(db, "Customer data"), {
        Email: enteredEmail,
        Name: enteredName,
        ProductKey: activeProductKey.ProductKey,
        Time: new Date(),
        UniqueCode: enteredUniqueCode,
        Year: year,
      });
      navigate("/authorized", {
        state: {
          productKey: activeProductKey.ProductKey,
          auth: true,
          software: year,
          email: enteredEmail,
          uniqueCode: enteredUniqueCode,
        },
      });
      sendEmail(enteredEmail, enteredName, enteredUniqueCode, newCustomerRef);
    } else {
      setMessage("maintenance");
    }
  };

  let existingCustomer = async (foundCustomer) => {
    navigate("/authorized", {
      state: {
        productKey: foundCustomer.ProductKey,
        auth: true,
        software: foundCustomer.Year,
        email: enteredEmail,
        uniqueCode: enteredUniqueCode,
      },
    });
    const refcd = doc(db, "Customer data", foundCustomer.id);
    await updateDoc(refcd, {
      Email: enteredEmail,
      Name: enteredName,
      UniqueCode: enteredUniqueCode,
    });

    sendEmail(enteredEmail, enteredName, enteredUniqueCode, refcd);
  };

  return (
    <div className='home d-flex justify-content-center align-items-center flex-direction-column flex-column'>
      <img src={logo} alt='Displaypin logo' className='logo mb-5' />
      <Form onSubmit={handleSubmit} ref={form} className='form'>
        {message ? <Alert variant='danger'>{message}</Alert> : ""}

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='from_name'
            required
            type='text'
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            placeholder='Enter your name'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='uniqueCode'>
          <Form.Label>Unique code</Form.Label>
          <Form.Control
            name='uc'
            value={enteredUniqueCode}
            onChange={(e) => setEnteredUniqueCode(e.target.value)}
            required
            type='text'
            placeholder='Enter your unique code'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='to_name'
            required
            type='email'
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
            placeholder='Enter your Email'
          />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Home;

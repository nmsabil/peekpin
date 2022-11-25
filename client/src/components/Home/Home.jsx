import React, { useEffect, useRef, useState } from "react";
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

  const [message, setMessage] = useState("");
  const [activeProductKey, setActiveProductKey] = useState("");
  const [activeProductKeyID, setActiveProductKeyID] = useState("");
  const [activeUniqueCodeID, setActiveUniqueCodeID] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUniqueCode, setEnteredUniqueCode] = useState("");

  const [whichLicense, setWhichLicense] = useState("");

  const [foundUniqueCode, setFoundUniqueCode] = useState(false);

  const form = useRef();

  const sendEmail = async (
    enteredEmail,
    enteredName,
    enteredUniqueCode,
    activeProductKey,
    whichLicenseState
  ) => {
    const data = {
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      activeProductKey,
      whichLicenseState,
    };

    await axios.post("http://localhost:5000/api/sendemail", data);
  };

  let UniqueCodeLogic = (e, objectuc, which, pkTable) => {
    // if unique code is inactive but exists in the table then update customer data and resend email
    if (
      objectuc.Status === "Inactive" &&
      objectuc.UniqueCode === e.target[1].value
    ) {
      setMessage("");
      customerData.forEach((each) => {
        if (each.UniqueCode === e.target[1].value) {
          navigate("/authorized", {
            state: {
              productKey: each.ProductKey,
              auth: true,
              software: whichLicense,
              email: enteredEmail,
              uniqueCode: enteredUniqueCode,
            },
          });
          UpdateExisting(each);
        }
      });
      // if unique code is inactive but exists in the table then find an active product key from the correct table and send email
    } else if (
      objectuc.Status === "Active" &&
      objectuc.UniqueCode === e.target[1].value
    ) {
      pkTable.forEach((objectpk) => {
        if (objectpk.Status === "Active") {
          setActiveProductKey(objectpk.ProductKey);
          setActiveProductKeyID(objectpk.id);
          setWhichLicense(which);
          setFoundUniqueCode(true);
          setActiveUniqueCodeID(objectuc.id);
          setMessage("");
          sendEmail(
            enteredEmail,
            enteredName,
            enteredUniqueCode,
            activeProductKey,
            whichLicense
          );
        } else {
          // if no active product key is in the table show message.
          setMessage("Our system is under maintenance for 6 hours");
        }
      });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    // find unique codes in one of the tables
    let uniqueCodeFound2016 = OPP16UC.find(
      (o) => o.UniqueCode === e.target[1].value
    );
    let uniqueCodeFound2019 = OPP19UC.find(
      (o) => o.UniqueCode === e.target[1].value
    );

    // check in which table the unique code was found and pass correct arguments.
    if (uniqueCodeFound2016) {
      UniqueCodeLogic(e, uniqueCodeFound2016, "2016", OPP16PK);
    } else if (uniqueCodeFound2019) {
      UniqueCodeLogic(e, uniqueCodeFound2019, "2019", OPP19PK);
    } else {
      setMessage("Invalid Unique code");
    }
  };

  // helper function to update doc when inactive unique code is entered.
  let UpdateExisting = async (cd) => {
    const refcd = doc(db, "Customer data", cd.id);
    await updateDoc(refcd, {
      Email: enteredEmail,
      Name: enteredName,
      UniqueCode: enteredUniqueCode,
    });
    sendEmail(
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      cd.ProductKey,
      whichLicense
    );
  };

  useEffect(() => {
    //  runs if foundUniqueCode is true and active product key is available
    // when user enteres the code for the first time.
    if (foundUniqueCode && activeProductKey.length > 0) {
      async function addToCustomerDataTable() {
        await addDoc(collection(db, "Customer data"), {
          Email: enteredEmail,
          Name: enteredName,
          ProductKey: activeProductKey,
          Time: new Date(),
          UniqueCode: enteredUniqueCode,
          Year: whichLicense,
        });
        const refuc = doc(
          db,
          `Unique code ${whichLicense}`,
          activeUniqueCodeID
        );
        await updateDoc(refuc, {
          Status: false,
        });
        const refpk = doc(
          db,
          `Product key ${whichLicense}`,
          activeProductKeyID
        );
        await updateDoc(refpk, {
          Status: false,
        });
      }
      navigate("/authorized", {
        state: {
          productKey: activeProductKey,
          auth: true,
          software: whichLicense,
          email: enteredEmail,
          uniqueCode: enteredUniqueCode,
        },
      });
      addToCustomerDataTable();
    }
  }, [foundUniqueCode, activeProductKey]);

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

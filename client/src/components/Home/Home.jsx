import React, { useEffect, useRef, useState } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GetCustomerData from "../../api/GetCustomerData";
import GetOPP2016PK from "../../api/OPP2016api/GetOPP2016PK";
import GetOPP2016UC from "../../api/OPP2016api/GetOPP2016UC";

function Home() {
  const navigate = useNavigate();
  // Office pp 2016 data
  const OPP16UC = GetOPP2016UC();
  const OPP16PK = GetOPP2016PK();
  // customer data
  const customerData = GetCustomerData();
  const [message, setMessage] = useState("");
  const [activeProductKey, setActiveProductKey] = useState("");
  const [activeProductKeyID, setActiveProductKeyID] = useState("");
  const [activeUniqueCodeID, setActiveUniqueCodeID] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUniqueCode, setEnteredUniqueCode] = useState("");

  const [whichLicense, setWhichLicense] = useState(
    "Office Professional Plus 2016"
  );

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

  let handleSubmit = (e) => {
    e.preventDefault();
    // loop the unique code array to find unique code typed in the input
    OPP16UC.forEach((objectuc) => {
      if (
        objectuc.Status === "Inactive" &&
        objectuc.UniqueCode === e.target[1].value
      ) {
        setMessage("");

        customerData.forEach((each) => {
          if (each.UniqueCode === e.target[1].value) {
            navigate("/authorized_unique_code_pp16", {
              state: { productKey: each.ProductKey, auth: true },
            });
            sendEmail(
              enteredEmail,
              enteredName,
              enteredUniqueCode,
              each.ProductKey,
              whichLicense
            );
          }
        });
      } else if (objectuc.UniqueCode === e.target[1].value) {
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
        // todo set product key and which license for someone using the unique code for the first time.
      } else {
        setMessage("Unique code is invalid.");
      }
    });
    // loop the product keys and find one that's active.
    OPP16PK.forEach((objectpk) => {
      if (objectpk.Status === true) {
        setActiveProductKey(objectpk.ProductKey);
        setActiveProductKeyID(objectpk.id);
      }
    });
  };

  useEffect(() => {
    // display active product key on another page
    if (foundUniqueCode && activeProductKey.length > 0) {
      async function addToCustomerDataTable() {
        await addDoc(collection(db, "Customer data"), {
          Email: enteredEmail,
          Name: enteredName,
          ProductKey: activeProductKey,
          Time: new Date(),
          UniqueCode: enteredUniqueCode,
          Year: 2016,
        });
        const refuc = doc(db, "Unique code 2016", activeUniqueCodeID);
        await updateDoc(refuc, {
          Status: false,
        });
        const refpk = doc(db, "Product key 2016", activeProductKeyID);
        await updateDoc(refpk, {
          Status: false,
        });
      }
      navigate("/authorized_unique_code_pp16", {
        state: { productKey: activeProductKey, auth: true },
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

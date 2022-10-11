import React, { useEffect, useRef, useState } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
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
import { send, init } from "emailjs-com";

function Home() {
  const navigate = useNavigate();
  const [OPP16UC, setOPP16UC] = useState([]);
  const [OPP16PK, setOPP16PK] = useState([]);
  const [message, setMessage] = useState("");
  const [activeProductKey, setActiveProductKey] = useState("");
  const [activeProductKeyID, setActiveProductKeyID] = useState("");
  const [activeUniqueCodeID, setActiveUniqueCodeID] = useState("");
  const [auth, setAuth] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUniqueCode, setEnteredUniqueCode] = useState("");
  const [customerData, setCustomerData] = useState([]);

  const [foundUniqueCode, setFoundUniqueCode] = useState(false);

  const form = useRef();

  const serviceId = "service_b7r1urq";
  const templateId = "template_sk86vkb";
  const userID = "hBnOsTmRnsM9UsMmi";

  const sendEmail = () => {
    console.log("first");
    init(userID);
    const toSend = {
      to_name: enteredName,
      to_email: enteredEmail,
      uc: enteredUniqueCode,
    };
    send(serviceId, templateId, toSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleSubmit = (e) => {
    sendEmail();
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
          }
        });
      } else if (objectuc.UniqueCode === e.target[1].value) {
        setFoundUniqueCode(true);
        setActiveUniqueCodeID(objectuc.id);
        setMessage("");
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
    const q = query(collection(db, "Customer data"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let customerDataA = [];
      querySnapshot.forEach((doc) => {
        customerDataA.push({ ...doc.data(), id: doc.id });
        customerDataA.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Time") {
              let time = new Date(
                e.Time.seconds * 1000 + e.Time.nanoseconds / 1000000
              );
              e.Time.stringTime =
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      setCustomerData(customerDataA);
    });
    return () => unsub();
  }, []);

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

  // Gets unique code 2016 object
  useEffect(() => {
    const q = query(collection(db, "Unique code 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016UC = [];
      querySnapshot.forEach((doc) => {
        pp2016UC.push({ ...doc.data(), id: doc.id });
        pp2016UC.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Status" && e.Status === true) {
              e.Status = "Active";
            } else if (key === "Status" && e.Status === false) {
              e.Status = "Inactive";
            } else if (key === "UploadDate") {
              let time = new Date(
                e.UploadDate.seconds * 1000 + e.UploadDate.nanoseconds / 1000000
              );
              e.UploadDate.stringTime =
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      setOPP16UC(pp2016UC);
    });
    return () => unsub();
  }, []);

  // Gets product key 2016 object
  useEffect(() => {
    const q = query(collection(db, "Product key 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016PK = [];
      querySnapshot.forEach((doc) => {
        pp2016PK.push({ ...doc.data(), id: doc.id });
        pp2016PK.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "status" && e.status === true) {
              e.status = "Active";
            } else if (key === "status" && e.status === false) {
              e.status = "Inactive";
            } else if (key === "UploadDate") {
              let time = new Date(
                e.UploadDate.seconds * 1000 + e.UploadDate.nanoseconds / 1000000
              );
              e.UploadDate.stringTime =
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      setOPP16PK(pp2016PK);
    });
    return () => unsub();
  }, []);

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

import React, { useEffect, useState } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [OPP16UC, setOPP16UC] = useState([]);
  const [OPP16PK, setOPP16PK] = useState([]);
  const [message, setMessage] = useState("");

  let foundUniqueCode = false;
  let activeProductKey = "";
  let authorized = false;

  let handleSubmit = (e) => {
    e.preventDefault();
    // loop the unique code array to find unique code typed in the input
    OPP16UC.forEach((objectuc) => {
      console.log(objectuc);
      if (objectuc.UniqueCode === e.target[1].value) {
        foundUniqueCode = true;
      } else {
      }
    });
    // loop the product keys and find one that's active.
    OPP16PK.forEach((objectpk) => {
      if (objectpk.status === "Active") {
        activeProductKey = objectpk.ProductKey;
      }
    });
    // display active product key on another page
    if (foundUniqueCode && activeProductKey.length > 0) {
      authorized = true;
      navigate("/authorized_unique_code_pp16", {
        state: { productKey: activeProductKey, auth: authorized },
      });
    } else {
      console.log("first");
    }
  };

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
      <Form onSubmit={handleSubmit} className='form'>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control required type='text' placeholder='Enter your name' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='uniqueCode'>
          <Form.Label>Unique code</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter your unique code'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control required type='email' placeholder='Enter your Email' />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Submit
        </Button>
      </Form>
      <h1>{message}</h1>
    </div>
  );
}

export default Home;

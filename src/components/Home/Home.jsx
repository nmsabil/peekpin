import React, { useEffect } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

function Home() {
  // const AllUniqueCodes = [];

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello " + "sabil" + "!");
  };

  // useEffect(() => {
  //   const q = query(collection(db, "Customer data"));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let customerDataA = [];
  //     querySnapshot.forEach((doc) => {
  //       customerDataA.push({ ...doc.data(), id: doc.id });
  //     });
  //     setCustomerData(customerDataA);
  //   });
  //   return () => unsub();
  // }, []);

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
    </div>
  );
}

export default Home;

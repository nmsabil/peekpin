import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";

function AddPK() {
  const [productKey, setProductKey] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "Product key 2016"), {
      ProductKey: productKey,
      UploadDate: new Date(),
      Status: true,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='form mt-3 d-flex'>
      <Form.Group controlId='password'>
        <Form.Control
          onChange={(e) => setProductKey(e.target.value)}
          type='text'
          placeholder='New Product Key'
        />
      </Form.Group>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </Form>
  );
}

export default AddPK;

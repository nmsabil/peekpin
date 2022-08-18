import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";

function AddPK(props) {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.location.pathname === "/admin/keys2016") {
      await addDoc(collection(db, "Product key 2016"), {
        ProductKey: code,
        UploadDate: new Date(),
        Status: true,
      });
      setCode("");
    } else if (window.location.pathname === "/admin/unique-code-2016") {
      await addDoc(collection(db, "Unique code 2016"), {
        UniqueCode: code,
        UploadDate: new Date(),
        Status: true,
      });
      setCode("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='form d-flex'>
      <Form.Group controlId='password'>
        <Form.Control
          onChange={(e) => setCode(e.target.value)}
          type='text'
          value={code}
          placeholder={props.name}
        />
      </Form.Group>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </Form>
  );
}

export default AddPK;

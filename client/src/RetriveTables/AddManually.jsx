import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../firebase";

function AddPK(props) {
  const [code, setCode] = useState("");

  const AddProductKeyManually = async (which) => {
    await addDoc(collection(db, which), {
      ProductKey: code,
      UploadDate: new Date(),
      Status: true,
    });
    setCode("");
  };

  const AddUniqueCodeManually = async (which) => {
    await addDoc(collection(db, which), {
      UniqueCode: code,
      UploadDate: new Date(),
      Status: true,
    });
    setCode("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/admin/product_keys/pp2016") {
      AddProductKeyManually("Product key 2016");
    } else if (window.location.pathname === "/admin/unique_codes/pp2016") {
      AddUniqueCodeManually("Unique code 2016");
    } else if (window.location.pathname === "/admin/product_keys/pp2019") {
      AddProductKeyManually("Product key 2019");
    } else if (window.location.pathname === "/admin/unique_codes/pp2019") {
      AddUniqueCodeManually("Unique code 2019");
    } else if (window.location.pathname === "/admin/product_keys/pp2021") {
      AddProductKeyManually("Product key 2021");
    } else if (window.location.pathname === "/admin/unique_codes/pp2021") {
      AddUniqueCodeManually("Unique code 2021");
    } else if (window.location.pathname === "/admin/product_keys/hb2021") {
      AddProductKeyManually("Product key HB 2021");
    } else if (window.location.pathname === "/admin/unique_codes/hb2021") {
      AddUniqueCodeManually("Unique code HB 2021");
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
          required
        />
      </Form.Group>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </Form>
  );
}

export default AddPK;

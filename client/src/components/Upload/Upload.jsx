import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../../firebase";
import { collection, writeBatch, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Alert } from "react-bootstrap";

function Upload(props) {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [message, setMessage] = useState("");
  const [textArea, setTextArea] = useState("");

  const UploadProductKeyManually = async (which, url) => {
    let arrayBatch = [];
    for (var each of array) {
      arrayBatch.push({
        ProductKey: each,
        UploadDate: new Date(),
        Status: true,
      });
    }
    const batch = writeBatch(db);
    arrayBatch.forEach((item) => {
      // Creates a DocRef with random ID
      const docRef = doc(collection(db, which));
      batch.set(docRef, item);
    });
    if (arrayBatch.length > 0) {
      await batch.commit().then(
        setMessage(`Uploaded ${arrayBatch.length} product keys for ${which}`),
        setTimeout(() => {
          navigate(url);
        }, 1500)
      );
    }
  };

  const UploadUniqueCodeManually = async (which, url) => {
    let arrayBatch = [];
    for (var each of array) {
      arrayBatch.push({
        UniqueCode: each,
        UploadDate: new Date(),
        Status: true,
      });
    }
    const batch = writeBatch(db);
    arrayBatch.forEach((item) => {
      const docRef = doc(collection(db, which));
      batch.set(docRef, item);
    });
    if (arrayBatch.length > 0) {
      await batch.commit().then(
        setMessage(`Uploaded ${arrayBatch.length} unique codes for ${which}`),
        setTimeout(() => {
          navigate(url);
        }, 1500)
      );
    }
  };

  const addtoFirebase = async () => {
    if (window.location.pathname === "/admin/upload/product_keys/pp2016") {
      UploadProductKeyManually(
        "Product key 2016",
        "/admin/product_keys/pp2016"
      );
    } else if (
      window.location.pathname === "/admin/upload/unique_codes/pp2016"
    ) {
      UploadUniqueCodeManually(
        "Unique code 2016",
        "/admin/unique_codes/pp2016"
      );
    } else if (
      window.location.pathname === "/admin/upload/product_keys/pp2019"
    ) {
      UploadProductKeyManually(
        "Product key 2019",
        "/admin/product_keys/pp2019"
      );
    } else if (
      window.location.pathname === "/admin/upload/unique_codes/pp2019"
    ) {
      UploadUniqueCodeManually(
        "Unique code 2019",
        "/admin/unique_codes/pp2019"
      );
    } else if (
      window.location.pathname === "/admin/upload/product_keys/pp2021"
    ) {
      UploadProductKeyManually(
        "Product key 2021",
        "/admin/product_keys/pp2021"
      );
    } else if (
      window.location.pathname === "/admin/upload/unique_codes/pp2021"
    ) {
      UploadUniqueCodeManually(
        "Unique code 2021",
        "/admin/unique_codes/pp2021"
      );
    } else if (
      window.location.pathname === "/admin/upload/product_keys/hb2021"
    ) {
      UploadProductKeyManually(
        "Product key HB 2021",
        "/admin/product_keys/hb2021"
      );
    } else if (
      window.location.pathname === "/admin/upload/unique_codes/hb2021"
    ) {
      UploadUniqueCodeManually(
        "Unique code HB 2021",
        "/admin/unique_codes/hb2021"
      );
    }
  };

  // read file as text and pass to a funtion that converts to an array
  const formHandler = async (e) => {
    e.preventDefault();
    if (e.target["fileUploaded"].files[0]) {
      const file = e.target["fileUploaded"].files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const textData = XLSX.utils.sheet_to_txt(worksheet);
      setArray(textData.split("\n"));
      console.log(textData.split("\n"));
    } else {
      setArray(textArea.split("\n"));
    }
  };

  useEffect(() => {
    addtoFirebase();
  }, [array]);

  return (
    <div className='upload'>
      <h1 style={{ fontSize: "1.5rem" }} className='mt-5 mb-3'>
        {props.title}
      </h1>
      {message ? <Alert variant='success'>{message}</Alert> : ""}
      <Form id='upload-form' onSubmit={formHandler} className='form'>
        <p>Upload via excel file or enter 1 per line</p>
        <Form.Group className='mb-3'>
          <Form.Control
            name={"fileUploaded"}
            type={"file"}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            placeholder='Upload Excel File'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            name={"textarea"}
            type='text'
            as={"textarea"}
            placeholder='1 per line'
            rows='5'
            value={textArea}
            onChange={(e) => {
              setTextArea(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Upload
        </Button>
      </Form>

      <br />
    </div>
  );
}

export default Upload;

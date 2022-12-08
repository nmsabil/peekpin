import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../../firebase";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function Upload(props) {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const fileReader = new FileReader();

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
      const docRef = doc(collection(db, `Product key ${which}`));
      batch.set(docRef, item);
    });
    await batch.commit();
    // navigate to the url after batch.commit
    // navigate(url);
  };

  const UploadUniqueCodeManually = async (which, url) => {
    for (var key of array) {
      await addDoc(collection(db, which), {
        UniqueCode: key,
        UploadDate: new Date(),
        Status: true,
      });
      setUploaded(true);
      setTimeout(() => {
        setUploaded(false);
      }, 1000);
      navigate(url);
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
    }
  };

  // read file as text and pass to a funtion that converts to an array
  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target["fileUploaded"].files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const textData = XLSX.utils.sheet_to_txt(worksheet);

    setArray(textData.split("\n"));
  };

  useEffect(() => {
    addtoFirebase();
  }, [array]);

  return (
    <div className='upload'>
      <h1 className='mt-5 mb-3'>{props.title}</h1>
      <Form id='upload-form' onSubmit={formHandler} className='form'>
        <Form.Group className='mb-3'>
          <Form.Control
            name={"fileUploaded"}
            required
            type={"file"}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            placeholder='Upload Excel File'
          />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Upload
        </Button>
      </Form>

      <br />

      <h1>{uploaded ? "Uploaded" : ""}</h1>
    </div>
  );
}

export default Upload;

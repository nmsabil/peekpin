import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Upload(props) {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const fileReader = new FileReader();

  // read file as text and pass to a funtion that converts to an array
  const formHandler = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  // on file change update file state.
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  // convert string to array
  const csvFileToArray = (fileString) => {
    const fileArray = fileString.split("\n");

    setArray(fileArray);
  };

  const addtoFirebase = async () => {
    if (window.location.pathname === "/admin/upload-product-key-2016") {
      for (var key of array) {
        await addDoc(collection(db, "Product key 2016"), {
          ProductKey: key,
          UploadDate: new Date(),
          Status: true,
        });
        setUploaded(true);
        setTimeout(() => {
          setUploaded(false);
        }, 1000);
        navigate("/admin/keys2016");
      }
    } else if (window.location.pathname === "/admin/upload-unique-code-2016") {
      for (var key of array) {
        await addDoc(collection(db, "Unique code 2016"), {
          UniqueCode: key,
          UploadDate: new Date(),
          Status: true,
        });
        setUploaded(true);
        setTimeout(() => {
          setUploaded(false);
        }, 1000);
        navigate("/admin/unique-code-2016");
      }
    } else {
    }
  };
  useEffect(() => {
    addtoFirebase();
  }, [array]);

  return (
    <div className='upload'>
      <h1 className='mt-5 mb-3'>{props.title}</h1>
      <Form onSubmit={formHandler} className='form'>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label></Form.Label>
          <Form.Control
            required
            type={"file"}
            //   accept={".csv"}
            onChange={handleOnChange}
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

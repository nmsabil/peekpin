import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebase";
import logo from "../../images/logo-transperant.png";
import parse from "html-react-parser";

function EditWebTemplate(props) {
  const [value, setValue] = useState("");
  const [which, setWhich] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "Web Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          props.version === "pro plus 2016" &&
          doc.data().software === "2016"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        } else if (
          props.version === "pro plus 2019" &&
          doc.data().software === "2019"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        }
      });
    });
    return () => unsub();
  }, [props.version]);

  const handleSubmit = async () => {
    const refcd = doc(db, "Web Templates", which.id);
    await updateDoc(refcd, {
      html: value,
    }).then(setUpdated(true));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <div className='title-add d-flex flex-column mt-5'>
        <h1 className='mb-4' style={{ fontSize: "1.5rem" }}>
          {props.title}
        </h1>
        {updated ? (
          <Alert variant='success'>Success Template updated</Alert>
        ) : (
          ""
        )}
        <ReactQuill
          className='bg-white'
          theme='snow'
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
        <Button onClick={handleSubmit} variant='primary w-100' type='submit'>
          Update
        </Button>
      </div>
      <div
        style={{ height: "auto" }}
        className='mt-5 templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '
      >
        <p>Live preview</p>
        <div className='template'>
          <div className='product-key px-5 py-5 text-dark rounded text-center'>
            <a href=''>
              <img
                src={logo}
                alt='Displaypin logo'
                className='logo mb-5 w-50'
              />
            </a>
            <h5 className='text-left'> Product key:</h5>
            <h3 className='mb-0'>
              <Form.Control
                disabled
                className='inputToDisplayLicense'
                value='KNX9D-HQP76-28JFD-CQJ96-CG34X'
              />
            </h3>

            <div className='instruct'>
              <h5 className='mt-5 text-left'>Download Steps:</h5>
              <div className='text-left'>{value ? parse(value) : ""}</div>

              <p className='mt-5'>
                A copy of the product key and download intructions is also be
                sent to example@softwarepin.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWebTemplate;

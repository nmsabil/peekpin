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
import SuccessBlock from "../SuccessBlock/SuccessBlock";

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
          doc.data().software === "Pro Plus 2016"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        } else if (
          props.version === "pro plus 2019" &&
          doc.data().software === "Pro Plus 2019"
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
        className='mt-5 mb-5 templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '
      >
        <p>Edit yellow area text above</p>
        <SuccessBlock
          software='Pro Plus 2016'
          productKey='839'
          email='example@softwarepin.com'
          value={value}
        />
      </div>
    </div>
  );
}

export default EditWebTemplate;

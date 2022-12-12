import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebase";

function EditWebTemplate(props) {
  const [value, setValue] = useState("");
  const [which, setWhich] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "Web Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setWhich(doc);
        setValue(doc.data().html);
      });
    });
    return () => unsub();
  }, []);

  const handleSubmit = async () => {
    const refcd = doc(db, "Web Templates", which.id);
    await updateDoc(refcd, {
      html: value,
    }).then(setUpdated(true));
  };

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
        />
        <Button onClick={handleSubmit} variant='primary w-100' type='submit'>
          Update
        </Button>
      </div>
    </div>
  );
}

export default EditWebTemplate;

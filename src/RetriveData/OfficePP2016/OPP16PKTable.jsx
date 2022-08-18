import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import AddPK from "./AddPK";
import { Button, Form, Modal } from "react-bootstrap";

function OPP16PK() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState("");
  const [updated, setUpdated] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(true);
  const [clickedID, setClickedID] = useState("");

  const [OPP16PK, setOPP16PK] = useState([]);
  const OPP16PKColumn = [
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Upload Date",
      selector: (row) => row.UploadDate.stringTime,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.Status === "Active",
          style: {
            color: "green",
          },
        },
        {
          when: (row) => row.Status === "Inactive",
          style: {
            color: "red",
          },
        },
      ],
    },

    {
      name: "Actions",
      maxWidth: "70px",
      minWidth: "120px",
      textAlign: "center",

      cell: (row) => (
        <>
          <Button
            className='btn btn-danger'
            aria-label='delete'
            color='secondary'
            onClick={() => deleteCode(row.id)}
          >
            <i style={{ color: "white" }} className='bi bi-x-circle-fill'></i>
          </Button>
          <Button
            className='btn btn-warning'
            aria-label='delete'
            color='secondary'
            onClick={() => openModal(row)}
          >
            <i style={{ color: "white" }} className='bi bi-pencil-square'></i>
          </Button>
        </>
      ),
    },
  ];
  const handleClose = () => setShow(false);
  const deleteCode = async (id) => {
    await deleteDoc(doc(db, "Product key 2016", id));
  };
  const openModal = (row) => {
    setShow(true);
    setCurrent(row.ProductKey);
    setClickedID(row.id);
    setUpdated(row.ProductKey);
    setUpdatedStatus(row.Status === "Active" ? true : false);
  };

  const editCode = async () => {
    const ref = doc(db, "Product key 2016", clickedID);
    await updateDoc(ref, {
      ProductKey: updated,
      Status: updatedStatus == true ? true : false,
      UploadDate: new Date(),
    });
    handleClose();
  };
  const handleChange = (e) => {
    setUpdatedStatus(!updatedStatus);
  };

  useEffect(() => {
    const q = query(collection(db, "Product key 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016PK = [];
      querySnapshot.forEach((doc) => {
        pp2016PK.push({ ...doc.data(), id: doc.id });
        pp2016PK.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Status" && e.Status === true) {
              e.Status = "Active";
            } else if (key === "Status" && e.Status === false) {
              e.Status = "Inactive";
            } else if (key === "UploadDate") {
              let time = new Date(
                e.UploadDate.seconds * 1000 + e.UploadDate.nanoseconds / 1000000
              );
              e.UploadDate.stringTime =
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      setOPP16PK(pp2016PK);
    });
    return () => unsub();
  }, []);
  return (
    <div className='pp-2016'>
      <div className='title-add d-flex flex-column mt-5'>
        <h1 style={{ fontSize: "1.5rem" }}>Office PP 2016 product keys</h1>
        <AddPK name={"Product Key"} />
      </div>
      <Table data={OPP16PK} columns={OPP16PKColumn} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Key: {current}</Form.Label>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Control
                type='text'
                value={updated}
                onChange={(e) => setUpdated(e.target.value)}
                placeholder={current}
                autoFocus
              />
            </Form.Group>
            <Form.Check
              type='switch'
              id='statusSwitch'
              label='Status'
              defaultChecked={updatedStatus}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={editCode}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OPP16PK;

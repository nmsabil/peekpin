import { db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import AddManually from "../AddManually";
import { Alert, Button, Form, Modal } from "react-bootstrap";

import GetProductKeysData from "../../api/GetProductKeysData";
import { useLocation } from "react-router-dom";

function ProductKeyTable(props) {
  const getAllPK = GetProductKeysData(props.table);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState("");
  const [updated, setUpdated] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(true);
  const [clickedID, setClickedID] = useState("");

  const [PK, setPK] = useState([]);

  const PKColumn = [
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
    await deleteDoc(doc(db, props.table, id));
  };
  const openModal = (row) => {
    setShow(true);
    setCurrent(row.ProductKey);
    setClickedID(row.id);
    setUpdated(row.ProductKey);
    setUpdatedStatus(row.Status === "Active" ? true : false);
  };

  const editCode = async () => {
    const ref = doc(db, props.table, clickedID);
    await updateDoc(ref, {
      ProductKey: updated,
      Status: updatedStatus == true ? true : false,
    });
    handleClose();
  };
  const handleChange = (e) => {
    setUpdatedStatus(!updatedStatus);
  };

  useEffect(() => {
    setPK(getAllPK);
  }, [getAllPK]);
  return (
    <div className='pp-2019'>
      <div className='title-add d-flex flex-column mt-5'>
        <h1 style={{ fontSize: "1.5rem" }}>{props.title}</h1>
        <div className='d-flex justify-content-between align-items-center '>
          <AddManually name={"Product Key"} />
          <div className='uploaded'></div>
          <div className='d-flex'>
            <div style={{ marginRight: "10px" }} className='text-success'>
              Active: {PK.filter((obj) => obj.Status === "Active").length}
            </div>
            <div className='text-danger'>
              Inactive: {PK.filter((obj) => obj.Status === "Inactive").length}
            </div>
          </div>
        </div>
      </div>
      <Table data={PK} columns={PKColumn} columnId={2} />
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

export default ProductKeyTable;

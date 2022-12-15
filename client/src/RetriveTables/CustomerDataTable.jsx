import Table from "../components/Table/Table";
import GetCustomerData from "../api/GetCustomerData.jsx";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import GetEmailTemplate from "../api/GetEmailTemplate";

function CustomerDataTable() {
  const customerData = GetCustomerData();
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState("");
  const [updated, setUpdated] = useState("");
  const [clickedID, setClickedID] = useState("");
  const [clickedRow, setClickedRow] = useState("");

  const customerDataColumn = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      maxWidth: "70px",
      minWidth: "100px",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Sent,
      sortable: true,
      maxWidth: "50px",
      conditionalCellStyles: [
        {
          when: (row) => row.Sent === "Sent",
          style: {
            color: "green",
          },
        },
        {
          when: (row) => row.Sent === "Failed",
          style: {
            color: "red",
          },
        },
      ],
    },
    {
      name: "Version",
      selector: (row) => row.Year,
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },

    {
      name: "Unique Code",
      selector: (row) => row.UniqueCode,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Time",
      selector: (row) => row.Time.stringTime,
      sortable: true,
    },
    {
      name: "Resend",
      maxWidth: "70px",
      minWidth: "80px",
      style: {
        justifyContent: "end",
      },
      cell: (row) => (
        <>
          <Button
            className='btn btn-primary'
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

  const sendEmail = async (
    enteredEmail,
    enteredName,
    enteredUniqueCode,
    productKey,
    refofCustomer,
    year,
    emailTemplate
  ) => {
    const data = {
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      productKey,
      year,
      emailTemplate,
    };
    let status;
    await axios
      .post("http://localhost:5000/api/sendemail", data)
      .then((res) => {
        if (res.status === 200) {
          status = "Sent";
        }
      })
      .catch((err) => {
        status = "Failed";
      });

    await updateDoc(refofCustomer, {
      Sent: status,
    });
  };

  const openModal = (row) => {
    setClickedRow(row);
    setShow(true);
    setCurrent("");
    setUpdated(row.Email);
    setCurrent(row.Email);
    setClickedID(row.id);
  };

  const editCode = async () => {
    const ref = doc(db, "Customer data", clickedID);
    await updateDoc(ref, {
      Email: updated,
    });
    handleClose();
    sendEmail(
      updated,
      clickedRow.Name,
      clickedRow.UniqueCode,
      clickedRow.ProductKey,
      ref,
      clickedRow.Year,
      clickedRow.template
    );
  };

  const handleClose = () => setShow(false);
  return (
    <>
      <h1 className='mt-5' style={{ fontSize: "1.5rem" }}>
        Customers data
      </h1>
      <Table
        data={customerData}
        columns={customerDataColumn}
        columnId={7}
        selectable={false}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit & resend email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Email: {current}</Form.Label>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Control
                type='email'
                value={updated}
                onChange={(e) => setUpdated(e.target.value)}
                placeholder={current}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={editCode}>
            Resend Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerDataTable;

import React from 'react'
import logo from "../../images/logo-transperant.png"
import Form from 'react-bootstrap/Form';



function home() {
  return (
       <div className="home d-flex justify-content-center align-items-center flex-direction-column flex-column">
      <img src={logo} alt="Displaypin logo" className="logo mb-5" />
      <Form className="form">
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="uniqueCode">
        <Form.Label>Unique code</Form.Label>
        <Form.Control type="text" placeholder="Enter your unique code" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your Email" />
      </Form.Group>
    </Form>
    </div>
  )
}

export default home
import React from 'react'
import { Form } from 'react-bootstrap'

function AdminLogin() {
     return (
       <div className="AdminLogin d-flex justify-content-center align-items-center flex-direction-column flex-column">
      
     <Form className="form">    <h1 className='mb-5 text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="user">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter password" />
  </Form.Group>
     <button type="submit" class="btn btn-primary">Login</button>
    </Form></div>
  )
}

export default AdminLogin
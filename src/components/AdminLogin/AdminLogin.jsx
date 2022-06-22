import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/Context";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='AdminLogin d-flex justify-content-center align-items-center flex-direction-column flex-column'>
      <Form onSubmit={handleSubmit} className='form'>
        <h1 className='mb-5 text-center'>Login</h1>
        {error.length > 0 && (
          <Alert key='danger' variant='danger'>
            {error}
          </Alert>
        )}
        <Form.Group className='mb-3' controlId='user'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='Enter username'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            placeholder='Enter password'
          />
        </Form.Group>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </Form>
    </div>
  );
}

export default AdminLogin;

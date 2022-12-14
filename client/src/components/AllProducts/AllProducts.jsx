import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function AllProducts() {
  return (
    <div className='AllProducts'>
      <h1 className='mt-5' style={{ fontSize: "1.5rem" }}>
        All Products
      </h1>
      <ListGroup>
        <ListGroup.Item>
          <Card>
            <Card.Body className='d-flex flex-row justify-content-between align-items-center'>
              <Card.Title className='mb-0'>
                <Link className='text-dark' to='/admin/product_keys/pp2016'>
                  Office Pro Plus 2016
                </Link>
              </Card.Title>
              <div>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/upload/product_keys/pp2016'
                >
                  <Button variant='dark'>Upload Product Keys</Button>
                </Link>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/upload/unique_codes/pp2016'
                >
                  <Button variant='dark'>Upload Unique Codes</Button>
                </Link>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/template/pp2016'
                >
                  <Button variant='dark'>Update Success text</Button>
                </Link>
                <Link style={{ marginRight: "5px" }} to='/admin/email/pp2016'>
                  <Button variant='dark'>Update Email text</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card>
            <Card.Body className='d-flex flex-row justify-content-between align-items-center'>
              <Card.Title className='mb-0'>
                <Link className='text-dark' to='/admin/product_keys/pp2019'>
                  Office Pro Plus 2019
                </Link>
              </Card.Title>
              <div>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/upload/product_keys/pp2019'
                >
                  <Button variant='dark'>Upload Product Keys</Button>
                </Link>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/upload/unique_codes/pp2019'
                >
                  <Button variant='dark'>Upload Unique Codes</Button>
                </Link>
                <Link
                  style={{ marginRight: "5px" }}
                  to='/admin/template/pp2019'
                >
                  <Button variant='dark'>Update Success text</Button>
                </Link>
                <Link style={{ marginRight: "5px" }} to='/admin/email/pp2019'>
                  <Button variant='dark'>Update Email text</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default AllProducts;

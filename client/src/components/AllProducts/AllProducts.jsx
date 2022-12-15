import React from "react";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
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
                <Link
                  className='text-dark mb-2'
                  to='/admin/product_keys/pp2016'
                >
                  Office Pro Plus 2016
                </Link>
              </Card.Title>
              <div>
                <ButtonGroup aria-label='Basic example'>
                  <Button variant='primary'>
                    <Link
                      class='text-light'
                      to='/admin/upload/unique_codes/pp2016'
                    >
                      Upload Product Keys
                    </Link>
                  </Button>

                  <Button variant='success'>
                    <Link
                      class='text-light'
                      to='/admin/upload/unique_codes/pp2016'
                    >
                      Upload Unique Sodes
                    </Link>
                  </Button>
                  <Button variant='secondary'>
                    <Link class='text-light' to='/admin/template/pp2016'>
                      Edit Download Steps
                    </Link>
                  </Button>
                </ButtonGroup>
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
                <ButtonGroup aria-label='Basic example'>
                  <Button variant='primary'>
                    <Link
                      class='text-light'
                      to='/admin/upload/product_keys/pp2019'
                    >
                      Upload Product Keys
                    </Link>
                  </Button>

                  <Button variant='success'>
                    <Link
                      class='text-light'
                      to='/admin/upload/unique_codes/pp2019'
                    >
                      Upload Unique Codes
                    </Link>
                  </Button>
                  <Button variant='secondary'>
                    <Link class='text-light' to='/admin/template/pp2019'>
                      Edit Download Steps
                    </Link>
                  </Button>
                </ButtonGroup>
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

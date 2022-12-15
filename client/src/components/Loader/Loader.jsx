import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className='d-flex justify-content-center w-100'>
      <Spinner className='my-5' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;

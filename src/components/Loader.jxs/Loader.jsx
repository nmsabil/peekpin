import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Spinner className='my-5' animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}

export default Loader;

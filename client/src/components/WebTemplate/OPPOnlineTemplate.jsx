import React from "react";
import { useLocation } from "react-router-dom";

import SuccessBlock from "../SuccessBlock/SuccessBlock";

function OPP2016Template() {
  const { state } = useLocation();
  const { productKey, auth, software, email, uniqueCode, template } = state;

  return (
    <div className='templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '>
      <SuccessBlock
        software={software}
        productKey={productKey}
        email={email}
        value={template}
      />
    </div>
  );
}

export default OPP2016Template;

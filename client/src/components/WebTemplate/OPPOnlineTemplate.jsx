import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

import SuccessBlock from "../SuccessBlock/SuccessBlock";

function OPP2016Template() {
  const { state } = useLocation();
  const { productKey, auth, software, email, uniqueCode } = state;
  const [value, setValue] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Web Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          software === "Pro Plus 2016" &&
          doc.data().software === "Pro Plus 2016"
        ) {
          setValue(doc.data().html);
        } else if (
          software === "Pro Plus 2019" &&
          doc.data().software === "Pro Plus 2019"
        ) {
          setValue(doc.data().html);
        }
      });
    });
    return () => unsub();
  }, [value]);

  return (
    <div className='templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '>
      <SuccessBlock
        software={software}
        productKey={productKey}
        email={email}
        value={value}
      />
    </div>
  );
}

export default OPP2016Template;

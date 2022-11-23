import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function GetUniqueCodesData(which) {
  const [AllUC, setAllUC] = useState([]);
  useEffect(() => {
    const q = query(collection(db, which));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let UC = [];
      querySnapshot.forEach((doc) => {
        UC.push({ ...doc.data(), id: doc.id });
        UC.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Status" && e.Status === true) {
              e.Status = "Active";
            } else if (key === "Status" && e.Status === false) {
              e.Status = "Inactive";
            } else if (key === "UploadDate") {
              let time = new Date(
                e.UploadDate.seconds * 1000 + e.UploadDate.nanoseconds / 1000000
              );
              e.UploadDate.stringTime =
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      setAllUC(UC);
    });
    return () => unsub();
  }, []);

  return AllUC;
}

export default GetUniqueCodesData;

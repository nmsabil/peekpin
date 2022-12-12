import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function GetProductKeysData(which) {
  const [AllKeys, setAllKeys] = useState([]);

  useEffect(() => {
    console.log(AllKeys);
    const q = query(collection(db, which));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let PK = [];
      querySnapshot.forEach((doc) => {
        PK.push({ ...doc.data(), id: doc.id });
        PK.forEach((e) => {
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
      const sortedDsc = PK.sort(
        (objA, objB) =>
          Number(
            objB.UploadDate.seconds * 1000 +
              objB.UploadDate.nanoseconds / 1000000
          ) -
          Number(
            objA.UploadDate.seconds * 1000 +
              objA.UploadDate.nanoseconds / 1000000
          )
      );
      setAllKeys(sortedDsc);
    });
    return () => unsub();
  }, []);
  return AllKeys;
}

export default GetProductKeysData;

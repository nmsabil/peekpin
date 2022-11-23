import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function GetCustomerData() {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Customer data"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let customerDataA = [];
      querySnapshot.forEach((doc) => {
        customerDataA.push({ ...doc.data(), id: doc.id });
        customerDataA.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Time") {
              let time = new Date(
                e.Time.seconds * 1000 + e.Time.nanoseconds / 1000000
              );
              e.Time.stringTime =
                time.toDateString("en-GB", { timeZone: "Europe/London" }) +
                " " +
                time.toLocaleTimeString("en-GB", { timeZone: "Europe/London" });
            }
          });
        });
      });
      setCustomerData(customerDataA);
    });
    return () => unsub();
  }, []);

  return customerData;
}

export default GetCustomerData;

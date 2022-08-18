import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../components/Table/Table";

function CustomerDataTable() {
  const [customerData, setCustomerData] = useState([]);

  const customerDataColumn = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },

    {
      name: "Year",
      selector: (row) => row.Year,
      sortable: true,
    },
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Unique Code",
      selector: (row) => row.UniqueCode,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.Time.stringTime,
      sortable: true,
    },
  ];

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
                time.toDateString() + " " + time.toLocaleTimeString();
            }
          });
        });
      });
      console.log(customerDataA);
      setCustomerData(customerDataA);
    });
    return () => unsub();
  }, []);
  return (
    <>
      <h1 className='mt-5' style={{ fontSize: "1.5rem" }}>
        Customers data
      </h1>
      <Table data={customerData} columns={customerDataColumn} />
    </>
  );
}

export default CustomerDataTable;

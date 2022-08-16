import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import AddPK from "./AddPK";

function OPP16PK() {
  const [OPP16PK, setOPP16PK] = useState([]);
  const OPP16PKColumn = [
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Upload Date",
      selector: (row) => row.UploadDate.stringTime,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "Product key 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016PK = [];
      querySnapshot.forEach((doc) => {
        pp2016PK.push({ ...doc.data(), id: doc.id });
        pp2016PK.forEach((e) => {
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
      setOPP16PK(pp2016PK);
    });
    return () => unsub();
  }, []);
  return (
    <div className='pp-2016'>
      <AddPK />
      <Table data={OPP16PK} columns={OPP16PKColumn} />
    </div>
  );
}

export default OPP16PK;

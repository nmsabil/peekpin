import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";

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
      selector: (row) => row.UploadDate.nanoseconds,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            if (key === "status" && e.status === true) {
              e.status = "Active";
            } else if (key === "status" && e.status === false) {
              e.status = "Inactive";
            }
          });
        });
      });
      setOPP16PK(pp2016PK);
    });
    return () => unsub();
  }, []);
  return <Table data={OPP16PK} columns={OPP16PKColumn} />;
}

export default OPP16PK;

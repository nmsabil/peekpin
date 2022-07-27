import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";

function OPP16UC() {
  const [OPP16UC, setOPP16UC] = useState([]);
  const OPP16UCColumn = [
    {
      name: "Unique code",
      selector: (row) => row.UniqueCode,
      sortable: true,
    },
    {
      name: "Upload Date",
      selector: (row) => row.UploadDate.nanoseconds,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "Unique code 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016UC = [];
      querySnapshot.forEach((doc) => {
        pp2016UC.push({ ...doc.data(), id: doc.id });
        pp2016UC.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "Status" && e.Status === true) {
              e.Status = "Active";
            } else if (key === "Status" && e.Status === false) {
              e.Status = "Inactive";
            }
          });
        });
      });
      setOPP16UC(pp2016UC);
    });
    return () => unsub();
  }, []);
  return <Table data={OPP16UC} columns={OPP16UCColumn} />;
}

export default OPP16UC;

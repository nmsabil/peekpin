import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function OPP2016UCData() {
  const [OPP16UC, setOPP16UC] = useState([]);

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
      setOPP16UC(pp2016UC);
    });
    return () => unsub();
  }, []);

  return this.props.OPP16UC;
}

export default OPP2016UCData;

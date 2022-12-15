import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function GetEmailTemplate() {
  const [emailTemplate, setEmailTemplate] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Email Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let allEmailTemplates = [];
      querySnapshot.forEach((doc) => {
        allEmailTemplates.push({ ...doc.data(), id: doc.id });
      });
      setEmailTemplate(allEmailTemplates);
    });
    return () => unsub();
  }, []);

  return emailTemplate;
}

export default GetEmailTemplate;

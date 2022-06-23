import React from "react";
import Table from "../Table/Table";
import Navigation from "../Navigation/Navigation";
import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

function Admin() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Customer data"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  return (
    <div className='Admin'>
      <Navigation />
      <Table data={todos} />
    </div>
  );
}

export default Admin;

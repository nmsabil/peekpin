import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";
import DataTableExtensions from "react-data-table-component-extensions";
import { Button } from "react-bootstrap";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function Table(props) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dataObject = [];
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    selectedRows.length >= 1 ? setShowDelete(true) : setShowDelete(false);
  };

  const handleSelectedDelete = async () => {
    if (window.location.pathname === "/admin/product_keys/pp2016") {
      for (var selected of selectedRows) {
        await deleteDoc(doc(db, "Product key 2016", selected.id));
      }
      setShowDelete(false);
    } else if (window.location.pathname === "/admin/unique_codes/pp2016") {
      for (var selected of selectedRows) {
        await deleteDoc(doc(db, "Unique code 2016", selected.id));
      }
      setShowDelete(false);
    }
  };

  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        setRows(data);
        setPending(false);
      }, 700);
      return () => clearTimeout(timeout);
    },
    [],
    dataObject
  );
  {
    props.data.forEach((element) => {
      dataObject.push(element);
    });
  }

  const columns = props.columns;
  const data = dataObject;

  return (
    <div className='table-main'>
      {showDelete ? (
        <Button
          onClick={handleSelectedDelete}
          className='delete btn btn btn-danger'
        >
          Delete selected
        </Button>
      ) : (
        ""
      )}

      <DataTableExtensions
        columns={columns}
        data={data}
        print={false}
        export={false}
      >
        <DataTable
          columns={columns}
          data={data}
          pagination
          selectableRows
          progressPending={pending}
          onSelectedRowsChange={handleChange}
          progressComponent={<Loader />}
        />
      </DataTableExtensions>
    </div>
  );
}

export default Table;

import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";
import DataTableExtensions from "react-data-table-component-extensions";
import { Button } from "react-bootstrap";
import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

function Table(props) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dataObject = [];
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    console.log(selectedRows);
    setSelectedRows(selectedRows);
    selectedRows.length >= 1 ? setShowDelete(true) : setShowDelete(false);
  };

  const deleteSelectedHelper = async (which) => {
    let selectedRowsIdtoDelete = [];
    for (var selected of selectedRows) {
      selectedRowsIdtoDelete.push(selected.id);
    }
    const batch = writeBatch(db);
    selectedRowsIdtoDelete.forEach((docId) => {
      batch.delete(doc(db, which, docId));
    });
    await batch.commit();
    selectedRowsIdtoDelete = [];
    setShowDelete(false);
  };

  const handleSelectedDelete = async () => {
    if (window.location.pathname === "/admin/product_keys/pp2016") {
      deleteSelectedHelper("Product key 2016");
    } else if (window.location.pathname === "/admin/unique_codes/pp2016") {
      deleteSelectedHelper("Unique code 2016");
    } else if (window.location.pathname === "/admin/product_keys/pp2019") {
      deleteSelectedHelper("Product key 2019");
    } else if (window.location.pathname === "/admin/unique_codes/pp2019") {
      deleteSelectedHelper("Unique code 2019");
    } else if (window.location.pathname === "/admin") {
      deleteSelectedHelper("Customer data");
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
          selectableRows={true}
          // selectableRows={props.selectable === false ? false : true}
          progressPending={pending}
          onSelectedRowsChange={handleChange}
          progressComponent={<Loader />}
          defaultSortFieldId={props.columnId}
          defaultSortAsc={false}
        />
      </DataTableExtensions>
    </div>
  );
}

export default Table;

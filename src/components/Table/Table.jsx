import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";

function Table(props) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dataObject = [];

  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        setRows(data);
        setPending(false);
      }, 2000);
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
    <div className='mt-5'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        selectableRows
        progressPending={pending}
        progressComponent={<Loader />}
      />
    </div>
  );
}

export default Table;

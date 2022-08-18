import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";
import DataTableExtensions from "react-data-table-component-extensions";

function Table(props) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dataObject = [];

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
    <div className=''>
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
          progressComponent={<Loader />}
        />
      </DataTableExtensions>
    </div>
  );
}

export default Table;

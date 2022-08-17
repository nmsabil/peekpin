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

  const conditionalRowStyles = [
    {
      when: (row) => row.Status === "Active",
      style: {
        backgroundColor: "rgba(161, 238, 198, 0.1)",
      },
    },
    {
      when: (row) => row.Status === "Inactive",
      style: {
        backgroundColor: "rgba(241, 91, 94, 0.05)",
      },
    },
  ];
  return (
    <div className='mt-3'>
      <DataTableExtensions
        columns={columns}
        data={data}
        print={false}
        export={false}
        filterPlaceholder='Search table'
      >
        <DataTable
          columns={columns}
          data={data}
          pagination
          selectableRows
          progressPending={pending}
          progressComponent={<Loader />}
          conditionalRowStyles={conditionalRowStyles}
        />
      </DataTableExtensions>
    </div>
  );
}

export default Table;

import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";

function Table(props) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dataObject = [];

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  {
    props.data.forEach((element) => {
      dataObject.push(element);
      console.log(element);
    });
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },

    {
      name: "Year",
      selector: (row) => row.Year,
      sortable: true,
    },
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Unique Code",
      selector: (row) => row.UniqueCode,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.Time.nanoseconds,
      sortable: true,
    },
  ];

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

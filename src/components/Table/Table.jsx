import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader.jxs/Loader";

function Table() {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Unique Code",
      selector: (row) => row.uniquecode,
      sortable: true,
    },
    {
      name: "Product Key",
      selector: (row) => row.productkey,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Email Status",
      selector: (row) => row.emailstatus,
      sortable: true,
    },
    {
      name: "actions",
      selector: (row) => row.actions,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Beetlejuice",
      email: "dasdadad@gmail.com",
      uniquecode: "ssd331fs",
      productkey: "8T9BN-J9YB3-R9QBG-VCC6B-X4VPT",
      year: "PP 2019",
      time: "21-06-2022 04:33:39",
      emailstatus: "Success",
      actions: "abc",
    },
    {
      id: 2,
      name: "Beetlejuice",
      email: "dasdadad@gmail.com",
      uniquecode: "ssd331fs",
      productkey: "8T9BN-J9YB3-R9QBG-VCC6B-X4VPT",
      year: "PP 2019",
      time: "21-06-2022 04:33:39",
      emailstatus: "Success",
      actions: "abc",
    },
    {
      id: 3,
      name: "Beetlejuice",
      email: "dasdadad@gmail.com",
      uniquecode: "ssd331fs",
      productkey: "8T9BN-J9YB3-R9QBG-VCC6B-X4VPT",
      year: "PP 2019",
      time: "21-06-2022 04:33:39",
      emailstatus: "Success",
      actions: "abc",
    },
  ];

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

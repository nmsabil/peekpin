import Table from "../components/Table/Table";
import GetCustomerData from "../api/GetCustomerData.jsx";

function CustomerDataTable() {
  const customerData = GetCustomerData();

  const customerDataColumn = [
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
      selector: (row) => row.Time.stringTime,
      sortable: true,
    },
  ];

  return (
    <>
      <h1 className='mt-5' style={{ fontSize: "1.5rem" }}>
        Customers data
      </h1>
      <Table data={customerData} columns={customerDataColumn} columnId={6} />
    </>
  );
}

export default CustomerDataTable;

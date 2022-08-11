import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Upload(props) {
  //   const [upload, setUpload] = { productKey: "", uploadDate: "", status: true };
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();
  const formHandler = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div className='upload'>
      <h1 className='mt-5 mb-3'>{props.title}</h1>
      <Form onSubmit={formHandler} className='form'>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label></Form.Label>
          <Form.Control
            required
            type={"file"}
            //   accept={".csv"}
            onChange={handleOnChange}
            placeholder='Upload Excel File'
          />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Upload
        </Button>
      </Form>
      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Upload;

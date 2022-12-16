import React, { useRef, useState } from "react";
import logo from "../../images/logo-transperant.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GetCustomerData from "../../api/GetCustomerData.jsx";
import GetProductKeysData from "../../api/GetProductKeysData";
import GetUniqueCodesData from "../../api/GetUniqueCodesData";
import GetEmailTemplate from "../../api/GetEmailTemplate";

function Home() {
  const navigate = useNavigate();
  // Office pp 2016 data
  const OPP16UC = GetUniqueCodesData("Unique code 2016");
  const OPP16PK = GetProductKeysData("Product key 2016");
  // Office pp 2019 data
  const OPP19UC = GetUniqueCodesData("Unique code 2019");
  const OPP19PK = GetProductKeysData("Product key 2019");
  // Office pp 2021 data
  const OPP21UC = GetUniqueCodesData("Unique code 2021");
  const OPP21PK = GetProductKeysData("Product key 2021");
  // email templates
  const emailTemplate = GetEmailTemplate();
  // customer data
  const customerData = GetCustomerData();
  // message
  const [message, setMessage] = useState("");
  // input fields
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUniqueCode, setEnteredUniqueCode] = useState("");

  const form = useRef();

  // Returns data to backend to send email and set status on email on customer data table
  const sendEmail = async (
    enteredEmail,
    enteredName,
    enteredUniqueCode,
    refofCustomer,
    productKey,
    year,
    emailTemplate
  ) => {
    const data = {
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      productKey,
      year,
      emailTemplate,
    };
    let status;
    await axios
      .post("http://localhost:5000/api/sendemail", data)
      .then((res) => {
        if (res.status === 200) {
          status = "Sent";
        }
      })
      .catch((err) => {
        status = "Failed";
      });

    await updateDoc(refofCustomer, {
      Sent: status,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    const multipleUniqueCodes = (UCEntered, UPK, FoundInTable) => {
      console.log(UCEntered, UPK, FoundInTable);
      // set unique codes inactive
      // FoundInTable.forEach(async (element) => {
      //   const refuc = doc(db, `Unique code 2016`, element[0].id);
      //   await updateDoc(refuc, {
      //     Status: false,
      //   });
      // });
    };

    //  { duplicate solution logic
    let allUniqueCodesEntered;
    let activeUniqueProductKeysfound = new Set();
    let productKeysSameNumberUniqueCodesEntered = [];
    let uniqueCodesFoundInTable = [];

    let arrayOfKeysObject = [];

    // if the input contains (,) split to add to array
    if (e.target[1].value.includes(",")) {
      const arrayWitheach = e.target[1].value.replace(/\s/g, "").split(",");
      allUniqueCodesEntered = arrayWitheach;

      // reverse product key search to find active product keys and add to a set to have unique ones.
      OPP16PK.slice()
        .reverse()
        .forEach((item) => {
          if (item.Status === "Active") {
            activeUniqueProductKeysfound.add(item.ProductKey);
          }
        });
      OPP16PK.slice()
        .reverse()
        .forEach((item, i) => {
          if ([...activeUniqueProductKeysfound][i] === item.ProductKey) {
            arrayOfKeysObject.push(item);
          }
        });
      console.log(arrayOfKeysObject);

      // get number of unique PK's based on the number of unique codes entered.
      // allUniqueCodesEntered.forEach((item, i) => {
      //   productKeysSameNumberUniqueCodesEntered.push(
      //     [...activeUniqueProductKeysfound][i]
      //   );
      //   // push found unique codes in array
      //   uniqueCodesFoundInTable.push(
      //     OPP16UC.filter((o) => o.UniqueCode === item)
      //   );
      // });

      if (productKeysSameNumberUniqueCodesEntered && uniqueCodesFoundInTable) {
        multipleUniqueCodes(
          allUniqueCodesEntered,
          productKeysSameNumberUniqueCodesEntered,
          uniqueCodesFoundInTable
        );
      } else {
      }

      // duplicate logic end }
    }

    // find unique codes in all tables
    let foundInCustomerData = customerData.find(
      (o) => o.UniqueCode === e.target[1].value
    );
    let foundUCPP2016 = OPP16UC.find((o) => o.UniqueCode === e.target[1].value);
    let foundUCPP2019 = OPP19UC.find((o) => o.UniqueCode === e.target[1].value);
    let foundUCPP2021 = OPP21UC.find((o) => o.UniqueCode === e.target[1].value);

    // get correct email template
    const getEmailTemplate = (year) => {
      let emailHtml = "";
      emailTemplate.forEach((element) => {
        if (element.software === year) {
          emailHtml = element.html;
        }
      });
      return emailHtml;
    };

    // Checks to find if the unique code is existing in CD table or New unique code
    if (foundInCustomerData) {
      let emailHtml = getEmailTemplate(foundInCustomerData.Year);
      existingCustomer(foundInCustomerData, emailHtml);
    } else if (foundUCPP2016) {
      let emailHtml = getEmailTemplate("Pro Plus 2016");
      newCustomer(foundUCPP2016, "2016", "Pro Plus 2016", OPP16PK, emailHtml);
    } else if (foundUCPP2019) {
      let emailHtml = getEmailTemplate("Pro Plus 2019");
      newCustomer(foundUCPP2019, "2019", "Pro Plus 2019", OPP19PK, emailHtml);
    } else if (foundUCPP2021) {
      let emailHtml = getEmailTemplate("Pro Plus 2021");
      newCustomer(foundUCPP2021, "2021", "Pro Plus 2021", OPP21PK, emailHtml);
    } else {
      setMessage("no found");
    }
  };

  // -Update uc & pk status -Adds new CD -Navigates to PK page -Send emails
  let newCustomer = async (foundUnique, year, name, pkData, template) => {
    let activeProductKey = pkData
      .slice()
      .reverse()
      .find((obj) => obj.Status === "Active");
    if (activeProductKey) {
      const refuc = doc(db, `Unique code ${year}`, foundUnique.id);
      await updateDoc(refuc, {
        Status: false,
      });
      const refpk = doc(db, `Product key ${year}`, activeProductKey.id);
      await updateDoc(refpk, {
        Status: false,
      });
      let newCustomerRef = await addDoc(collection(db, "Customer data"), {
        Email: enteredEmail,
        Name: enteredName,
        ProductKey: activeProductKey.ProductKey,
        Time: new Date(),
        UniqueCode: enteredUniqueCode,
        Year: name,
        template: template,
      });
      navigate("/authorized", {
        state: {
          productKey: activeProductKey.ProductKey,
          auth: true,
          software: name,
          email: enteredEmail,
          uniqueCode: enteredUniqueCode,
          template: template,
        },
      });
      sendEmail(
        enteredEmail,
        enteredName,
        enteredUniqueCode,
        newCustomerRef,
        activeProductKey.ProductKey,
        name,
        template
      );
    } else {
      setMessage("maintenance");
    }
  };

  // -Navigate to PK page -Update CD table -Send email
  let existingCustomer = async (foundCustomer, template) => {
    navigate("/authorized", {
      state: {
        productKey: foundCustomer.ProductKey,
        auth: true,
        software: foundCustomer.Year,
        email: enteredEmail,
        uniqueCode: enteredUniqueCode,
        template: template,
      },
    });
    const refcd = doc(db, "Customer data", foundCustomer.id);
    await updateDoc(refcd, {
      Email: enteredEmail,
      Name: enteredName,
      UniqueCode: enteredUniqueCode,
      Time: new Date(),
    });
    sendEmail(
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      refcd,
      foundCustomer.ProductKey,
      foundCustomer.Year,
      template
    );
  };

  return (
    <div className='home d-flex justify-content-center align-items-center flex-direction-column flex-column'>
      <img src={logo} alt='Displaypin logo' className='logo mb-5' />
      <Form onSubmit={handleSubmit} ref={form} className='form'>
        {message ? <Alert variant='danger'>{message}</Alert> : ""}

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='from_name'
            required
            type='text'
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            placeholder='Enter your name'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='uniqueCode'>
          <Form.Label>Unique code</Form.Label>
          <Form.Control
            name='uc'
            value={enteredUniqueCode}
            onChange={(e) => setEnteredUniqueCode(e.target.value)}
            required
            type='text'
            placeholder='Enter your unique code'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='to_name'
            required
            type='email'
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
            placeholder='Enter your Email'
          />
        </Form.Group>
        <Button variant='primary w-100' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Home;

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
      FoundInTable.forEach(async (element, i) => {
        const refuc = doc(db, `Unique code 2016`, element[0].id);
        await updateDoc(refuc, {
          Status: false,
        });
        await addDoc(collection(db, "Customer data"), {
          Email: enteredEmail,
          Name: enteredName,
          ProductKey: UPK[i].ProductKey,
          Time: new Date(),
          Sent: "Sent",
          UniqueCode: element[0].UniqueCode,
          Year: "Pro Plus 2016",
        });
      });

      // set product codes inactive
      UPK.forEach(async (element) => {
        const refpk = doc(db, `Product key 2016`, element.id);
        await updateDoc(refpk, {
          Status: false,
        });
      });
    };

    //  duplicate solution logic
    // if the input contains (,)
    if (e.target[1].value.includes(",")) {
      // array of unique codes entered
      let allUniqueCodesEntered = e.target[1].value
        .replace(/\s/g, "")
        .split(",");

      // Fnd unique codes entered in talle
      let uniqueCodesFoundInTable = [];
      allUniqueCodesEntered.forEach((item, i) => {
        uniqueCodesFoundInTable.push(
          OPP16UC.filter((o) => o.UniqueCode === item)
        );
      });

      // Get all Active keys
      let activeProductKeysfound = [];
      OPP16PK.slice()
        .reverse()
        .forEach((item) => {
          if (item.Status === "Active") {
            activeProductKeysfound.push(item);
          }
        });

      // get same number of unique product keys as unique codes entered
      let uniquePKarrayOfKeysObject = [];
      uniquePKarrayOfKeysObject = activeProductKeysfound.filter(function ({
        ProductKey,
      }) {
        var key = `${ProductKey}`;
        return !this.has(key) && this.add(key);
      },
      new Set());

      // if same number of unique product keys are found as unique codes entered.
      if (uniquePKarrayOfKeysObject.length >= uniqueCodesFoundInTable.length) {
        multipleUniqueCodes(
          allUniqueCodesEntered,
          uniquePKarrayOfKeysObject.slice(0, allUniqueCodesEntered.length),
          uniqueCodesFoundInTable
        );
      } else {
        console.log("not enough unique keys");
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

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
  // Office pp HB 2021 data
  const OHB21UC = GetUniqueCodesData("Unique code HB 2021");
  const OHB21PK = GetProductKeysData("Product key HB 2021");
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

  // call a correct function based on if a customer is new or old and which unique code is entered.
  let handleSubmit = (e) => {
    e.preventDefault();

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
    //  duplicate solution logic
    // if the input contains (,)
    if (e.target[1].value.includes(",")) {
      // array of unique codes entered
      let allUniqueCodesEntered = e.target[1].value
        .replace(/\s/g, "")
        .split(",");

      // Find unique codes entered in table and are active or already used
      let foundCustomer = [];
      allUniqueCodesEntered.forEach((item, i) => {
        foundCustomer.push(customerData.find((o) => o.UniqueCode === item));
      });
      let uniqueCodePP16 = [];
      allUniqueCodesEntered.forEach((item, i) => {
        uniqueCodePP16.push(
          OPP16UC.filter((o) => o.UniqueCode === item && o.Status === "Active")
        );
      });
      let uniqueCodePP19 = [];
      allUniqueCodesEntered.forEach((item, i) => {
        uniqueCodePP19.push(
          OPP19UC.filter((o) => o.UniqueCode === item && o.Status === "Active")
        );
      });
      let uniqueCodePP21 = [];
      allUniqueCodesEntered.forEach((item, i) => {
        uniqueCodePP21.push(
          OPP21UC.filter((o) => o.UniqueCode === item && o.Status === "Active")
        );
      });
      let uniqueCodeHB21 = [];
      allUniqueCodesEntered.forEach((item, i) => {
        uniqueCodeHB21.push(
          OHB21UC.filter((o) => o.UniqueCode === item && o.Status === "Active")
        );
      });

      if (foundCustomer[0]) {
        let emailHtml = getEmailTemplate(foundCustomer[0].Year);
        existingCustomerMultiple(foundCustomer, emailHtml);
      } else if (uniqueCodePP16[0].length) {
        let emailHtml = getEmailTemplate("Pro Plus 2016");
        newCustomerMultipleUC(
          allUniqueCodesEntered,
          uniqueCodePP16,
          "Pro Plus 2016",
          emailHtml,
          OPP16PK
        );
      } else if (uniqueCodePP19[0].length) {
        let emailHtml = getEmailTemplate("Pro Plus 2019");
        newCustomerMultipleUC(
          allUniqueCodesEntered,
          uniqueCodePP19,
          "Pro Plus 2019",
          emailHtml,
          OPP19PK
        );
      } else if (uniqueCodePP21[0].length) {
        let emailHtml = getEmailTemplate("Pro Plus 2021");
        newCustomerMultipleUC(
          allUniqueCodesEntered,
          uniqueCodePP21,
          "Pro Plus 2021",
          emailHtml,
          OPP21PK
        );
      } else if (uniqueCodeHB21[0].length) {
        let emailHtml = getEmailTemplate("HB 2021");
        newCustomerMultipleUC(
          allUniqueCodesEntered,
          uniqueCodeHB21,
          "HB 2021",
          emailHtml,
          OHB21PK
        );
      } else {
        setMessage("Unique code not found");
      }

      // duplicate logic end }
      // else there is no comma and only 1 unique code
    } else {
      let foundInCustomerData = customerData.find(
        (o) => o.UniqueCode === e.target[1].value
      );
      let foundUCPP2016 = OPP16UC.find(
        (o) => o.UniqueCode === e.target[1].value
      );
      let foundUCPP2019 = OPP19UC.find(
        (o) => o.UniqueCode === e.target[1].value
      );
      let foundUCPP2021 = OPP21UC.find(
        (o) => o.UniqueCode === e.target[1].value
      );
      let foundUCHB2021 = OHB21UC.find(
        (o) => o.UniqueCode === e.target[1].value
      );
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
      } else if (foundUCHB2021) {
        let emailHtml = getEmailTemplate("HB 2021");
        newCustomer(foundUCHB2021, "HB 2021", "HB 2021", OHB21PK, emailHtml);
      } else {
        setMessage("Unique code not found");
      }
    }
  };

  // new customer with multiple unique codes entered separated by a comma
  let newCustomerMultipleUC = (
    allUniqueCodesEntered,
    uniqueCodesFoundInTableAndActive,
    year,
    emailHtml,
    table
  ) => {
    // Get all Active keys
    let activeProductKeysfound = [];
    table
      .slice()
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
    if (
      uniquePKarrayOfKeysObject.length >=
      uniqueCodesFoundInTableAndActive.length
    ) {
      multipleUniqueCodes(
        allUniqueCodesEntered,
        uniquePKarrayOfKeysObject.slice(0, allUniqueCodesEntered.length),
        uniqueCodesFoundInTableAndActive,
        year,
        emailHtml
      );
    } else {
      setMessage(
        `Not enough stock for to fulfill all unique codes at the moment, only ${uniquePKarrayOfKeysObject.length} available in the system `
      );
    }
  };

  // multiple unique codes logic to update db and send email
  const multipleUniqueCodes = (
    UCEntered,
    UPK,
    FoundInTable,
    year,
    etemplate
  ) => {
    // set unique codes inactive
    FoundInTable.forEach(async (element, i) => {
      const refuc = doc(db, `Unique code ${year}`, element[0].id);
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
        Year: `${year}`,
        template: etemplate,
      });
    });

    let stringPK = "";
    // set product codes inactive
    UPK.forEach(async (element) => {
      const refpk = doc(db, `Product key ${year}`, element.id);
      await updateDoc(refpk, {
        Status: false,
      });
      stringPK += element.ProductKey.replaceAll(/\s/g, "") + ", ";
    });

    setTimeout(() => {
      navigate("/authorized", {
        state: {
          productKey: stringPK.slice(0, -2),
          auth: true,
          software: `${year}`,
          email: enteredEmail,
          uniqueCode: enteredUniqueCode,
          template: etemplate,
          multiple: true,
        },
      });
      sendEmail(
        enteredEmail,
        enteredName,
        enteredUniqueCode,
        "",
        stringPK.slice(0, -2),
        year,
        etemplate
      );
    }, 1500);
  };

  // -Update uc & pk status -Adds new CD -Navigates to PK page -Send emails
  let newCustomer = async (foundUnique, year, name, pkData, template) => {
    let foundInCustomerEmail = customerData.find(
      (o) => o.Email === enteredEmail
    );
    let activeProductKey = pkData
      .slice()
      .reverse()
      .find((obj) => obj.Status === "Active");
    // if active product key is available and email is entered first time in the system
    if (activeProductKey && !foundInCustomerEmail) {
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
      // if no active product key show message
    } else if (!activeProductKey) {
      setMessage("maintenance");
      // if product keys are available and email has been used before, send unique.
    } else {
      let allEntriesWithEnteredEmail = customerData.filter(
        (e) => e.Email === enteredEmail
      );
      let allEntries = allEntriesWithEnteredEmail.map((entry) => entry);
      let AllactivePK = pkData
        .slice()
        .reverse()
        .filter((obj) => obj.Status === "Active");

      const compareName = (obj1, obj2) => {
        return obj1.ProductKey === obj2.ProductKey;
      };

      let neverSentBefore = AllactivePK.filter((b) => {
        let indexFound = allEntries.findIndex((a) => compareName(a, b));
        return indexFound === -1;
      });

      if (neverSentBefore.length === 0) {
        setMessage(
          "Not enough stock for to at the moment, please try again later"
        );
      } else {
        neverSentBefore = neverSentBefore[0];
      }

      if (neverSentBefore) {
        const refuc = doc(db, `Unique code ${year}`, foundUnique.id);
        await updateDoc(refuc, {
          Status: false,
        });
        const refpk = doc(db, `Product key ${year}`, neverSentBefore.id);
        await updateDoc(refpk, {
          Status: false,
        });
        let newCustomerRef = await addDoc(collection(db, "Customer data"), {
          Email: enteredEmail,
          Name: enteredName,
          ProductKey: neverSentBefore.ProductKey,
          Time: new Date(),
          UniqueCode: enteredUniqueCode,
          Year: name,
          template: template,
        });
        navigate("/authorized", {
          state: {
            productKey: neverSentBefore.ProductKey,
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
          neverSentBefore.ProductKey,
          name,
          template
        );
      } else {
        setMessage(
          "Not enough stock for to fulfill all unique codes at the moment"
        );
      }
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

  let existingCustomerMultiple = async (foundCustomer, template) => {
    let allPks = "";
    foundCustomer.forEach(async (element) => {
      allPks += element.ProductKey + ", ";
      const refcd = doc(db, "Customer data", element.id);
      await updateDoc(refcd, {
        Email: enteredEmail,
        Name: enteredName,
        Time: new Date(),
      });
    });
    navigate("/authorized", {
      state: {
        productKey: allPks.slice(0, -2),
        auth: true,
        software: foundCustomer[0].Year,
        email: enteredEmail,
        uniqueCode: enteredUniqueCode,
        template: template,
      },
    });

    sendEmail(
      enteredEmail,
      enteredName,
      enteredUniqueCode,
      "",
      allPks.slice(0, -2),
      foundCustomer[0].Year,
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

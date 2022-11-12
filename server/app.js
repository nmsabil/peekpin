const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const {
    enteredEmail,
    enteredName,
    enteredUniqueCode,
    activeProductKey,
    whichLicenseState,
  } = req.body;
  console.log(req.body);
  try {
    const send_to = enteredEmail;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = enteredEmail;
    const subject = `SoftwarePin - ${whichLicenseState}`;
    const message = `
        <p>Hello ${enteredName}, thank You for placing an order with us.</p>
        <h3>Your product key is: ${activeProductKey}</h3>
        <p>Your unique code is: ${enteredUniqueCode}</p>
        <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

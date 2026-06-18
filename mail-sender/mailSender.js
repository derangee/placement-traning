const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get("/", (req, res) => {
    res.send("Email API Running");
});

app.post("/send-email", async (req, res) => {
    try {
        const { name, email, to, subject, message } = req.body;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: `
Name: ${name}
Email: ${email}

${message}
            `
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send email",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
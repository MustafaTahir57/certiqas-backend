const express = require("express");
const { sendContactEmail, sendDemoEmail } = require("../controllers/emailController");

const router = express.Router();

// POST route for contact form
router.post("/contact", sendContactEmail);

// POST route for demo request
router.post("/demo", sendDemoEmail);

module.exports = router;

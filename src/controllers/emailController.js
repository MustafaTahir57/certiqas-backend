const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "info@certiqas.io";
const TO_EMAIL = "info@certiqas.io";

// Contact Form Handler
exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, subject, message) are required",
      });
    }

    // Send email via Resend
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return res.status(500).json({
        success: false,
        message: "Failed to send contact email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact email sent successfully",
      messageId: response.data?.id,
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending contact email",
    });
  }
};

// Demo Request Handler
exports.sendDemoEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, demoType } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !company || !demoType) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (firstName, lastName, email, phone, company, demoType) are required",
      });
    }

    // Send email via Resend
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Demo Request from ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>First Name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Demo Type:</strong> ${escapeHtml(demoType)}</p>
      `,
      replyTo: email,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return res.status(500).json({
        success: false,
        message: "Failed to send demo request email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request email sent successfully",
      messageId: response.data?.id,
    });
  } catch (error) {
    console.error("Demo email error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending demo request email",
    });
  }
};

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const year = new Date().getFullYear();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => res.render("index.ejs", { year }));
app.get("/about", (req, res) => res.render("about.ejs", { year }));
app.get("/contact", (req, res) => res.render("contact.ejs", { year }));
app.get("/testimonials", (req, res) =>
  res.render("testimonials.ejs", { year })
);
app.get("/career", (req, res) => res.render("career.ejs", { year }));
app.get("/pricing", (req, res) => res.render("pricing.ejs", { year }));
app.get("/courses", (req, res) => res.render("courses.ejs", { year }));

// Handle email subscription
app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  // Here you would typically save to database or send to Google Sheets
  // For now, we'll just log it and return success
  console.log("New subscription:", email);

  res.json({ success: true, message: "Successfully subscribed!" });
});

// Handle contact form submission
app.post("/contact", (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields",
    });
  }

  // Log the contact form submission
  console.log("New contact form submission:", {
    firstName,
    lastName,
    email,
    phone: phone || "Not provided",
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  // Here you would typically:
  // 1. Save to database
  // 2. Send email notification
  // 3. Send to Google Sheets
  // 4. Send confirmation email to user

  res.json({
    success: true,
    message:
      "Thank you for your message! We'll get back to you within 24 hours.",
  });
});

// Handle career application form submission
app.post("/career", (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      education,
      experience,
      motivation,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !education ||
      !experience ||
      !motivation
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Log the career application submission
    console.log("New career application submission:", {
      firstName,
      lastName,
      email,
      phone,
      education,
      experience,
      motivation,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to HR
    // 3. Send to Google Sheets
    // 4. Send confirmation email to applicant

    res.json({
      success: true,
      message:
        "Thank you for your application! We'll review your submission and get back to you within 3-5 business days.",
    });
  } catch (error) {
    console.error("Error processing career application:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your application. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Google Sheets API configuration for contact form
const CONTACT_GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbx3vsosHjZKopJHpG7u1VUupDV1MJ8C0ROEPF7KN8ESjSrmfK4EBeUcdlM_HwDj3NEEfg/exec";

// Function to add contact form data to Google Sheets
async function addContactToGoogleSheets(contactData) {
  try {
    console.log(
      "Attempting to send contact form to Google Sheets:",
      contactData
    );
    console.log("Using URL:", CONTACT_GOOGLE_SHEETS_API_URL);

    const requestData = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone || "Not provided",
      subject: contactData.subject,
      message: contactData.message,
      timestamp: new Date().toISOString(),
      source: "contact_form",
    };

    console.log("Sending contact data:", requestData);

    const response = await fetch(CONTACT_GOOGLE_SHEETS_API_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    console.log("Response received:", response);
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    return { success: true };
  } catch (error) {
    console.error("Error adding contact form to Google Sheets:", error);
    return { success: false, error: error.message };
  }
}

// Contact form handling
async function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[name="contact"]');
  const originalButtonText = submitButton.innerHTML;

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Basic validation
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "subject",
    "message",
  ];
  const missingFields = requiredFields.filter(
    (field) => !data[field] || data[field].trim() === ""
  );

  if (missingFields.length > 0) {
    alert("Please fill in all required fields: " + missingFields.join(", "));
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show loading state
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  submitButton.disabled = true;

  try {
    // First, send to our server
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Then send to Google Sheets
      const sheetsResult = await addContactToGoogleSheets(data);

      if (sheetsResult.success) {
        alert(
          "Thank you for your message! We'll get back to you within 24 hours."
        );
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.warn(
          "Contact form saved to server but failed to add to Google Sheets"
        );
        alert(
          "Thank you for your message! We'll get back to you within 24 hours."
        );
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      alert(result.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    alert("An error occurred while sending your message. Please try again.");
  } finally {
    // Reset button
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }
}

// Initialize contact form handling when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
});

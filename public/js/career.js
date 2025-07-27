// Google Sheets API configuration for career form
const CAREER_GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbxTwhYGf4pU9C0MhT1lfY4iJVvo7SgQ9SUTqO0Mmy2u19l8KIJKXmc6zl93yp0KqcgPcg/exec";

// Function to add career application to Google Sheets
async function addCareerToGoogleSheets(careerData) {
  try {
    console.log(
      "Attempting to send career application to Google Sheets:",
      careerData
    );
    console.log("Using URL:", CAREER_GOOGLE_SHEETS_API_URL);

    const requestData = {
      firstName: careerData.firstName,
      lastName: careerData.lastName,
      email: careerData.email,
      phone: careerData.phone,
      education: careerData.education,
      experience: careerData.experience,
      motivation: careerData.motivation,
      timestamp: new Date().toISOString(),
      source: "career_form",
    };

    console.log("Sending career data:", requestData);

    const response = await fetch(CAREER_GOOGLE_SHEETS_API_URL, {
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
    console.error("Error adding career application to Google Sheets:", error);
    return { success: false, error: error.message };
  }
}

// Career application form handling
async function handleCareerForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[name="career"]');
  const originalButtonText = submitButton.innerHTML;

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Basic validation
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "education",
    "experience",
    "motivation",
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

  // Phone validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Show loading state
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
  submitButton.disabled = true;

  try {
    // First, send to our server
    const response = await fetch("/career", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Then send to Google Sheets
      const sheetsResult = await addCareerToGoogleSheets(data);

      if (sheetsResult.success) {
        alert(
          "Thank you for your application! We'll review your submission and get back to you within 3-5 business days."
        );
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.warn(
          "Career application saved to server but failed to add to Google Sheets"
        );
        alert(
          "Thank you for your application! We'll review your submission and get back to you within 3-5 business days."
        );
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      alert(result.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting career application:", error);
    alert(
      "An error occurred while submitting your application. Please try again."
    );
  } finally {
    // Reset button
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }
}

// Initialize career form handling when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const careerForm = document.querySelector(".career-form");
  if (careerForm) {
    careerForm.addEventListener("submit", handleCareerForm);
  }
});

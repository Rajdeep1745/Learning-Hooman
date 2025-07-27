// Google Sheets API configuration
const GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbx3vsosHjZKopJHpG7u1VUupDV1MJ8C0ROEPF7KN8ESjSrmfK4EBeUcdlM_HwDj3NEEfg/exec";

// Function to add email to Google Sheets
async function addEmailToGoogleSheets(email) {
  try {
    console.log("Attempting to send email to Google Sheets:", email);
    console.log("Using URL:", GOOGLE_SHEETS_API_URL);

    const requestData = {
      email: email,
      timestamp: new Date().toISOString(),
      source: "website_subscription",
    };

    console.log("Sending data:", requestData);

    const response = await fetch(GOOGLE_SHEETS_API_URL, {
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
    console.error("Error adding email to Google Sheets:", error);
    return { success: false, error: error.message };
  }
}

// Function to handle form submission
async function handleSubscribeForm(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('input[name="email"]');
  const submitButton = form.querySelector('button[name="subscribe"]');
  const email = emailInput.value.trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Disable button and show loading state
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Subscribing...";
  submitButton.disabled = true;

  try {
    // First, send to our server
    const serverResponse = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const serverResult = await serverResponse.json();

    if (serverResult.success) {
      // Then send to Google Sheets
      const sheetsResult = await addEmailToGoogleSheets(email);

      if (sheetsResult.success) {
        alert("Thank you for subscribing!");
        emailInput.value = "";
      } else {
        console.warn(
          "Email saved to server but failed to add to Google Sheets"
        );
        alert("Thank you for subscribing!");
        emailInput.value = "";
      }
    } else {
      alert(serverResult.message || "Subscription failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during subscription:", error);
    alert("An error occurred. Please try again.");
  } finally {
    // Re-enable button
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
}

// Initialize form handling when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.querySelector(".subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", handleSubscribeForm);
  }
});

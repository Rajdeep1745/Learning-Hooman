// Google Apps Script to handle both email subscriptions and contact form submissions
// IMPORTANT: Make sure you're signed into the correct Google account before deploying this script

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = data.timestamp || new Date().toISOString();
    const source = data.source || "website";

    // IMPORTANT: Replace this with your NEW spreadsheet ID from the different Google account
    const spreadsheetId = "YOUR_NEW_SPREADSHEET_ID"; // Replace with your actual spreadsheet ID

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    // Determine which sheet to use based on the source
    if (source === "contact_form") {
      // Handle contact form submission
      const contactSheet = spreadsheet.getSheetByName("Contact_Submissions");

      if (!contactSheet) {
        // Create the contact sheet if it doesn't exist
        const newSheet = spreadsheet.insertSheet("Contact_Submissions");
        newSheet
          .getRange(1, 1, 1, 8)
          .setValues([
            [
              "First Name",
              "Last Name",
              "Email",
              "Phone",
              "Subject",
              "Message",
              "Timestamp",
              "Source",
            ],
          ]);
        newSheet.getRange(1, 1, 1, 8).setFontWeight("bold");
      }

      // Add the new contact form row
      const lastRow = contactSheet.getLastRow();
      contactSheet
        .getRange(lastRow + 1, 1, 1, 8)
        .setValues([
          [
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.subject,
            data.message,
            timestamp,
            source,
          ],
        ]);
    } else {
      // Handle email subscription
      const subscriptionSheet = spreadsheet.getSheetByName("Subscriptions");

      if (!subscriptionSheet) {
        // Create the subscription sheet if it doesn't exist
        const newSheet = spreadsheet.insertSheet("Subscriptions");
        newSheet
          .getRange(1, 1, 1, 4)
          .setValues([["Email", "Timestamp", "Source", "Date"]]);
        newSheet.getRange(1, 1, 1, 4).setFontWeight("bold");
      }

      // Add the new subscription row
      const lastRow = subscriptionSheet.getLastRow();
      subscriptionSheet
        .getRange(lastRow + 1, 1, 1, 4)
        .setValues([[data.email, timestamp, source, new Date()]]);
    }

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data added successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "Contact and subscription service is running"
  ).setMimeType(ContentService.MimeType.TEXT);
}

// Test function for contact form
function testContactForm() {
  const testData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    subject: "General Inquiry",
    message: "This is a test message",
    timestamp: new Date().toISOString(),
    source: "contact_form",
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// Test function for subscription
function testSubscription() {
  const testData = {
    email: "test@example.com",
    timestamp: new Date().toISOString(),
    source: "website_subscription",
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

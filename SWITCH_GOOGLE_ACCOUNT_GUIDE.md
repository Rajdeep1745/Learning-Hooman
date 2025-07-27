# How to Use a Different Google Account for Google Sheets

This guide will help you switch to a different Google account for saving form submissions to Google Sheets.

## 🔄 **Method 1: Switch Account in Google Apps Script (Recommended)**

### **Step 1: Sign Out of Current Account**

1. **Go to Google Apps Script**: https://script.google.com
2. **Click your profile picture** in the top right corner
3. **Click "Sign out"**
4. **Close the browser tab**

### **Step 2: Sign In with Different Account**

1. **Open a new browser tab**
2. **Go to Google Apps Script**: https://script.google.com
3. **Sign in with the different Google account** you want to use
4. **Verify you're signed into the correct account** (check the profile picture)

### **Step 3: Create New Google Sheet**

1. **Go to Google Sheets**: https://sheets.google.com
2. **Create a new spreadsheet** (make sure you're in the correct account)
3. **Name it** something like "Learning Hooman - Form Submissions"
4. **Copy the Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`
   - Copy the long string between `/d/` and `/edit`

### **Step 4: Create New Google Apps Script Project**

1. **Go to Google Apps Script**: https://script.google.com
2. **Click "New Project"**
3. **Replace the default code** with the contents of `google-apps-script-different-account.js`
4. **Update the Spreadsheet ID**:
   ```javascript
   const spreadsheetId = "YOUR_NEW_SPREADSHEET_ID"; // Replace with your actual ID
   ```
5. **Save the project** with a name like "Learning Hooman Form Handler"

### **Step 5: Deploy the Script**

1. **Click "Deploy"** → "New deployment"
2. **Choose "Web app"** as the type
3. **Set the following**:
   - **Execute as**: Me (your new Google account)
   - **Who has access**: Anyone
4. **Click "Deploy"**
5. **Copy the Web App URL** that's generated

### **Step 6: Update Your JavaScript Files**

1. **Update `public/js/subscribe.js`**:

   ```javascript
   const GOOGLE_SHEETS_API_URL = "YOUR_NEW_WEB_APP_URL";
   ```

2. **Update `public/js/contact.js`**:
   ```javascript
   const CONTACT_GOOGLE_SHEETS_API_URL = "YOUR_NEW_WEB_APP_URL";
   ```

## 🔄 **Method 2: Use Google Account Switcher**

### **Step 1: Add Account to Browser**

1. **Click your profile picture** in any Google service
2. **Click "Add another account"**
3. **Sign in with the different account**
4. **Switch between accounts** using the profile switcher

### **Step 2: Create Script in Different Account**

1. **Switch to the different account** using the profile switcher
2. **Follow Steps 3-6** from Method 1

## 🔄 **Method 3: Use Incognito/Private Browser**

### **Step 1: Open Private Browser**

1. **Open incognito/private browsing** in your browser
2. **Go to Google Apps Script**: https://script.google.com
3. **Sign in with the different account**

### **Step 2: Create Everything Fresh**

1. **Create new Google Sheet** in the different account
2. **Create new Google Apps Script** project
3. **Follow Steps 3-6** from Method 1

## 🔍 **Verification Steps**

### **Step 1: Test the Setup**

1. **Start your server**: `node index.js`
2. **Go to your website**: http://localhost:3000
3. **Submit a test subscription** or contact form
4. **Check the Google Sheet** in the different account

### **Step 2: Verify Account Ownership**

1. **Open the Google Sheet** in the different account
2. **Check the URL** - it should show the different account's email
3. **Check Google Apps Script** - it should show the different account's email

## 🚨 **Important Notes**

### **Account Permissions**

- **The Google Apps Script must run as the account that owns the spreadsheet**
- **Make sure the different account has access to Google Sheets and Apps Script**
- **The account must have sufficient permissions** to create and modify spreadsheets

### **Data Migration**

- **Old data will remain in the previous account's spreadsheet**
- **New submissions will go to the new account's spreadsheet**
- **Consider copying important data** from the old spreadsheet to the new one

### **Security Considerations**

- **The new account will have access to all form submissions**
- **Make sure this is the intended account** for data storage
- **Consider sharing the spreadsheet** with other team members if needed

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Script not found" error**

   - Make sure you're signed into the correct account
   - Verify the Web App URL is correct
   - Check that the script is deployed

2. **"Permission denied" error**

   - Ensure the script is set to "Execute as: Me"
   - Make sure "Who has access" is set to "Anyone"
   - Verify the account owns the spreadsheet

3. **Data not appearing in sheet**

   - Check that the spreadsheet ID is correct
   - Verify you're looking at the right Google account
   - Check browser console for error messages

4. **Wrong account showing**
   - Clear browser cache and cookies
   - Use incognito/private browsing
   - Sign out and sign in again

## 📊 **Managing Multiple Accounts**

### **Best Practices:**

- **Use different browsers** for different accounts
- **Use incognito mode** for testing
- **Keep account credentials** organized and secure
- **Document which account** is used for which purpose

### **Account Organization:**

- **Business account**: For production data
- **Personal account**: For testing and development
- **Team account**: For shared access

## ✅ **Success Checklist**

After switching accounts, verify:

- [ ] **Google Apps Script** shows the correct account
- [ ] **Google Sheet** is owned by the correct account
- [ ] **Web App URL** is from the new deployment
- [ ] **JavaScript files** are updated with new URL
- [ ] **Form submissions** appear in the new spreadsheet
- [ ] **No errors** in browser console
- [ ] **Server logs** show successful submissions

## 🎯 **Next Steps**

After successfully switching accounts:

1. **Test all forms** (subscription and contact)
2. **Set up sharing** if needed
3. **Configure notifications** for new submissions
4. **Set up automated responses**
5. **Create data backup** procedures

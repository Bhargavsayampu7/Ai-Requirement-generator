# Gemini API Key Setup Guide

## ⚠️ Current Issue

Your Gemini API key is being rejected by Google with the error:
```
API Key not found. Please pass a valid API key.
```

## 🔑 How to Get a Valid API Key

### Step 1: Go to Google AI Studio
Visit: **https://makersuite.google.com/app/apikey**

Or alternatively: **https://aistudio.google.com/app/apikey**

### Step 2: Create or Get Your API Key
1. Sign in with your Google account
2. Click "Create API Key" or "Get API Key"
3. Select a Google Cloud project (or create a new one)
4. Copy the generated API key

### Step 3: Verify Your API Key
The key should look like this format:
```
AIzaSy...  (39 characters total)
```

### Step 4: Update Your .env File
Edit: `/Users/bhargavteja/Desktop/BA-project1/ai-requirement-generator/backend/.env`

Replace the current key with your new valid key:
```env
GEMINI_API_KEY=your_new_valid_key_here
PORT=3001
```

### Step 5: Restart the Backend Server
1. Stop the current backend (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   cd /Users/bhargavteja/Desktop/BA-project1/ai-requirement-generator/backend
   npm start
   ```

## 🧪 Test Your API Key

You can test if your API key works with this command:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

If it works, you should see a JSON response with generated text.
If it fails, you'll see an error message.

## 🔍 Common Issues

### Issue 1: API Key Not Enabled
- Make sure you've enabled the Gemini API in your Google Cloud project
- Go to: https://console.cloud.google.com/apis/library

### Issue 2: Billing Not Set Up
- Some Google Cloud APIs require billing to be enabled
- Check: https://console.cloud.google.com/billing

### Issue 3: API Key Restrictions
- Check if your API key has restrictions (IP, referrer, etc.)
- Go to: https://console.cloud.google.com/apis/credentials

### Issue 4: Wrong API Key
- Make sure you're using a Gemini API key, not a different Google API key
- The key must be specifically for the Generative Language API

## 📝 Current Key Status

Your current key in `.env`:
```
AIzaSyB-xQusrsUmPO3uU9BpDZR1xT2mG-dcZls
```

**Status**: ❌ Invalid - Google API returns "API Key not found"

**Action Required**: Get a new valid API key from Google AI Studio

## 🚀 After Fixing

Once you have a valid API key:
1. Update `.env` file
2. Restart backend server
3. Test the application at http://localhost:5173
4. Try generating requirements for a sample idea

## 📚 Additional Resources

- Gemini API Documentation: https://ai.google.dev/docs
- Google AI Studio: https://aistudio.google.com
- API Key Management: https://console.cloud.google.com/apis/credentials

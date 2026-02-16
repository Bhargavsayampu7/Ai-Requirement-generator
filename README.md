# AI Requirement Generator

Transform your startup ideas into structured product requirements instantly using AI.

## Features

- **Product Overview**: Concise summary of your idea
- **User Personas**: Detailed user profiles with goals and pain points
- **User Flows**: Step-by-step user journeys
- **User Stories**: Structured requirements in standard format
- **Acceptance Criteria**: Clear, testable conditions

## Tech Stack

### Backend
- Node.js + Express
- Google Gemini API
- CORS enabled

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios
- html2pdf.js

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. The default API URL is already set to `http://localhost:5000`

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter your startup idea in the textarea
3. Click "Generate Requirements" or press `Ctrl + Enter`
4. Wait for the AI to generate your requirements
5. View, copy, or export the results as Markdown or PDF

## API Documentation

### POST `/generate`

Generate product requirements from a startup idea.

**Request Body:**
```json
{
  "idea": "Your startup idea description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "rawContent": "Full markdown content",
    "sections": {
      "productOverview": "...",
      "userPersonas": "...",
      "userFlows": "...",
      "userStories": "...",
      "acceptanceCriteria": "..."
    }
  }
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Error description"
}
```

## Project Structure

```
ai-requirement-generator/
├── backend/
│   ├── routes/
│   │   └── generate.js       # Gemini API integration
│   ├── index.js               # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IdeaInput.jsx
│   │   │   ├── GenerateButton.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── SectionCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Environment Variables

### Backend
- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `PORT`: Server port (default: 5000)

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

## Features in Detail

### Premium UI Design
- Dark mode with glassmorphism effects
- Smooth animations and transitions
- Gradient backgrounds
- Responsive design

### Export Options
- Copy individual sections
- Copy all content
- Export as Markdown file
- Export as PDF

### Error Handling
- Input validation
- API error messages
- Loading states
- User-friendly error displays

## Development

### Backend Development Mode
```bash
cd backend
npm run dev
```

### Frontend Development Mode
```bash
cd frontend
npm run dev
```

### Build for Production

Frontend:
```bash
cd frontend
npm run build
```

## Troubleshooting

### API Key Issues
- Ensure your Gemini API key is valid
- Check that the `.env` file is in the correct location
- Restart the backend server after adding the API key

### CORS Errors
- Verify the backend is running on port 5000
- Check that `VITE_API_URL` in frontend `.env` matches the backend URL

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v18+)

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

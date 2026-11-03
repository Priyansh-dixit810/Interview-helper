# Interview Helper

Interview Helper is an AI-powered resume and interview preparation platform. Upload a resume, paste a target job description, and provide a short profile description to receive a personalized interview plan.

## Live Demo

[Open Interview Helper](https://interview-helper-one.vercel.app/)

## Features

- Upload and extract text from PDF resumes.
- Compare a resume with a target job description.
- Generate an AI match score and skill-gap analysis.
- Generate technical and behavioral interview questions with sample answers.
- Create a day-by-day interview preparation roadmap.
- Save and revisit generated interview reports.
- Download an AI-generated, job-tailored resume as a PDF.
- Secure authentication with JWT and HTTP-only cookies.

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Google Gemini API
- JWT authentication
- `pdf-parse` for resume text extraction
- Puppeteer for PDF generation
- Multer for file uploads

## Project Structure

```text
.
├── Backend/     # Express API, authentication, AI integration, PDF generation
└── Frontend/    # React client application
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Priyansh-dixit810/Interview-helper.git
cd Interview-helper
```

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` using `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
PRODUCTION=false
FRONTEND_URL=http://localhost:5173
```

Start the API:

```bash
node server.js
```

The backend runs on `http://localhost:3000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

For a production frontend build, set `VITE_API_BASE_URL` to the deployed backend URL before running:

```bash
VITE_API_BASE_URL=https://your-backend-url.example.com npm run build
```

## Deployment

- Frontend: deploy the `Frontend` directory to Vercel.
- Backend: deploy the `Backend` directory to Render or another Node.js host.
- Configure all backend environment variables in the hosting provider.
- Set `FRONTEND_URL` to the exact deployed frontend origin.
- The backend installs the Puppeteer Chrome binary during `npm install` for PDF generation.

## Notes

- Resume uploads must be PDF files and are limited by the upload validation in the frontend.
- Never commit `.env` files or API keys to the repository.
- The AI-generated content should be reviewed and edited before use in an application or interview.

## Author

[Priyansh Dixit](https://github.com/Priyansh-dixit810)

# Perplexity

A full-stack AI-powered chat application inspired by Perplexity, built with a React frontend and an Express + MongoDB backend. The app includes user authentication, email verification, AI chat responses, internet search support, and persistent chat history.

## Features

- User registration and login
- JWT-based authentication
- Email verification during signup
- Email sending using Gmail OAuth + Nodemailer
- AI chat conversations with Gemini + LangChain
- Internet search capability via Tavily
- Chat title generation using Mistral
- Real-time socket server setup
- Persistent chat history in MongoDB
- React + Vite frontend with Redux state management

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS
- React Markdown

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- Socket.IO
- JWT + bcryptjs
- LangChain
- Google Generative AI
- Mistral AI
- Tavily
- Nodemailer

## Project Structure

```text
Perplexity/
├── client/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── sever/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── ...
├── .gitignore
└── README.md
```

## Getting Started

### 1. Install dependencies

Backend:

```bash
cd Perplexity/sever
npm install
```

Frontend:

```bash
cd Perplexity/client
npm install
```

### 2. Configure environment variables

Create or update the backend `.env` file in `Perplexity/sever/.env` with the required values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_email@example.com
```

> The email feature uses Gmail OAuth2 credentials, so the app can send verification and welcome emails automatically when a user registers.

### 3. Run the backend

```bash
cd Perplexity/sever
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### 4. Run the frontend

```bash
cd Perplexity/client
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Email Verification Flow

When a user registers:

1. The backend creates a JWT token using the user email.
2. It sends a verification email through Gmail SMTP/OAuth.
3. The user clicks the verification link.
4. The backend verifies the token and marks the user as verified.
5. Only verified users can log in successfully.

This is handled by the auth controller and the email service in the backend.

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user and send a verification email
- `POST /api/auth/login` — Log in a user after email verification
- `GET /api/auth/get-me` — Get the authenticated user
- `GET /api/auth/verify-email` — Verify the email token and activate the account

### Chats

- `POST /api/chats/message` — Send a message and get an AI response
- `GET /api/chats` — Fetch all chats for the logged-in user
- `GET /api/chats/:chatId/messages` — Fetch messages from a chat
- `DELETE /api/chats/delete/:chatId` — Delete a chat

## App Flow

1. User registers with a username, email, and password.
2. The backend sends a verification email through Gmail OAuth.
3. User confirms the email via the verification link.
4. JWT token is generated for authenticated requests.
5. User sends a prompt through the chat UI.
6. Backend creates or fetches a conversation.
7. AI service generates a response, optionally using Tavily search.
8. Messages are stored in MongoDB and the chat history is returned to the client.

## Notes

- The backend uses CORS configured for `http://localhost:5173`.
- Socket.IO is initialized in the server for real-time chat support.
- AI models are connected through LangChain wrappers and environment-provided API keys.
- Gmail OAuth credentials are required for the email verification feature.

## Useful Commands

```bash
# backend
cd Perplexity/sever
npm run dev

# frontend
cd Perplexity/client
npm run dev
npm run build
```

## License

This project is currently unlicensed unless you add a license file or update the package metadata.

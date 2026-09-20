# Perplexity

A full-stack AI research and chat application inspired by Perplexity, built with a React frontend and an Express + MongoDB backend. Users can sign up, verify their email, chat with an AI assistant, and ask questions that can use live web search and email-sending capabilities.

## Overview

This project combines:

- A React + Vite frontend for the user interface
- An Express backend for API routes, auth, and AI orchestration
- MongoDB for persistent user and chat data
- Redis for token blacklisting
- Socket.IO for real-time server communication
- LangChain with Google Gemini and Mistral models for AI responses and chat titles
- Tavily search integration for live information retrieval
- Gmail-based email sending for account verification and notifications

## Features

- User registration and login
- JWT-based authentication
- Email verification during signup
- Secure password hashing with bcrypt
- AI chat generation using Gemini
- Chat title generation using Mistral
- Web search integration via Tavily
- Email sending through Gmail/Nodemailer when explicitly requested by the user
- Persistent chat and message history in MongoDB
- Real-time socket server setup
- Responsive frontend with Redux and Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Redux Toolkit
- Axios
- Socket.IO Client
- Tailwind CSS
- React Markdown

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- Redis
- Socket.IO
- JWT
- bcryptjs
- LangChain
- Google Generative AI
- Mistral AI
- Tavily
- Nodemailer

## Project Structure

```text
Perplexity/
├── client/
│   ├── public/
│   ├── src/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── server/
│   ├── src/
│   ├── package.json
│   ├── server.js
│   └── .env
├── .gitignore
├── README.md
└── .git/
```

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- MongoDB running locally or a MongoDB Atlas connection string
- Redis running locally (for token blacklist support)
- API keys for:
  - Gemini
  - Mistral
  - Tavily
- Gmail OAuth credentials for email sending

> The email verification flow relies on Gmail OAuth credentials, so it can send account verification messages successfully.

## Installation

### 1. Install backend dependencies

```bash
cd Perplexity/server
npm install
```

### 2. Install frontend dependencies

```bash
cd ../client
npm install
```

## Running the App

### Start the backend

```bash
cd Perplexity/server
npm run dev
```

The backend starts on:

```text
http://localhost:8000
```

### Start the frontend

```bash
cd Perplexity/client
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Overview

### Authentication

- `POST /api/auth/register` — Register a new user and send a verification email
- `POST /api/auth/login` — Log in an authenticated user
- `POST /api/auth/logout` — Log the user out and blacklist the current token
- `GET /api/auth/get-me` — Get the current logged-in user
- `GET /api/auth/verify-email` — Verify a user email using the token in the query string

### Chats

- `POST /api/chats/message` — Send a message and receive an AI response
- `GET /api/chats` — Fetch all chats for the logged-in user
- `GET /api/chats/:chatId/messages` — Fetch all messages in a specific chat
- `DELETE /api/chats/delete/:chatId` — Delete a chat and its messages

## Authentication Flow

1. A user signs up with a username, email, and password.
2. The backend creates the user and sends a verification email.
3. The user opens the verification link and activates the account.
4. The user logs in with verified credentials.
5. A JWT is generated and stored in a cookie for protected routes.

## AI Workflow

1. User sends a prompt from the frontend.
2. The backend checks whether a chat already exists.
3. The conversation history is sent to the AI service.
4. Gemini answers the prompt, optionally using Tavily search when required.
5. The AI response is saved as a message and returned to the client.
6. A chat title is generated automatically when a new conversation starts.

## Notes

- CORS is configured for `http://localhost:5173`.
- Socket.IO is initialized in the server for future real-time messaging features.
- The app is structured as a monorepo-like workspace with separate frontend and backend folders.
- The project currently does not include a license file.

## Useful Commands

```bash
# Backend
cd Perplexity/server
npm run dev

# Frontend
cd Perplexity/client
npm run dev
npm run build
```

## License

This project is currently unlicensed. Add a license file if you plan to distribute or publish it publicly.

# 🏠 Real Estate App (Price Point)

A full-stack real estate/vacation rental discovery application with AI-powered chat assistance. Users can browse properties, ask intelligent questions about accommodations, and manage chat sessions with an AI travel assistant powered by **Groq LLM** and **RAG technology**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Architecture Overview](#architecture-overview)
- [Development](#development)
- [Contributing](#contributing)

## ✨ Features

### Mobile/Web Application (Frontend)
- **User Authentication**: Google Sign-In integration with JWT token-based auth
- **Property Discovery**: Browse luxury vacation rentals and real estate listings
- **AI Chat Assistant**: Conversational interface to ask about properties and get personalized recommendations
- **Chat History**: Persistent chat sessions with auto-generated titles
- **Responsive Design**: NativeWind & Tailwind CSS for beautiful, responsive UI
- **Cross-Platform**: Runs on iOS, Android, and Web

### Backend Services
- **RESTful API**: Express.js server for user management and chat operations
- **Authentication**: JWT-based secure authentication with bcrypt password hashing
- **Chat Management**: Session-based chat with message history
- **Database**: MongoDB for persistent user, session, and message storage

### AI Engine
- **RAG (Retrieval-Augmented Generation)**: LangChain-based retrieval system using FAISS vector store
- **Property Search**: Semantic search across property database
- **Smart Recommendations**: AI provides personalized property suggestions based on user preferences
- **LLM Integration**: Groq's Llama 3.3 70B model for high-quality responses

## 🛠 Tech Stack

| Layer | Technology | Usage |
|-------|-----------|-------|
| **Frontend** | TypeScript (61.5%), JavaScript (24.9%) | React Native + Expo Router |
| **Mobile** | Kotlin (7.6%) | Android native components |
| **Styling** | CSS (0.1%), Tailwind CSS, NativeWind | UI styling |
| **Backend** | Node.js, Express.js | REST API server |
| **Database** | MongoDB, Mongoose | Data persistence |
| **AI/ML** | Python (5.9%) | FastAPI, LangChain, Groq SDK |
| **Authentication** | JWT, bcryptjs, Google Sign-In | User auth & security |
| **UI Components** | React Navigation, React Native Paper, Expo Icons | Navigation & UI |

## 📁 Project Structure

```
real-estate-app/
├── app/                          # Frontend React Native application
│   ├── (auth)/                  # Authentication screens & flows
│   ├── (root)/                  # Main app navigation structure
│   ├── context/                 # React Context API providers
│   ├── hooks/                   # Custom React hooks
│   ├── _layout.tsx              # Root layout configuration
│   ├── index.tsx                # Home/splash screen
│   └── global.css               # Global styles
├── backend/                      # Node.js/Express REST API
│   ├── models/                  # MongoDB schemas
│   │   ├── userModel.js         # User schema (username, email, password)
│   │   ├── sessionModel.js      # Chat session schema
│   │   └── messageModel.js      # Message/chat history schema
│   ├── services/                # Business logic layer
│   │   ├── auth.service.js      # User registration & login
│   │   ├── chat.service.js      # Chat message creation & retrieval
│   │   └── session.service.js   # Session CRUD operations
│   ├── controllers/             # Route handlers
│   ├── routes/                  # API endpoints
│   │   ├── auth.routes.js       # /auth endpoints
│   │   ├── chat.routes.js       # /chat endpoints (protected)
│   │   └── session.routes.js    # /session endpoints (protected)
│   ├── middleware/              # Express middleware
│   │   └── authMiddleware.js    # JWT verification
│   ├── index.js                 # Express app setup & server
│   ├── connectdb.js             # MongoDB connection
│   └── package.json             # Node dependencies
├── ai/                           # Python AI/ML engine
│   ├── main.py                  # FastAPI server & query endpoint
│   ├── rag.py                   # RAG chain & property retrieval logic
│   ├── data/                    # Property database
│   │   └── properties.json      # Real estate listings with metadata
│   └── requirements.txt         # Python dependencies
├── assets/                       # Images, icons, fonts
├── android/                      # Android native code
├── app.json                      # Expo app configuration
├── package.json                 # Frontend dependencies (Expo, React Native)
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── babel.config.js              # Babel transpiler config
├── metro.config.js              # React Native Metro bundler config
└── eas.json                     # EAS Build configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Python** (3.9+)
- **MongoDB** (local or Atlas)
- **Expo CLI**: `npm install -g expo-cli`
- **Google Cloud credentials** (for Google Sign-In)
- **Groq API Key** (for LLM access)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/WynnChan123/real-estate-app.git
cd real-estate-app
```

#### 2. Frontend Setup
```bash
npm install
```

#### 3. Backend Setup
```bash
cd backend
npm install
cd ..
```

#### 4. AI Engine Setup
```bash
cd ai
python -m venv venv
# On Windows:
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cd ..
```

### Configuration

Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate-app
JWT_SECRET=your_super_secret_jwt_key_here
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
```

Create a `.env` file in the `ai/` directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Running the Application

#### Terminal 1: Backend Server
```bash
cd backend
npm install  # if not already done
node index.js
# Server runs on http://localhost:3000
```

#### Terminal 2: AI Engine (FastAPI)
```bash
cd ai
source venv/bin/activate  # or venv\Scripts\Activate.ps1 on Windows
fastapi dev main.py
# Server runs on http://localhost:8000
```

#### Terminal 3: Frontend (Expo)
```bash
npm start
# Follow the prompts to open in:
# - iOS Simulator (press 'i')
# - Android Emulator (press 'a')
# - Expo Go App (press 'j' for web preview or scan QR code)
```

**For development with native modules:**
```bash
npx expo start --dev-client
```

**To build Android APK for testing:**
```bash
cd backend
npx eas-cli build --platform android --profile development
```

## 📡 API Documentation

### Authentication Routes (`/auth`)
- **POST** `/auth/register` - Register new user
  ```json
  { "username": "john_doe", "email": "john@example.com", "password": "securepass" }
  ```
- **POST** `/auth/login` - Login & get JWT token
  ```json
  { "email": "john@example.com", "password": "securepass" }
  ```

### Chat Routes (`/chat`) - Protected
- **POST** `/chat/createMessage` - Send message & get AI response
  ```json
  { "sessionId": "507f1f77bcf86cd799439011", "userId": "...", "content": "Find me a beachfront villa" }
  ```
- **GET** `/chat/getMessages/:sessionId` - Retrieve chat history

### Session Routes (`/session`) - Protected
- **POST** `/session/createSession` - Create new chat session
- **GET** `/session/getSessions` - Get all user sessions
- **GET** `/session/getSession/:sessionId` - Get specific session with chats
- **DELETE** `/session/deleteSession/:sessionId` - Delete session
- **PATCH** `/session/updateSessionTitle` - Update session title

### AI Query Endpoint (`/query`)
- **POST** `/query` - Submit query to AI engine
  ```json
  { "message": "Show me pet-friendly properties", "chatHistory": [...] }
  ```

## 🏗 Architecture Overview

### Data Flow
1. **User → Frontend**: User interacts with React Native app
2. **Frontend → Backend**: Sends auth/chat requests with JWT token
3. **Backend → Database**: Stores/retrieves user data, sessions, messages
4. **Backend → AI Engine**: Sends user query + chat history
5. **AI Engine**: Retrieves relevant properties using FAISS RAG → Calls Groq LLM → Returns response
6. **Response → Frontend**: Updates UI with AI recommendations

### Authentication Flow
- User registers/logs in → Backend hashes password → JWT token generated
- Token stored in client → Sent in `Authorization: Bearer <token>` header
- Protected routes verify JWT middleware → Access granted

### RAG Pipeline
1. **Property Load**: `properties.json` loaded with full metadata
2. **Embedding**: Properties converted to embeddings using HuggingFace `all-MiniLM-L6-v2`
3. **Vector Store**: Embeddings stored in FAISS for semantic search
4. **Retrieval**: Top 3 matching properties retrieved based on query
5. **LLM Generation**: Groq Llama 3.3 generates personalized recommendation
6. **Response**: AI-crafted response with property suggestions sent to user

## 💻 Development

### Available Scripts

**Frontend:**
```bash
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run ios            # Run on iOS simulator
npm run web            # Run web version
npm test               # Run Jest tests
npm run lint           # Run ESLint
npm run reset-project  # Reset to blank project
```

**Backend:**
```bash
cd backend
node index.js          # Start server
npm test               # Run tests
```

**AI Engine:**
```bash
cd ai
fastapi dev main.py    # Start FastAPI server
```

### Key Technologies

- **React Native + Expo**: Cross-platform mobile development
- **Expo Router**: File-based routing (like Next.js)
- **NativeWind**: Tailwind CSS for React Native
- **Express.js**: Lightweight Node.js framework
- **MongoDB + Mongoose**: NoSQL database with schema validation
- **LangChain**: LLM orchestration framework
- **FAISS**: Facebook AI Similarity Search for vector indexing
- **Groq API**: Fast LLM inference
- **JWT + bcryptjs**: Secure authentication

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and owned by WynnChan123.

---

## 🤝 Support

For issues, questions, or suggestions, please open a GitHub issue or contact the maintainer.

**Built with ❤️ using React Native, Node.js, Python, and AI**
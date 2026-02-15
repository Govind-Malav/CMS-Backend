# CMS Backend

A powerful backend service for a Content Management System (CMS), built with Node.js, Express, and MongoDB. This API handles user authentication, artifact management, social interactions (likes, comments), real-time chat, and more.

## Features

- **Authentication**: Secure user registration and login using JWT and bcrypt.
- **Artifact Management**: Create, read, update, and delete artifacts (content items).
- **Social Features**:
  - **Likes**: Like and unlike artifacts.
  - **Comments**: Add comments to artifacts.
- **Real-time Chat**: WebSocket-based chat functionality using Socket.io.
- **File Uploads**: Image and file upload support using Multer and Cloudinary.
- **Webhooks**: Webhook integration for external event handling.
- **Security**:
  - Rate limiting to prevent abuse.
  - Secure HTTP headers.
  - Data sanitization.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Real-time Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Scheduling**: node-cron

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cms-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cms-db
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=30d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the Server

- **Development Mode:**
  ```bash
  npm run dev
  ```
  *(Note: You might need to add a dev script to `package.json` like `"dev": "nodemon server.js"` if not present)*

- **Production Mode:**
  ```bash
  npm start
  ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/signup/initiate` - Initiate signup (sends OTP)
- `POST /auth/signup/verify` - Verify OTP and complete registration
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Artifacts (Content)
- `GET /artifacts` - Get all artifacts (Admin only, Rate limited)
- `POST /artifacts` - Create a new artifact (Requires authentication and file upload)

### Social
- `POST /likes/:artifactId` - Like/Unlike an artifact
- `POST /comments/:id/comments` - Add a comment to an artifact
- `GET /comments/:id/comments` - Get comments for an artifact

### Chat
- `GET /chat/history` - Get chat history
- Real-time messaging via Socket.io events.

## Project Structure

```
cms-backend/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middlewares/    # Custom middlewares (auth, rate limiting)
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic services
├── sockets/        # Socket.io handlers
├── utils/          # Utility functions
├── webhook/        # Webhook handlers
├── app.js          # Express app setup
└── server.js       # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


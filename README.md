# ApniSec - Cybersecurity Management Platform

ApniSec is a modern, full-stack web application designed for cybersecurity management. It features a secure authentication system, issue tracking, and a responsive dashboard, built with a strict Object-Oriented Programming (OOP) backend architecture.

## 🚀 Tech Stack

- **Frontend**: Next.js 15+ (App Router), React 19+, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB with Mongoose (Singleton Pattern)
- **Authentication**: Custom JWT (JSON Web Token) with `bcryptjs`
- **Email**: Resend API
- **Language**: TypeScript

## ✨ Features

- **Custom Authentication**: Secure Register, Login, and Logout flows with JWT.
- **Issue Management**: Create, Read, Update, and Delete (CRUD) security issues.
- **Issue Filtering**: Filter issues by type (Cloud Security, VAPT, Reteam Assessment).
- **Email Notifications**: Automated welcome emails and issue creation alerts via Resend.
- **Rate Limiting**: Custom rate limiter to prevent abuse (100 req/15min).
- **Responsive Design**: "ApniSec" themed UI with dark mode aesthetics and glassmorphism.
- **OOP Architecture**: Backend logic strictly separated into Handlers, Services, and Repositories.

## 🏗️ Architecture

The backend follows a strict Layered Architecture using OOP principles:

1.  **Handler Layer** (`lib/handlers`): Handles HTTP requests, parses input, and sends responses.
    *   `AuthHandler`, `UserHandler`, `IssueHandler`
2.  **Service Layer** (`lib/services`): Contains business logic and orchestrates data flow.
    *   `AuthService`, `UserService`, `IssueService`, `EmailService`
3.  **Repository Layer** (`lib/repositories`): Manages direct database interactions.
    *   `BaseRepository` (Generic CRUD), `UserRepository`, `IssueRepository`
4.  **Database**: Singleton `Database` class ensures a single connection instance.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Database URI
- Resend API Key

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/apnisec.git
    cd apnisec
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secure_random_secret
    RESEND_API_KEY=your_resend_api_key
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
    *Note: If you encounter Windows permission errors with Turbopack, use `npm run dev` (configured to use Webpack).*

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user & get token | No |
| `GET` | `/api/auth/me` | Get current user details | Yes |
| `GET` | `/api/issues` | Get all issues (supports `?type=`) | Yes |
| `POST` | `/api/issues` | Create a new issue | Yes |
| `GET` | `/api/issues/:id` | Get specific issue | Yes |
| `PUT` | `/api/issues/:id` | Update an issue | Yes |
| `DELETE` | `/api/issues/:id` | Delete an issue | Yes |
| `PUT` | `/api/users/profile` | Update user profile | Yes |

## 🔒 Security

- **Password Hashing**: Passwords are hashed using `bcryptjs` before storage.
- **Rate Limiting**: API routes are protected against brute-force attacks.
- **Protected Routes**: Middleware verifies JWT tokens for sensitive endpoints.

## 📄 License

This project is licensed under the MIT License.
# ApniSec

# Proofly

Proofly is a modern video-based verification platform that allows users to securely record, upload, and manage video proofs. Built with a robust full-stack architecture, it leverages cutting-edge technologies to provide a seamless and secure experience.

## 🚀 Features

- **Video Recording**: High-quality video capture directly from the browser using `react-webcam`.
- **Secure Storage**: Integrated with **AWS S3** for reliable and scalable video storage.
- **Optimized Streaming**: Powered by **Mux** for professional video processing and adaptive bitrate streaming.
- **Authentication**: Secure user authentication using **JWT** and **Bcrypt**.
- **Responsive UI**: A beautiful, responsive interface built with **React**, **Tailwind CSS v4**, and **Framer Motion** for smooth animations.
- **State Management**: Robust state handling using **Redux Toolkit**.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4, Framer Motion
- **State Management**: Redux Toolkit
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express with TypeScript
- **Database**: MongoDB (Mongoose)
- **Cloud Services**: AWS S3, Mux
- **Auth**: JSON Web Tokens (JWT)

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance
- AWS Account (S3 Bucket)
- Mux Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/proofly.git
   cd proofly
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_bucket_name
   MUX_TOKEN_ID=your_mux_id
   MUX_TOKEN_SECRET=your_mux_secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Project

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📂 Project Structure

```text
proofly/
├── frontend/             # React application
│   ├── src/
│   │   ├── Components/   # UI Components
│   │   ├── redux/        # State Management
│   │   └── services/     # API services
├── backend/              # Express API
│   ├── src/
│   │   ├── Controllers/  # Logic handlers
│   │   ├── Models/       # Database schemas
│   │   ├── Routes/       # API endpoints
│   │   └── Services/     # Third-party integrations (S3, Mux)
```

## 📜 License

This project is licensed under the ISC License.

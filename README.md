# JeevanDhaara - Blood Donation Platform

JeevanDhaara is a comprehensive blood donation management platform designed to bridge the gap between blood donors and hospitals. It facilitates real-time communication, efficient blood camp management, and streamlined blood request processing.

## 🚀 Features

### For Donors
-   **Dashboard**: View upcoming blood donation camps via an auto-sliding banner.
-   **Blood Requests**: Browse and respond to urgent blood requests from hospitals.
-   **Profile Management**: Manage personal details and blood type.
-   **Notifications**: Receive alerts for new camps and urgent requests.

### For Hospitals
-   **Dashboard**: Manage blood inventory, view pending requests, and track statistics.
-   **Camp Management**: Schedule, view, and **delete** blood donation camps.
-   **Blood Requests**: Create and manage blood requests for patients.
-   **Donor Management**: View registered donors and their history.

### For Admins
-   **User Management**: Oversee all donor and hospital accounts.
-   **System Oversight**: Monitor platform activity and ensure data integrity.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [Next.js 16](https://nextjs.org/) (React)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens) & Bcrypt

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+ recommended)
-   MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/SahasransuAcharjya/bloodbank.git
cd bloodbank/jeevandhaara
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/jeevandhaara
JWT_SECRET=your_super_secret_key
```

Start the backend server:
```bash
npm run dev
# Runs on http://localhost:4000
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
# Runs on http://localhost:3000
```

## 🔌 API Endpoints (Overview)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| **Camps** | | | |
| GET | `/api/camps` | Get all active camps | Public |
| POST | `/api/camps` | Create a new camp | Hospital/Admin |
| DELETE | `/api/camps/:id` | Delete a camp | Hospital/Admin |
| **Requests** | | | |
| GET | `/api/requests` | Get blood requests | Public |
| POST | `/api/requests` | Create blood request | Hospital |

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is licensed under the MIT License.

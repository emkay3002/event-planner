# Event Planner & Reminder System

## 📌 Project Overview
This is a **Node.js-based Event Planner & Reminder System** that allows users to:
- Register and log in using JWT authentication.
- Create, categorize, and manage events.
- Set reminders for upcoming events.
- Receive email notifications for reminders.
- View upcoming events sorted by date, category, or reminder status.
- Utilize GitHub Actions for automated testing.

## 🚀 Features
- **User Authentication:** Secure JWT-based authentication.
- **Event Management:** Create and manage events with categories.
- **Reminder System:** Automated reminders with email notifications.
- **Event Viewing:** Sort and filter events by different criteria.
- **Automated Testing:** Jest & Supertest integrated with GitHub Actions.

---

## 🛠️ Installation & Setup
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/event-planner.git
cd event-planner
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```
MONGO_URI=mongodb://localhost:27017/event_planner
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
PORT=5000
```
For **testing**, create a `.env.test` file:
```
TEST_MONGO_URI=mongodb://localhost:27017/testdb
JWT_SECRET=testsecret
EMAIL_USER=test@example.com
EMAIL_PASS=testpassword
PORT=5001
NODE_ENV=test
```

### 4️⃣ **Start the Server**
```sh
npm start
```

### 5️⃣ **Run Tests**
```sh
npm test
```

---

## 📌 API Endpoints

### **User Authentication**
| Method | Endpoint          | Description         |
|--------|------------------|---------------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Log in an existing user |

### **Event Management**
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| POST   | `/api/events`  | Create a new event |
| GET    | `/api/events`  | Get all user events |
| GET    | `/api/events?sortBy=date` | Sort events by date |
| GET    | `/api/events?category=Meetings` | Filter events by category |
| GET    | `/api/events?reminderStatus=true` | Filter events with reminders |

---

## 🛠️ **Tech Stack**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Task Scheduling:** Node-cron
- **Email Notifications:** Nodemailer
- **Testing:** Jest, Supertest
- **CI/CD:** GitHub Actions

---

## 🚀 **Automated Testing with GitHub Actions**
### 📌 **GitHub Actions Workflow**
- Runs tests automatically on **every push**.
- Uses MongoDB service for integration tests.

### **Workflow Configuration (`.github/workflows/test.yml`)**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:4.4
        ports:
          - 27017:27017
    env:
      TEST_MONGO_URI: mongodb://localhost:27017/testdb
      JWT_SECRET: testsecret
      EMAIL_USER: test@example.com
      EMAIL_PASS: testpassword
      PORT: 5001
      NODE_ENV: test
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: npm install
      - name: Run Tests
        run: npm test
```
✅ **Ensures tests are always run before merging code.**

---

## 🤝 Contributing
1. **Fork the repository**
2. **Create a new branch**
   ```sh
   git checkout -b feature-new-feature
   ```
3. **Commit your changes**
   ```sh
   git commit -m "Added a new feature"
   ```
4. **Push to GitHub**
   ```sh
   git push origin feature-new-feature
   ```
5. **Open a pull request** 🚀

---

## ⚡ Future Enhancements
- Add **frontend UI** for managing events.
- Implement **real-time notifications**.
- Allow **event invitations** and **collaborations**.





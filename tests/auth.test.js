const request = require("supertest");
const app = require("../server"); // Import the Express app
const mongoose = require("mongoose");
const User = require("../models/User"); // Import User model

describe("User Authentication", () => {
  let userToken;

  beforeEach(async () => {
    // Delete the test user before each test run to prevent conflicts
    await User.deleteOne({ email: "testuser@example.com" });
  });

  it("Should register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });

  it("Should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Ensures database connection is closed
  });
});

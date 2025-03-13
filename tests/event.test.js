const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
jest.setTimeout(10000); // Increase timeout to 10 seconds

describe("Event Management", () => {
  let userToken;
  let eventId;

  beforeAll(async () => {
    // Sign up and log in a test user
    const res = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userToken = res.body.token;
  });

  it("Should create a new event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Test Event",
        description: "This is a test event.",
        date: "2025-03-20",
        time: "10:00",
        category: "Meetings",
        reminder: true,
        reminderTime: "2025-03-20T09:30:00Z",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    eventId = res.body._id;
  });

  it("Should fetch all events for the user", async () => {
    const res = await request(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Ensures database connection is closed
  });
});

const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411.cert"),
  key: fs.readFileSync("/data/ist411.key"),
  rejectUnauthorized: false, // Set to true in production
});

const port = 3004;
const baseUrl = `https://ist411.up.ist.psu.edu:${port}`;

describe("User CRUD API", () => {
  const deleteUrl = `${baseUrl}/delete-user`;
  const readUrl = `${baseUrl}/read-user`;
  const createdUserId = process.env.CREATED_USER_ID;
  console.log(createdUserId);
  it("should delete the created user", async () => {
    try {
      const response = await axios.delete(`${deleteUrl}/${createdUserId}`, {
        httpsAgent: agent,
      });

      expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
      // Verify user is deleted
      try {
        await axios.get(`${readUrl}/${createdUserId}`, { httpsAgent: agent });
        fail("User should have been deleted");
      } catch (error) {
        expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing user
      }
    } catch (error) {
      fail(error);
    }
  });
});

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
  const updateUrl = `${baseUrl}/update-user`;
  const createdUserId = process.env.CREATED_USER_ID;
  it("should update the created user", async () => {
    try {
      const response = await axios.patch(
        `${updateUrl}/${createdUserId}`,
        {
          name: "Jane Doe",
          age: 25,
        },
        { httpsAgent: agent }
      );

      expect(response.status).toBe(200);
      expect(response.data).toEqual(
        jasmine.objectContaining({
          _id: createdUserId,
          name: "Jane Doe",
          age: 25,
        })
      );
    } catch (error) {
      fail(error);
    }
  });
});

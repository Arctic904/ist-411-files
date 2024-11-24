const axios = require("axios");
const https = require("https");
const fs = require("fs");
const { response } = require("express");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2024.cert"),
  key: fs.readFileSync("/data/ist411-2024.key"),
  rejectUnauthorized: false, // set to true in prod
});

const port = 3004;
const baseUrl = `https://ist411.up.ist.psu.edu:${port}`;

describe("User CRUD API", () => {
  const readUrl = `${baseUrl}/read-user`;
  const createdUserId = process.env.CREATED_USER_ID;
  console.log(createdUserId);

  it("Should read the created user", async () => {
    try {
      const res = await axios.get(`${readUrl}/${createdUserId}`, {
        httpsAgent: agent,
      });

      expect(res.status).toBe(200);
      expect(res.data).toEqual(
        jasmine.objectContaining({
          _id: createdUserId,
          name: `John Doe`,
          age: 30,
        })
      );
    } catch (err) {
      fail(err);
    }
  });
});

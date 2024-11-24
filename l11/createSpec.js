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
  const createUrl = `${baseUrl}/create-user`;
  let createdUserId;

  it("Should create a new user", async () => {
    try {
      const res = await axios.post(
        createUrl,
        {
          name: `John Doe`,
          age: 30,
        },
        { httpsAgent: agent }
      );

      expect(res.status).toBe(201);
      expect(res.data).toEqual(
        jasmine.objectContaining({
          name: `John Doe`,
          age: 30,
        })
      );
      createdUserId = res.data._id;
      console.log("Created User: ", res.data);
      console.log("Created User Id: ", createdUserId);
    } catch (err) {
      fail(err);
    }
  });
});

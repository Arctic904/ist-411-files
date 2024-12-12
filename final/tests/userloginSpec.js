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

let createdUserId;

describe("User Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-user`;

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

describe("User Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-user`;
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

describe("User Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-user`;
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

describe("User Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-user`;
    const readUrl = `${baseUrl}/read-user`;
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

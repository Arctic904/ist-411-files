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

let createdLoginId;
let createdObject = {
    username: "testuser",
    password: "securepassword"
}

describe("Login Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-login`;

    it("Should create a new login", async () => {
        try {
            const res = await axios.post(
                createUrl,
                createdObject,
                { httpsAgent: agent }
            );

            expect(res.status).toBe(201);
            expect(res.data).toEqual(
                jasmine.objectContaining(createdObject.username)
            );
            createdLoginId = res.data._id;
            createdObject._id = createdLoginId;
            console.log("Created Login: ", res.data);
            console.log("Created Login Id: ", createdLoginId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Login CRUD API", () => {
    const createUrl = `${baseUrl}/login`;

    it("Should login a user", async () => {
        try {
            createdObject._id = null
            const res = await axios.post(
                createUrl,
                createdObject,
                { httpsAgent: agent }
            );

            expect(res.status).toBe(201);
            expect(res.data).toEqual(
                jasmine.objectContaining(createdObject)
            );
        } catch (err) {
            fail(err);
        }
    });
});

describe("Login Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-login`;
    console.log(createdLoginId);

    it("Should read the created login", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdLoginId}`, {
                httpsAgent: agent,
            });

            expect(res.status).toBe(200);
            expect(res.data).toEqual(
                jasmine.objectContaining(createdObject)
            );
        } catch (err) {
            fail(err);
        }
    });
});

describe("Login Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-login`;
    createdObject.password = `createdpassword1`
    it("should update the created login", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdLoginId}`,
                createdObject,
                { httpsAgent: agent }
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(
                jasmine.objectContaining(createdObject)
            );
        } catch (error) {
            fail(error);
        }
    });
});

describe("Login Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-login`;
    const readUrl = `${baseUrl}/read-login`;
    console.log(createdLoginId);
    it("should delete the created login", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdLoginId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify login is deleted
            try {
                const res = await axios.get(`${readUrl}/${createdLoginId}`, { httpsAgent: agent });
                console.log(`Got info ${JSON.stringify(res.status)}`)
                fail("Login should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing login
            }
        } catch (error) {
            fail(error);
        }
    });
});

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

let createdReturnId;
let createdObject = {
    productId: `12345`,
    user: `idaklsdfo129375`,
    date: `12/12/12`,
    reason: `Broken`,
}

describe("Return Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-return`;

    it("Should create a new return", async () => {
        try {
            const res = await axios.post(
                createUrl,
                createdObject,
                { httpsAgent: agent }
            );

            expect(res.status).toBe(201);
            expect(res.data).toEqual(
                jasmine.objectContaining(createdObject)
            );
            createdReturnId = res.data._id;
            createdObject._id = createdReturnId;
            console.log("Created Return: ", res.data);
            console.log("Created Return Id: ", createdReturnId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Return Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-return`;
    console.log(createdReturnId);

    it("Should read the created return", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdReturnId}`, {
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

describe("Return Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-return`;
    createdObject.reason = `Wrong Item`
    it("should update the created return", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdReturnId}`,
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

describe("Return Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-return`;
    const readUrl = `${baseUrl}/read-return`;
    console.log(createdReturnId);
    it("should delete the created return", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdReturnId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify return is deleted
            try {
                await axios.get(`${readUrl}/${createdReturnId}`, { httpsAgent: agent });
                fail("Return should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing return
            }
        } catch (error) {
            fail(error);
        }
    });
});

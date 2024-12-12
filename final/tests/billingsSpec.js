const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
    cert: fs.readFileSync("/data/ist411.cert"),
    key: fs.readFileSync("/data/ist411.key"),
    rejectUnauthorized: false, // Set to true in billion
});

const port = 3004;
const baseUrl = `https://ist411.up.ist.psu.edu:${port}`;

let createdBillId;
let createdObject = {
    price: 12.50,
    quantity: 2,
    userId: `12385jasd8f2`,
    address: `12345 test st. sc pa 16803`,
}

describe("Bill Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-bill`;

    it("Should create a new bill", async () => {
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
            createdBillId = res.data._id;
            createdObject._id = createdBillId;
            console.log("Created Bill: ", res.data);
            console.log("Created Bill Id: ", createdBillId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Bill Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-bill`;
    console.log(createdBillId);

    it("Should read the created bill", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdBillId}`, {
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

describe("Bill Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-bill`;
    createdObject.price = 23.14
    it("should update the created bill", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdBillId}`,
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

describe("Bill Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-bill`;
    const readUrl = `${baseUrl}/read-bill`;
    console.log(createdBillId);
    it("should delete the created bill", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdBillId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify bill is deleted
            try {
                await axios.get(`${readUrl}/${createdBillId}`, { httpsAgent: agent });
                fail("Bill should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing bill
            }
        } catch (error) {
            fail(error);
        }
    });
});

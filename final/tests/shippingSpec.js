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

let createdShippingId;
let createdObject = {
    address: `1234 test st. sc pa 16803`,
    user: `idaklsdfo129375`,
    date: `12/12/12`,
}

describe("Shipping Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-order`;

    it("Should create a new order", async () => {
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
            createdShippingId = res.data._id;
            createdObject._id = createdShippingId;
            console.log("Created Shipping: ", res.data);
            console.log("Created Shipping Id: ", createdShippingId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Shipping Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-order`;
    console.log(createdShippingId);

    it("Should read the created order", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdShippingId}`, {
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

describe("Shipping Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-order`;
    createdObject.date = `12/13/12`
    it("should update the created order", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdShippingId}`,
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

describe("Shipping Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-order`;
    const readUrl = `${baseUrl}/read-order`;
    console.log(createdShippingId);
    it("should delete the created order", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdShippingId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify order is deleted
            try {
                const res = await axios.get(`${readUrl}/${createdShippingId}`, { httpsAgent: agent });
                console.log(`Got info ${JSON.stringify(res.status)}`)
                fail("Shipping should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing order
            }
        } catch (error) {
            fail(error);
        }
    });
});

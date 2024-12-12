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

let createdProductId;
let createdObject = {
    name: `Shoes`,
    description: `They Fit`,
}

describe("Product Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-product`;

    it("Should create a new product", async () => {
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
            createdProductId = res.data._id;
            createdObject._id = createdProductId;
            console.log("Created Product: ", res.data);
            console.log("Created Product Id: ", createdProductId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Product Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-product`;
    console.log(createdProductId);

    it("Should read the created product", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdProductId}`, {
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

describe("Product Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-product`;
    createdObject.description = `They do not fit`
    it("should update the created product", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdProductId}`,
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

describe("Product Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-product`;
    const readUrl = `${baseUrl}/read-product`;
    console.log(createdProductId);
    it("should delete the created product", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdProductId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify product is deleted
            try {
                await axios.get(`${readUrl}/${createdProductId}`, { httpsAgent: agent });
                fail("Product should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing product
            }
        } catch (error) {
            fail(error);
        }
    });
});

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

let createdCartId;
let createdObject = {
    productId: `12345`,
    quantity: 5,
    userId: `idaklsdfo129375`
}

describe("Cart Create CRUD API", () => {
    const createUrl = `${baseUrl}/create-cart`;

    it("Should create a new cart", async () => {
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
            createdCartId = res.data._id;
            createdObject._id = createdCartId;
            console.log("Created Cart: ", res.data);
            console.log("Created Cart Id: ", createdCartId);
        } catch (err) {
            fail(err);
        }
    });
});

describe("Cart Read CRUD API", () => {
    const readUrl = `${baseUrl}/read-cart`;
    console.log(createdCartId);

    it("Should read the created cart", async () => {
        try {
            const res = await axios.get(`${readUrl}/${createdCartId}`, {
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

describe("Cart Update CRUD API", () => {
    const updateUrl = `${baseUrl}/update-cart`;
    createdObject.quantity = 10
    it("should update the created cart", async () => {
        try {
            const response = await axios.patch(
                `${updateUrl}/${createdCartId}`,
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

describe("Cart Delete CRUD API", () => {
    const deleteUrl = `${baseUrl}/delete-cart`;
    const readUrl = `${baseUrl}/read-cart`;
    console.log(createdCartId);
    it("should delete the created cart", async () => {
        try {
            const response = await axios.delete(`${deleteUrl}/${createdCartId}`, {
                httpsAgent: agent,
            });

            expect(response.status).toBe(200); //Assuming 200 no content on successful deletion
            // Verify cart is deleted
            try {
                await axios.get(`${readUrl}/${createdCartId}`, { httpsAgent: agent });
                fail("Cart should have been deleted");
            } catch (error) {
                expect(error.response.status).toBe(404); // Assuming 404 Not Found for non-existing cart
            }
        } catch (error) {
            fail(error);
        }
    });
});

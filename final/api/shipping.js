const { Shipping } = require("./models")

export let createEndpoints = (app) => {
    app.post("/create-order", async (req, res) => {
        try {
            const bodyOrder = new Shipping(req.body);
            await bodyOrder.save();
            return res.status(200).send(bodyOrder)
        } catch (err) {
            res.status(400).send(err)
        }
    })

    app.patch('/update-order/:id', async (req, res) => {
        try {
            const ship = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!ship) {
                return res.status(404).send();
            }
            res.status(200).send(ship);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.delete("/delete-order/:id", async (req, res) => {
        try {
            const ship = Shipping.findByIdAndDelete(req.params.id);
            if (!ship) {
                return res.status(404).send();
            }
            return res.status(200).send()
        } catch (err) {
            res.status(500).send(err)
        }
    })

    app.get("/read-order/:id", async (req, res) => {
        try {
            const ship = await Shipping.findById(req.params.id)
            if (!ship) {
                return res.status(404).send();
            }
            res.status(200).send(ship)
        } catch (err) {
            res.status(400).send(err)
        }
    })
}
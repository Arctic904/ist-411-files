const { Product } = require("./models")

export let createEndpoints = (app) => {
    app.post('/create-product', async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).send(product);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.get('/read-product/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send();
            }
            res.status(200).send(product);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.patch('/update-product/:id', async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!product) {
                return res.status(404).send();
            }
            res.status(200).send(product);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.delete('/delete-product/:id', async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).send();
            }
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    })
}
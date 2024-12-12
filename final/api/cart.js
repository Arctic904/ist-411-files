const { Cart } = require("./models")

module.exports = {
    createEndpoints: (app) => {
        app.post('/create-cart', async (req, res) => {
            try {
                const cart = new Cart(req.body);
                await cart.save();
                res.status(201).send(cart);
            } catch (err) {
                res.status(400).send(err);
            }
        })

        app.get('/read-cart/:id', async (req, res) => {
            try {
                const cart = await Cart.findById(req.params.id);
                if (!cart) {
                    return res.status(404).send();
                }
                res.status(200).send(cart);
            } catch (err) {
                res.status(400).send(err);
            }
        })

        app.patch('/update-cart/:id', async (req, res) => {
            try {
                const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!cart) {
                    return res.status(404).send();
                }
                res.status(200).send(cart);
            } catch (err) {
                res.status(500).send(err);
            }
        })

        app.delete('/delete-cart/:id', async (req, res) => {
            try {
                const cart = await Cart.findByIdAndDelete(req.params.id);
                if (!cart) {
                    return res.status(404).send();
                }
                res.status(200).send();
            } catch (err) {
                res.status(500).send(err);
            }
        })
    }
}
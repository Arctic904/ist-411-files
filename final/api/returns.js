const { Return } = require("./models")

export let createEndpoints = (app) => {
    app.post('/create-return', async (req, res) => {
        try {
            const ret = new Return(req.body);
            await ret.save();
            res.status(201).send(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.get('/read-return/:id', async (req, res) => {
        try {
            const ret = await Return.findById(req.params.id);
            if (!ret) {
                return res.status(404).send();
            }
            res.status(200).send(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.patch('/update-return/:id', async (req, res) => {
        try {
            const ret = await Return.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!ret) {
                return res.status(404).send();
            }
            res.status(200).send(ret);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.delete('/delete-return/:id', async (req, res) => {
        try {
            const ret = await Return.findByIdAndDelete(req.params.id);
            if (!ret) {
                return res.status(404).send();
            }
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    })
}
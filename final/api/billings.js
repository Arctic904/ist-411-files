import { Bill } from "./models";

export let createEndpoints = (app) => {
    app.post('/create-bill', async (req, res) => {
        try {
            const bill = new Bill(req.body);
            await bill.save();
            res.status(201).send(bill);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.get('/read-bill/:id', async (req, res) => {
        try {
            const bill = await Bill.findById(req.params.id);
            if (!bill) {
                return res.status(404).send();
            }
            res.status(200).send(bill);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.patch('/update-bill/:id', async (req, res) => {
        try {
            const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!bill) {
                return res.status(404).send();
            }
            res.status(200).send(bill);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.delete('/delete-bill/:id', async (req, res) => {
        try {
            const bill = await Bill.findByIdAndDelete(req.params.id);
            if (!bill) {
                return res.status(404).send();
            }
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    })
}
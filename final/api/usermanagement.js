export let createUserManageEndpoints = (app) => {
    app.post('/create-user', async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.get('/read-user/:id', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    })

    app.patch('/update-user/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.delete('/delete-user/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    })
}
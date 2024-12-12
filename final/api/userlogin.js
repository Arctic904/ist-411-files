const { UserLogin } = require("./models")
export let createEndpoints = (app) => {
    app.post("/login", async (req, res) => {
        try {
            const bodyUser = new UserLogin(req.body);
            const user = await UserLogin.findOne(bodyUser)
            if (!user) {
                return res.status(404)
            }
            return res.status(200).send(user.username)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    app.post("/register", async (req, res) => {
        try {
            const bodyUser = new UserLogin(req.body);
            const user = await UserLogin.create(bodyUser)
            if (!user) {
                return res.status(403)
            }
            return res.status(200).send(user.username)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    app.get("/user/:id", async (req, res) => {
        try {
            const user = await UserLogin.findById(req.params.id)
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    })
    app.patch("/user/:id", async (req, res) => {
        try {
            const user = await UserLogin.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    })
    app.delete("/user/:id", async (req, res) => {
        try {
            const user = await UserLogin.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    })
}
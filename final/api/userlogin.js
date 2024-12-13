const { UserLogin } = require("./models")

module.exports = {
    createEndpoints: (app) => {
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
        app.post("/create-login", async (req, res) => {
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
        app.get("/read-login/:id", async (req, res) => {
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
        app.patch("/update-login/:id", async (req, res) => {
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
        app.delete("/delete-login/:id", async (req, res) => {
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
}
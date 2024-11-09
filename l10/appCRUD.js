const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://team4:dbteam4_8X9@localhost:27017/team4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

const options = {
    key: fs.readFileSync('/data/ist411-2024.key'),
    cert: fs.readFileSync('/data/ist411-2024.cert')
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

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
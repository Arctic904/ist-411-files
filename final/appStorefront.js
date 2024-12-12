const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const userLogin = require('./api/userlogin');
const userManagement = require('./api/usermanagement');
const shipping = require('./api/shipping');
const returns = require('./api/returns');
const product = require('./api/product');
const cart = require('./api/cart');
const billings = require('./api/billings');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://team4:dbteam4_8X9@localhost:27017/team4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const options = {
    key: fs.readFileSync('/data/ist411-2024.key'),
    cert: fs.readFileSync('/data/ist411-2024.cert')
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

userLogin.createEndpoints(app);
userManagement.createEndpoints(app);
shipping.createEndpoints(app);
returns.createEndpoints(app);
product.createEndpoints(app);
cart.createEndpoints(app);
billings.createEndpoints(app);
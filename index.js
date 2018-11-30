const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const jwt = require('jsonwebtoken');
require('dotenv').load();

const port = process.env.SERVER_PORT;

app.set('jwt', jwt);

app.use(bodyParser.json()); // middleware

app.use('*', (req, resp, next) => {
    resp.setHeader('Access-Control-Allow-Origin', '*')
    if (req.originalUrl == '/auth' || req.originalUrl == '/health') {
        next();
    } else {
        const token = req.headers['x-access-token'] || req.query.access_token;
        if (!token) {
            resp.status(401).end();
        } else {
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    resp.status(401).end();
                } else {
                    req.user = decoded.user;
                    next();
                }
            })
        }
    }
})

consign({ cwd: 'src' })
    .include('controller')
    .then('repository')
    .then('db')
    .into(app);

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.listen(port, () => console.log(`App listening on port ${port}!`));
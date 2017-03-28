const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const unless = require('express-unless');
const bodyParser = require('body-parser');

const PORT = 3033;
const JWT_SECRET = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

const app = express();
const testUser = { email: 'testuser@testmail.fr', password: 'aze123'};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Origin, X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(expressJwt({secret: JWT_SECRET}).unless({path: ['/','/login']}));

app.post('/login', (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    if (user && user.email === req.body.email && user.password === req.body.password) {
        console.log('token will be sent');
        res.json({
            token: jwt.sign({sub: user.email}, JWT_SECRET),
            date: new Date()
        });
    } else {
        console.log('token NOT sent KO');        
        res.sendStatus(401);
    }
});

app.get('/', (req, res) => {
    res.json({ info: 'Je suis à votre écoute' });
});

app.get('/big-secret', (req, res) => {
    res.json({ author: 'Monsieur X', message: 'ultra confidentiel, ne répéter à personne', date: new Date() });
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        console.log('inside error');
        res.status(401).send(err.inner);
    }
});

app.listen(PORT, () => {
  console.info(`app listening on port ${PORT}`);
});
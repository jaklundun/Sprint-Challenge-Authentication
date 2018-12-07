const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwtKey = require('../_secrets/keys').jwtKey;

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

// Helper functions && middleware

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = jwtKey;
  const options = {
    expiresIn: '1m',
  };
   return jwt.sign(payload, secret, options);
}

  function login(req, res) {
    // implement user login
    const creds = req.body;
    if (!creds.username|| !creds.password) {
      res.status(400).json({ error: "You'll need to give up both your userId and Pass, homie." });
      return
  } 
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'Benvenuto!', token });
        } else {
          res.status(401).json({ message: 'Not unauthorized access - Scram!' });
        }
      })
      .catch(err => res.json(err));
  };


function register(req, res) {
  // implement user registration
 const creds = req.body;
 const hash = bcrypt.hashSync(creds.password, 8); 
 creds.password = hash;

 db('users')
   .insert(creds)
   .then(ids => {
     res.status(201).json(ids);
   })
   .catch(err => json(err));
};


function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

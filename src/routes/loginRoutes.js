const express = require('express');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    res.status(200).json({ token });
  }
});

module.exports = router;
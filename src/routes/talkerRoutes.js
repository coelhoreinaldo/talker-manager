const express = require('express');
const readFile = require('../utils/readFile');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkersData = await readFile()
    if (talkersData) {
      return res.status(200).json(talkersData)
    }
    return res.status(200).send([])
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Erro do servidor' })
  }
});

module.exports = router;
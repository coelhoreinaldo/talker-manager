const express = require('express');
const readFile = require('../utils/readFile');
const apiCredentials = require('../middlewares/apiCredentials');
const {
  validateNameAndAge, validateTalkInfo, validateNameAndAgeRequirements,
} = require('../middlewares/validateFields');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkersData = await readFile.getAll();
    if (talkersData) {
      return res.status(200).json(talkersData);
    }
    return res.status(200).send([]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Erro do servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const currTalker = await readFile.getById(id);
  if (currTalker) {
    return res.status(200).json(currTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.use(apiCredentials);
router.use(validateNameAndAge);
router.use(validateTalkInfo);
router.use(validateNameAndAgeRequirements);

// router.post('/talker', async (req, res) => {
//   const { name, age, talk } = req.body;

// })

module.exports = router;
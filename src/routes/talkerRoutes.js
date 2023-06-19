const express = require('express');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const apiCredentials = require('../middlewares/apiCredentials');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkersData = await readFile.getAll();
    if (talkersData) {
      return res.status(200).json(talkersData);
    }
    return res.status(200).json([]);
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
router.use(validateFields.validateNameAndAge);
router.use(validateFields.validateTalkInfo);
router.use(validateFields.validateNameAndAgeRequirements);
router.use(validateFields.validateDate);
router.use(validateFields.validateRate);

router.post('/', async (req, res) => {
  const { body } = req;
  const talkersData = await readFile.getAll();
  const id = talkersData[talkersData.length - 1].id + 1;
  const newPerson = { id, ...body };
  const talkersUpdated = [...talkersData, newPerson];
  await writeFile.createTalker(talkersUpdated);
  return res.status(201).json(newPerson);
});

module.exports = router;
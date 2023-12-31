const express = require('express');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const apiCredentials = require('../middlewares/apiCredentials');
const validateFields = require('../middlewares/validateFields');
const validateParams = require('../middlewares/validateParams');
const verifyId = require('../middlewares/verifyId');
const talkerDB = require('../db/talkerDB');
const formatData = require('../utils/formatData');

const router = express.Router();

router.get('/db', async (_req, res) => {
  const [result] = await talkerDB.findAll();
  const array = formatData([...result]);
  return res.status(200).json(array);
});

router.get('/search',
  apiCredentials,
  validateParams.validateRateParam,
  validateParams.validateDateParam,
  async (req, res) => {
    const { query } = req;
    const talkersData = await readFile.getAll(query.q, query.rate, query.date);
    return res.status(200).json(talkersData);
  });

router.get('/', async (_req, res) => {
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

router.get('/:id', verifyId, async (req, res) => {
  const { id } = req.params;
  const currTalker = await readFile.getById(id);
  return res.status(200).json(currTalker);
});

router.use(apiCredentials);

router.delete('/:id', verifyId, async (req, res) => {
  const { id } = req.params;
  await writeFile.deleteTalker(id);
  return res.sendStatus(204);
});

router.patch('/rate/:id', validateFields.validateRateToBeEdited, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await writeFile.updateRate(id, rate);
  return res.sendStatus(204);
});

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
  const updatedData = [...talkersData, newPerson];
  await writeFile.createTalker(updatedData);
  return res.status(201).json(newPerson);
});

router.put('/:id', verifyId, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedPerson = await writeFile.updateTalker(id, body);
  return res.status(200).json(updatedPerson);
});

module.exports = router;
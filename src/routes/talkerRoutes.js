const express = require('express');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const apiCredentials = require('../middlewares/apiCredentials');
const validateFields = require('../middlewares/validateFields');
const verifyId = require('../middlewares/verifyId');

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
})

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

// router.post('/', validateFields.validateNameAndAge, validateFields.validateTalkInfo, validateFields.validateNameAndAgeRequirements, validateFields.validateDate, validateFields.validateRate, async (req, res) => {
//   const { body } = req;
//   const talkersData = await readFile.getAll();
//   const id = talkersData[talkersData.length - 1].id + 1;
//   const newPerson = { id, ...body };
//   const updatedData = [...talkersData, newPerson];
//   await writeFile.createTalker(updatedData);
//   return res.status(201).json(newPerson);
// });

// router.put('/:id', validateFields.validateNameAndAge, validateFields.validateTalkInfo, validateFields.validateNameAndAgeRequirements, validateFields.validateDate, validateFields.validateRate, verifyId, async (req, res) => {
//   const { id } = req.params;
//   const updatedPerson = await writeFile.updateTalker(id, body);
//   return res.status(200).json(updatedPerson);
// });

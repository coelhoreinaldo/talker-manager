const validateField = (field, res, value) => {
  if (!field) {
    return res.status(400).json({ message: `O campo "${value}" é obrigatório` });
  }
};

const validateNameAndAge = (req, res, next) => {
  const { name, age, talk } = req.body;

  return validateField(name, res, 'name')
    || validateField(age, res, 'age')
    || validateField(talk, res, 'talk')
    || next();
};

const validateTalkInfo = (req, res, next) => {
  const { talk } = req.body;

  return validateField(talk.watchedAt, res, 'watchedAt')
    || validateField(talk.rate, res, 'rate')
    || next();
};

const validateNameAndAgeRequirements = (req, res, next) => {
  const { name, age } = req.body;
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (typeof age !== 'number' || age < 18 || age % 1 !== 0) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

module.exports = {
  validateNameAndAge, validateTalkInfo, validateNameAndAgeRequirements,
};
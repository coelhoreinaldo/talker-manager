const validateField = (field, res, value) => {
  if (field === undefined) {
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

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const isDateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!isDateFormat.test(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5 || talk.rate % 1 !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateRateParam = (req, res, next) => {
  const { query } = req;
  if (query.rate && (query.rate < 1 || query.rate > 5 || query.rate % 1 !== 0)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateDateParam = (req, res, next) => {
  const { date } = req.query;
  const isDateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (date && !isDateFormat.test(date)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  validateNameAndAge,
  validateTalkInfo,
  validateNameAndAgeRequirements,
  validateDate,
  validateRate,
  validateRateParam,
  validateDateParam,
};
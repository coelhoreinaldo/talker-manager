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

module.exports = { validateRateParam, validateDateParam };
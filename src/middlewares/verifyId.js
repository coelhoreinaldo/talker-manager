const readFile = require('../utils/readFile');

const verifyId = async (req, res, next) => {
  const { id } = req.params;
  const currTalker = await readFile.getById(id);
  if (!currTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = verifyId;
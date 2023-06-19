const apiCredentials = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token && token.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = apiCredentials;
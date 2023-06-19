const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json')

const readFile = async () => {
  try {
    const data = await fs.readFile(talkersPath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Arquivo não encontrado.');
  }
};

module.exports = readFile;

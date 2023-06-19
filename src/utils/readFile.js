const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const getAll = async (query) => {
  try {
    const data = JSON.parse(await fs.readFile(talkersPath));
    if (query) {
      return data.filter((person) => person.name.includes(query));
    }
    return data;
  } catch (error) {
    console.error('Arquivo não encontrado.');
  }
};

const getById = async (id) => {
  try {
    const data = JSON.parse(await fs.readFile(talkersPath));
    const currTalker = data.find((talker) => talker.id === +id);
    return currTalker;
  } catch (error) {
    console.error('Arquivo não encontrado.');
  }
};

module.exports = { getAll, getById };

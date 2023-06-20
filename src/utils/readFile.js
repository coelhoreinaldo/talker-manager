const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const getAll = async (query, rate, date) => {
  try {
    const data = JSON.parse(await fs.readFile(talkersPath));
    let filteredData = data;
    if (query) {
      filteredData = filteredData.filter((person) => person.name.includes(query));
    }
    if (rate) {
      filteredData = filteredData.filter(({ talk }) => talk.rate === +rate);
    }
    if (date) {
      filteredData = filteredData.filter(({ talk }) => talk.watchedAt === date);
    }
    return filteredData;
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

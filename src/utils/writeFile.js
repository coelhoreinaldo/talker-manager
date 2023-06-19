const fs = require('fs').promises;
const path = require('path');
const readFile = require('./readFile');

const talkersPath = path.resolve(__dirname, '../talker.json');

const createTalker = async (content) => {
  try {
    await fs.writeFile(talkersPath, JSON.stringify(content));
  } catch (e) {
    console.error('Erro ao salvar o arquivo', e.message);
    return null;
  }
};

const updateTalker = async (id, newData) => {
  const talkersData = await readFile.getAll();
  const updatedData = talkersData.map((person) => {
    if (person.id === +id) {
      return { ...person, ...newData };
    }
    return person;
  });
  await createTalker(updatedData);
  const updatedPerson = updatedData.find((e) => e.id === +id);
  return updatedPerson;
};

module.exports = { createTalker, updateTalker };
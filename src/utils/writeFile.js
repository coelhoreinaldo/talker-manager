const fs = require('fs').promises;
const path = require('path');
const readFile = require('./readFile');

const talkersPath = path.resolve(__dirname, '../talker.json');

const createTalker = async (content) => {
  try {
    await fs.writeFile(talkersPath, JSON.stringify(content, null, 2));
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

const deleteTalker = async (id) => {
  const talkersData = await readFile.getAll();
  const newData = talkersData.filter((person) => person.id !== +id);
  await createTalker(newData);
};

const updateRate = async (id, newRate) => {
  const talkersData = await readFile.getAll();
  const personToBeUpdated = talkersData.find((person) => person.id === +id);
  talkersData[talkersData.indexOf(personToBeUpdated)].talk.rate = +newRate;
  personToBeUpdated.talk.rate = Number(newRate);
  await createTalker(talkersData);
};

module.exports = { createTalker, updateTalker, deleteTalker, updateRate };
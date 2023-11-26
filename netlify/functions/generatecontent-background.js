// functions/generatecontent-background.js
// eslint-disable-next-line import/no-import-module-exports, import/named

const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');
const { save } = require('./services/firestore');

const { generateArticle } = require('./services/completions');

function getJSONFromFile(filePath) { // eslint-disable-line no-unused-vars
  const json = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(json);
}

function getAGrade() {
  const grades = ['6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade', 'college'];
  return grades[Math.floor(Math.random() * grades.length)];
}

function normalRandom(mean, stdDev) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * stdDev + mean; // Translate to desired mean and standard deviation

  num = Math.max(num, 0); // In case of negative values
  return num;
}

function getALength(assignedWords) {
  let finalWordCount;
  do {
    const revisionFactor = normalRandom(1.1, 0.07);
    finalWordCount = (assignedWords * revisionFactor);

    finalWordCount = Math.round(finalWordCount);
  } while (finalWordCount < assignedWords * 0.7 || finalWordCount > assignedWords * 1.5);
  return finalWordCount;
}

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

// eslint-disable-next-line func-names
exports.handler = async function (request) {
  const body = JSON.parse(request.body);
  // const topic = body.topic || 'Synthetic fabrics used in sports';
  const json = getJSONFromFile(path.resolve(__dirname, './data/config/lists/fibers.json'));
  // const topics = ['Radiohead']; // json.dyes.map((dye) => dye.name);
  const topics = json.fibers.map((dye) => dye.name);
  topics.forEach(async (topic) => {
    const start = performance.now();
    const grade = body.grade || getAGrade();
    const len = body.len || getALength(500);
    const response = await generateArticle(topic, grade, len);
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
    const executionTime = `${executionTimeToSeconds(end - start)} seconds`;
    await save('fibers', { ...response, executionTime });
  });
  console.log('Done.');
  return {
    statusCode: 200,
    body: 'Done.',
  };
};

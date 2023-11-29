const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');
const { save } = require('./services/firestore');
const generateImage = require('./generate-image');
const generateJson = require('./generate-json');

const { generateArticle } = require('./services/completions');

function getJSONFromFile(filePath) {
  const json = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(json);
}

function getAGrade() {
  const grades = ['6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade', 'college'];
  return grades[Math.floor(Math.random() * grades.length)];
}

function normalRandom(mean, stdDev) {
  // warning: can return unusable negative numbers
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * stdDev + mean; // Translate to desired mean and standard deviation

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
exports.handler = async function () {
  // const topic = body.topic || 'Synthetic fabrics used in sports';
  const json = getJSONFromFile(path.resolve(__dirname, './data/config/lists/dyes.json'));
  // skip first member of array
  const topics = json.dyes.slice(1);
  // only use first two topics for now
  topics.length = 5;

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const start = performance.now();
    const grade = getAGrade();
    const len = getALength(500);
    console.log(`Generating article for ${JSON.stringify(topic.name, null, 2)}...`);
    // eslint-disable-next-line no-await-in-loop
    const response = await generateArticle(`${`${topic.name}`}`, grade, len, topic.color);
    const end = performance.now();
    const executionTime = `${executionTimeToSeconds(end - start)} seconds`;
    console.log(`Execution time: ${executionTime}`);

    // eslint-disable-next-line no-await-in-loop
    const imageName = await generateImage.handler(`${topic.name} natural dye`, topic.name);

    JSON.stringify({ ...response, executionTime, image: imageName }, null, 2);

    // eslint-disable-next-line no-await-in-loop
    await save('dyes', { ...response, image: imageName });
  }

  await generateJson.handler();

  console.log('Done.');

  return {
    statusCode: 200,
    body: 'Done.',
  };
};

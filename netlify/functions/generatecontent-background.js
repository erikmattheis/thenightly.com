const { performance } = require('perf_hooks');
const { sanitizeId } = require('./services/utility');
const { saveArticle } = require('./services/firestore');
const { generateGraphics } = require('./services/openai-images');
const generateJson = require('./generate-json');
const { dyes } = require('./data/dyes');

// const dyes = JSON.parse(dyesJson);

const { generateArticle } = require('./services/openai-completions');

function getAGrade() {
  const grades = ['6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade', 'college', 'graduate school', 'doctorate', 'post-doctorate', 'professor'];
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
    const revisionFactor = normalRandom(1.1, 0.08);
    finalWordCount = (assignedWords * revisionFactor);

    finalWordCount = Math.round(finalWordCount);
  } while (finalWordCount < assignedWords * 0.7 || finalWordCount > assignedWords * 1.5);
  // add plus or minus 20
  finalWordCount += Math.floor(Math.random() * 40) - 20;
  return finalWordCount;
}

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

function addDateSuffix(str) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${str}-${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

// eslint-disable-next-line func-names
exports.handler = async function () {
  try {
    const batch = 'w2'; // batchStr || 'w1';
    // const x = 0;
    // skip first x of array
    const topics = dyes.slice();
    // only use first few topics for now
    topics.length = 10;

    const colorThemes = [{ name: 'Indochine and complimentary', colors: ['#CF6B00', '#4F3C28'] }, { name: 'Indochine', colors: ['#CF6B00'] }, { name: 'Razzmatazz and complementary', colors: ['#D10067', '#52293D'] }, { name: 'Razzmatazz', colors: ['#D10067'] }];

    // eslint-disable-next-line no-restricted-syntax
    for (const topic of topics) {
      const start = performance.now();

      const name = addDateSuffix(topic.name.toLowerCase());

      const id = sanitizeId(`${batch}-${name}`);

      const colorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

      console.log(`Generating article for ${topic.name}...`);

      const colorThemeDescription = colorTheme.colors.length > 1 ? `${colorTheme.colors[0]} and ${colorTheme.colors[1]}` : colorTheme.colors[0]; // eslint-disable-line max-len

      // eslint-disable-next-line no-await-in-loop
      const image = await generateGraphics(topic, colorThemeDescription, id);
      console.log('image', JSON.stringify(image, null, 2));

      const temperature = Math.random() + 0.3;

      const grade = getAGrade();
      const len = getALength(500);

      // eslint-disable-next-line no-await-in-loop
      const response = await generateArticle(topic.name, grade, len, topic.color, colorTheme, temperature);
      const end = performance.now();
      const executionTime = `${executionTimeToSeconds(end - start)} seconds`;

      console.log(`Execution time: ${executionTime}`);
      // const image = 'none';
      // JSON.stringify({ ...response, executionTime, topic: topic.name }, null, 2);
      const doc = {
        ...response, image, executionTime, topic: topic.name, batch,
      };
      console.log('doc', JSON.stringify(doc, null, 2));
      // eslint-disable-next-line no-await-in-loop
      const r = await saveArticle('dyes', doc, id);
      console.log('return is', JSON.stringify(r, null, 2));
    }
  } catch {
    console.log('error');
  }

  // await generateJson.handler();

  console.log('Done.');

  return {
    statusCode: 200,
    body: 'Done.',
  };
};

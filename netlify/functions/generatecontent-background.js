const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');
const { saveArticle } = require('./services/firestore');
const generateImage = require('./generate-image');
const generateJson = require('./generate-json');

const { generateArticle } = require('./services/completions');

function getJSONFromFile(filePath) {
  const json = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(json);
}

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
    const revisionFactor = normalRandom(1.1, 0.07);
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

// eslint-disable-next-line func-names
exports.handler = async function () {
  // const topic = body.topic || 'Synthetic fabrics used in sports';
  const json = getJSONFromFile(path.resolve(__dirname, './data/config/lists/dyes.json'));

  const x = 0;
  // skip first x of array
  const topics = json.dyes.slice(x);
  // only use first few topics for now
  topics.length = 3;

  const colorThemes = [{ name: 'Indochine and complimentary', colors: ['#CF6B00', '#4F3C28'] }, { name: 'Indochine', colors: ['#CF6B00'] }, { name: 'Razzmatazz and complementary', colors: ['#D10067', '#52293D'] }, { name: 'Razzmatazz', colors: ['#D10067'] }];

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const start = performance.now();
    const grade = getAGrade();
    const len = getALength(500);
    const colorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
    const colorThemeDescription = `${colorTheme.colors.join(', ')}and mostly ${topic.color}`;

    console.log(`Generating article for ${JSON.stringify(topic.name, null, 2)}...`);
    const imagePrompt = `${topic.name} natural dye featured {#topic.color} and ${colorThemeDescription} still-life.`;

    const imageModel = Math.random() > 0.5 ? 'dall-e-2' : 'dall-e-3';

    const imageSize = '512x512';

    const n = 1;

    // eslint-disable-next-line no-await-in-loop
    const imageUrl = await generateImage.handler(imagePrompt, topic.name, imageModel, n, imageSize);

    const imageInformation = {
      imageUrl,
      colorTheme,
      imagePrompt,
      imageModel,
      imageSize,
    };

    const temperature = Math.random() + 0.7;

    // eslint-disable-next-line no-await-in-loop
    const response = await generateArticle(`${`${topic.name}`}`, grade, len, topic.color, colorTheme, temperature);
    const end = performance.now();
    const executionTime = `${executionTimeToSeconds(end - start)} seconds`;
    console.log(`Execution time: ${executionTime}`);

    // JSON.stringify({ ...response, executionTime, topic: topic.name }, null, 2);

    // eslint-disable-next-line no-await-in-loop
    await saveArticle('dyes', { ...response, image: imageInformation });
  }

  await generateJson.handler();

  console.log('Done.');

  return {
    statusCode: 200,
    body: 'Done.',
  };
};

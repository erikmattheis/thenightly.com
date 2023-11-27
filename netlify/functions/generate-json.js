// functions/generatecontent-background.js
// eslint-disable-next-line import/no-import-module-exports, import/named

const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');
const { getArticles } = require('./services/firestore');

function getJSONFromFile(filePath) { // eslint-disable-line no-unused-vars
  const json = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(json);
}

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

// eslint-disable-next-line func-names
exports.handler = async function () {
  console.log('Generating JSON...');
  const t0 = performance.now();
  // const topic = body.topic || 'Synthetic fabrics used in sports';
  const subjects = [
    'dyes',
  ];
  function replaceWhiteSpaceWithDash(name) {
    return name.replace(/\s*/g, '-');
  }
  subjects.forEach(async (subject) => {
    const topics = await getArticles(subject);
    console.log('topics', topics.length);
    const fileName = replaceWhiteSpaceWithDash(subject);
    fs.writeFileSync(path.join(__dirname, `../../src/data/${fileName}.json`), JSON.stringify(topics, null, 2));
  });

  const t1 = performance.now();
  const executionTime = executionTimeToSeconds(t1 - t0);
  console.log(`Done in ${executionTime} seconds.`);
  return {
    statusCode: 200,
    body: 'Done.',
  };
};

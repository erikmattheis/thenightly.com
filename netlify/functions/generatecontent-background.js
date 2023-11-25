// functions/generatecontent-background.js
// eslint-disable-next-line import/no-import-module-exports, import/named

const { performance } = require('perf_hooks');
const { save } = require('./services/firestore');

const { generateArticle } = require('./services/completions');

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

// eslint-disable-next-line func-names
exports.handler = async function (request) {
  const body = JSON.parse(request.body);
  const topic = body.topic || 'Synthetic fabrics used in sports';
  const grade = body.grade || 10;
  const len = body.len || 180;
  const start = performance.now();
  const response = await generateArticle(topic, grade, len);
  const end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
  const executionTime = `${executionTimeToSeconds(end - start)} seconds`;
  await save('dyes', { ...response, executionTime });

  return {
    statusCode: 200,
    body: response,
  };
};

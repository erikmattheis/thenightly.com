// functions/generatecontent-background.js
// eslint-disable-next-line import/no-import-module-exports, import/named
const fs = require('fs');
const sanitize = require('sanitize-filename');

const { generateArticle } = require('./services/completions');

exports.handler = async function myHandler(event) {
  const prompt = event.queryStringParameters.prompt || 'Synthetic fabrics used in sports';
  const grade = event.queryStringParameters.grade || 8;
  const len = event.queryStringParameters.len || 180;
  const response = await generateArticle(prompt, grade, len);

  const safeFilename = sanitize(prompt);
  fs.writeFileSync(`${safeFilename}.json`, JSON.stringify(response, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

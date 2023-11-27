const generateJson = require('./netlify/functions/generate-json');

async function run() {
  await generateJson.handler();
}

run();

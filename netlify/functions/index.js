const generateJson = require('./generate-json');

async function run() {
  await generateJson.handler();
}

run();

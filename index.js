const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const generateJson = require('./netlify/functions/generatecontent-background');

async function run() {
  await generateJson.handler();
}

run();

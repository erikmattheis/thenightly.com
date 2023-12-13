const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const { saveImage } = require('./services/google-cloud');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt, model, n, size) {
  try {
    const response = await openai.images.generate({
      prompt,
      model,
      n,
      size,
      response_format: 'b64_json',
    });
    return response.data[0];
  } catch (error) {
    console.log('Error generating image:', error);
    return `Error generating image: ${error}`;
  }
}

async function saveImageBufferToFile(imageBuffer, imagePath) {
  fs.writeFileSync(path.join(__dirname, imagePath), imageBuffer);
}

function replaceWhiteSpaceWithDash(imageName) {
  return imageName.replace(/\s+/g, '-');
}

exports.handler = async function handler(prompt, imageName, model = 'dall-e-2', n = 1, size = '1024x1024') {
  const image = await generateImage(prompt, model, n, size);

  const buffer = Buffer.from(image.b64_json, 'base64');

  await saveImage(buffer, imageName);

  const imageNameWithDash = replaceWhiteSpaceWithDash(imageName);

  const imagePath = `./data/images/${imageNameWithDash}.jpg`;

  await saveImageBufferToFile(buffer, imagePath);

  return `${imageName}.jpg`;
};

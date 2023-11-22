// functions/generate-content.js
const axios = require('axios')

exports.handler = async function (event, context) {

  const prompt = event.queryStringParameters.prompt || 'Synthetic fabrics used in sports';

  const response = getArticle(prompt, length);

  const content = response.data.choices[0].text.trim();

  return {

    statusCode: 200,

    body: JSON.stringify({
      title,
      description,
      content,
      prompt
    }),

  };

};

const openai = require('Openai');

const Openai = new openai(process.env.OPENAI_API_KEY);

async function getArticle(topic, length) {

  const messages = [{ role: 'user', content: `Funny and informative ${length} word article about cannabis topics ${topic} for an eigth grade reading level. Format in HTML using p tags and H2 for section headers` }];

  const model = "gpt-3.5-turbo";

  const response = await Openai.chat.completions.create({
    messages,
    model,
  });

  return response.choices[0].message.content;

}

async function getDescription(topic) {
  const messages = [{
    role: 'system', content: `Meta descriptions for no longer than 155 characters for page defining cannabis topic ${topic}`
  }];

  const model = "gpt-3.5-turbo";

  const gptResponse = await Openai.chat.completions.create({
    messages,
    model,
  });

  return gptResponse.choices[0].message.content;

}

async function getHeadline(topic) {
  const messages = [{
    role: 'system', content: `Silly headline 10 words or fewer for cannabis story ${topic}`
  }];

  const model = "gpt-3.5-turbo";

  const gptResponse = await Openai.chat.completions.create({
    messages,
    model,
  });

  return gptResponse.choices[0].message.content;
}
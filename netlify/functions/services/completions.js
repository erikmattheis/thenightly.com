/* eslint-disable no-unreachable */
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = 'gpt-3.5-turbo';

async function generateDesiredContentCallback(result) {
  fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
}

function makeContentMessages(topic, grade, len) {
  const messages = [{
    role: 'user',
    content: `Write funny informative ${len} word article topic ${topic}, 
  grade ${grade} level about {$len} words long. Reply only with a HTML body tag, using only p tags and h2 tags for section titles`,
  }];

  return messages;
}

async function generateDesiredContent(messages) {
  const response = await openai.chat.completions.create({
    messages,
    model,
    max_tokens: 1000,
  });

  const result = response.choices[0].message.content.trim();

  return result;

  // eslint-disable-next-line no-constant-condition
  // return callback(result);

  // return generateDesiredContent(messages, generateDesiredContent, i);
}

function makeDescriptionMessages(content) {
  const messages = [{
    role: 'user',
    content: `Meta description for article: ${content}`,
  }];

  return messages;
}

function makeTitleMessages(description) {
  const messages = [{
    role: 'user', content: `Title for article described as ${description}`,
  }];

  return messages;
}

function makeSidebarMessages(content) {
  const messages = [{
    role: 'user',
    content: `Sidebar, no more than two or three sentances, add 
    any appropriate strong and em tags, if it is very short, put it in a singe h4 tag, 
    pulled from article ${content}`,
  }];

  return messages;
}

async function generateCompletion(messages) {
  const response = await openai.chat.completions.create({
    messages,
    model,
  });

  return response.choices[0].message.content.trim();
}

async function generateArticle(topic, grade, len) {
  const contentMessages = makeContentMessages(topic, grade, len);

  const content = await generateDesiredContent(contentMessages, generateDesiredContentCallback);

  const descriptionMessages = makeDescriptionMessages(content);

  const description = await generateCompletion(descriptionMessages);

  const titleMessages = makeTitleMessages(description);

  const title = await generateCompletion(titleMessages);

  const sidebarMessages = makeSidebarMessages(content);

  const sidebar = await generateCompletion(sidebarMessages);

  return {
    statusCode: 200,
    body: JSON.stringify({
      content,
      contentMessages,
      description,
      descriptionMessages,
      title,
      titleMessages,
      sidebar,
      sidebarMessages,
      args: {
        topic,
        grade,
        len,
        model,
      },
    }),
  };
}

module.exports = {
  generateArticle,
};

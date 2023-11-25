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

function getMessage(response) {
  return response.choices[0].message.content.trim();
}

function makeContentMessages(topic, grade, len) {
  const messages = [{
    role: 'user',
    content: `Write funny informative ${len} word article about ${topic}, at a 
  grade ${grade} level. Reply in a HTML document, using only p tags and h2 tags.`,
  }];

  return messages;
}

async function generateContent(messages) {
  const response = await openai.chat.completions.create({
    messages,
    model,
  });

  return response;
}

function makeDescriptionMessages(content) {
  const messages = [{
    role: 'user',
    content: `Meta description fewer than 158 characters for article: ${content}`,
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
    content: `Sidebar, no more than two or three sentences, add 
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

  return response;
}

async function generateArticle(topic, grade, len) {
  const contentMessages = makeContentMessages(topic, grade, len);

  const contentResponse = await generateContent(contentMessages, generateDesiredContentCallback);

  const content = getMessage(contentResponse);

  const descriptionMessages = makeDescriptionMessages(content);

  const descriptionResponse = await generateCompletion(descriptionMessages);

  const description = getMessage(descriptionResponse);

  const titleMessages = makeTitleMessages(description);

  const titleResponse = await generateCompletion(titleMessages);

  const title = getMessage(titleResponse);

  const sidebarMessagesResponse = makeSidebarMessages(content);

  const sidebarMessages = await generateCompletion(sidebarMessagesResponse);

  const sidebar = await getMessage(sidebarMessages);

  return {
    content,
    description,
    title,
    sidebar,
    input: {
      topic,
      grade,
      len,
      model,
      messages: {
        content: contentMessages,
        description: descriptionMessages,
        title: titleMessages,
        sidebar: sidebarMessages,
      },
    },
  };
}

module.exports = {
  generateArticle,
};

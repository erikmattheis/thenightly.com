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
    role: 'system',
    content: 'You are a writer with an abrasive, occasionally outrageous, angry style and a dark sense of humor.',
  }, {
    role: 'user',
    content: `${len} word article about ${topic} for a ${grade} reading level. Format in HTML, use only p, em, strong and h2 tags.`,
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

function makeDescriptionMessages(str) {
  const shorter = str.split(' ').slice(0, 100).join(' ');
  const messages = [{
    role: 'user',
    content: `Write a HTML meta description less than 158 characters for article: ${shorter}`,
  }];

  return messages;
}

function makeTitleMessages(str) {
  const messages = [{
    role: 'user', content: `Title less than 66 characters, article described as ${str}`,
  }];

  return messages;
}
/*
function makeSidebarMessages(str) {
  const messages = [{
    role: 'user',
    content: `Sidebar fewer than 100 words taken directly from article:

    ${str}

    .`,
  }];

  return messages;
}
*/
async function generateCompletion(messages) {
  const response = await openai.chat.completions.create({
    messages,
    model,
  });

  return response;
}

function getRidOfAllButBodyContent(str) {
  if (!str.includes('<body>') || !str.includes('</body>')) return str;
  const body = str.split('<body>')[1].split('</body>')[0];
  return body;
}
async function generateArticle(topic, grade, len, color) {
  const contentMessages = makeContentMessages(topic, grade, len);

  const contentResponse = await generateContent(contentMessages, generateDesiredContentCallback);

  // eslint-disable-next-line max-len
  // const cleanedContentResponse = JSON.parse(JSON.stringify(contentResponse).replace(/\\n/g, ' '));

  const preliminaryContent = getMessage(contentResponse);

  const content = getRidOfAllButBodyContent(preliminaryContent);

  const descriptionMessages = makeDescriptionMessages(content);

  const descriptionResponse = await generateCompletion(descriptionMessages);

  const description = getMessage(descriptionResponse);

  const titleMessages = makeTitleMessages(description);

  const titleResponse = await generateCompletion(titleMessages);

  const title = getMessage(titleResponse);
  /*
  const sidebarMessagesResponse = makeSidebarMessages(content);

  const sidebarMessages = await generateCompletion(sidebarMessagesResponse);

  const sidebar = await getMessage(sidebarMessages);
*/
  return {
    title,
    shortTitle: topic,
    color,
    content,
    description,
    // sidebar,
    input: {
      topic,
      grade,
      len,
      model,
      messages: {
        content: contentMessages,
        description: descriptionMessages,
        title: titleMessages,
        // sidebar: sidebarMessages,
      },
    },
  };
}

module.exports = {
  generateArticle,
};

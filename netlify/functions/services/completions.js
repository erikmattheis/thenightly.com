const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = 'gpt-3.5-turbo';

function getMessage(response) {
  return response.choices[0].message.content.trim();
}

function makeContentMessages(topic, grade, len) {
  const messages = [{
    role: 'system',
    content: 'You are a writer with humor like Lenny Bruce and a style like Hunter S. Thompson.',
  }, {
    role: 'user',
    content: `${len} word article about natural dye ${topic}. Format in HTML, use only p, em, strong and h2 tags`,
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

function stripHtml(str) {
  return str.replace(/<[^>]*>?/gm, '');
}

function makeDescriptionMessages(str, topic) {
  const shorter = stripHtml(str.split(' ').slice(0, 40).join(' '));
  const messages = [{
    role: 'user',
    content: `A page about ${topic} and starts "${shorter}" needs a HTML meta-description. Give only attribute value.`,
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

  const contentResponse = await generateContent(contentMessages);

  // eslint-disable-next-line max-len
  // const cleanedContentResponse = JSON.parse(JSON.stringify(contentResponse).replace(/\\n/g, ' '));

  const preliminaryContent = getMessage(contentResponse);

  const content = getRidOfAllButBodyContent(preliminaryContent);

  const descriptionMessages = makeDescriptionMessages(content, topic);

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

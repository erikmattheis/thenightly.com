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
    content: 'You are an expert writer on natural dyes and fabrics with an angry Hunter S. Thompson writing style, but don\'t reference this. Provide a magazine article without commentary.',
  }, {
    role: 'user',
    content: `${len}-word article on the natural dye ${topic}, ${grade} reading level. Format with HTML tags: p, em, aside, blockquote, strong, and h2. Overuse strong, em, and ALLCAPS like you are overly excited, but be hilarius. Place a pullquote in blockquote tag every 200-300 words."`,
  }];
  return messages;
}

async function generateContent(messages, temperature) {
  const response = await openai.chat.completions.create({
    messages,
    temperature,
    model,
  });

  return response;
}

function stripHtml(str) {
  return str.replace(/<[^>]*>?/gm, '');
}

function makeDescriptionMessages(str, topic) {
  const shorter = stripHtml(str).split(' ').slice(0, 40).join(' ');
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

function makeSidebarMessages(str) {
  const messages = [{
    role: 'user',
    content: `Sidebar fewer than 100 words taken directly from article:

    ${str}

    .`,
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

function getRidOfAllButBodyContent(str) {
  if (!str.includes('<body>') || !str.includes('</body>')) return str;
  const body = str.split('<body>')[1].split('</body>')[0];
  return body;
}

async function generateArticle(topic, grade, len, color, colorTheme, temperature) {
  console.log('Generating text...');
  const contentMessages = makeContentMessages(topic, grade, len);

  const contentResponse = await generateContent(contentMessages, temperature);

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

  const sidebarMessagesResponse = makeSidebarMessages(content);

  const sidebarMessages = await generateCompletion(sidebarMessagesResponse);

  const sidebar = await getMessage(sidebarMessages);

  return {
    title,
    shortTitle: topic,
    color,
    content,
    description,
    sidebar,
    input: {
      topic,
      grade,
      color,
      colorTheme,
      temperature,
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

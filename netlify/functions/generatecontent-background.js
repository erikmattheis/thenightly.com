const { performance } = require('perf_hooks');
const { saveArticle } = require('./services/firestore');
const generateImage = require('./generate-image');
// const generateJson = require('./generate-json');

const { generateArticle } = require('./services/completions');

function getAGrade() {
  const grades = ['6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade', 'college', 'graduate school', 'doctorate', 'post-doctorate', 'professor'];
  return grades[Math.floor(Math.random() * grades.length)];
}

function normalRandom(mean, stdDev) {
  // warning: can return unusable negative numbers
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * stdDev + mean; // Translate to desired mean and standard deviation

  return num;
}

function getALength(assignedWords) {
  let finalWordCount;
  do {
    const revisionFactor = normalRandom(1.1, 0.07);
    finalWordCount = (assignedWords * revisionFactor);

    finalWordCount = Math.round(finalWordCount);
  } while (finalWordCount < assignedWords * 0.7 || finalWordCount > assignedWords * 1.5);
  // add plus or minus 20
  finalWordCount += Math.floor(Math.random() * 40) - 20;
  return finalWordCount;
}

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

// eslint-disable-next-line func-names
exports.handler = async function () {
  // const topic = body.topic || 'Synthetic fabrics used in sports';
  // const filePath = './netlify/functions/data/config/lists/dyes.json';
  // const absolutePath = path.join(__dirname, '..', filePath);

  const dyes = [
    {
      name: 'Alkanet',
      color: '#8B008B',
    },
    {
      name: 'Annatto',
      color: '#FFD700',
    },
    {
      name: 'Avocado pits',
      color: '#568203',
    },
    {
      name: 'Beets',
      color: '#8E354A',
    },
    {
      name: 'Black Beans',
      color: '#3D2B1F',
    },
    {
      name: 'Black Elderberry',
      color: '#503047',
    },
    {
      name: 'Black Walnuts',
      color: '#3D2B1F',
    },
    {
      name: 'Blackthorn',
      color: '#2E2D30',
    },
    {
      name: 'Blueberries',
      color: '#4682B4',
    },
    {
      name: 'Brazilwood',
      color: '#DE3163',
    },
    {
      name: 'Buckthorn',
      color: '#8A3324',
    },
    {
      name: 'Cabbage',
      color: '#4B0082',
    },
    {
      name: 'Caramel',
      color: '#D2691E',
    },
    {
      name: 'Carrot Tops',
      color: '#FF7F00',
    },
    {
      name: 'Chamomile',
      color: '#F0DC82',
    },
    {
      name: 'Cherries',
      color: '#DE3163',
    },
    {
      name: 'Chokecherries',
      color: '#8B0000',
    },
    {
      name: 'Cochineal',
      color: '#D70040',
    },
    {
      name: 'Cocoa',
      color: '#D2691E',
    },
    {
      name: 'Coffee',
      color: '#A52A2A',
    },
    {
      name: 'Coreopsis',
      color: '#FFD700',
    },
    {
      name: 'Cumin',
      color: '#924321',
    },
    {
      name: 'Dandelion',
      color: '#FED85D',
    },
    {
      name: 'Elderberry',
      color: '#3E4095',
    },
    {
      name: 'Eucalyptus',
      color: '#44D7A8',
    },
    {
      name: 'Fustic',
      color: '#DAA520',
    },
    {
      name: 'Grapes',
      color: '#6F2DA8',
    },
    {
      name: 'Green Walnut Hulls',
      color: '#8A3324',
    },
    {
      name: 'Guava',
      color: '#E4717A',
    },
    {
      name: 'Henna',
      color: '#B06500',
    },
    {
      name: 'Hibiscus',
      color: '#ED2939',
    },
    {
      name: 'Hollyhock',
      color: '#B666D2',
    },
    {
      name: 'Indigo',
      color: '#4B0082',
    },
    {
      name: 'Jackfruit',
      color: '#FFD700',
    },
    {
      name: 'Lac',
      color: '#C32148',
    },
    {
      name: 'Lavender',
      color: '#E6E6FA',
    },
    {
      name: 'Lichen',
      color: '#8F9779',
    },
    {
      name: 'Logwood',
      color: '#534B4F',
    },
    {
      name: 'Madder',
      color: '#E30022',
    },
    {
      name: 'Mahogany',
      color: '#C04000',
    },
    {
      name: 'Marigold',
      color: '#FFD700',
    },
    {
      name: 'Mulberries',
      color: '#722F37',
    },
    {
      name: 'Mullein',
      color: '#FFDB58',
    },
    {
      name: 'Mustard',
      color: '#FFDB58',
    },
    {
      name: 'Myrobalan',
      color: '#DAA520',
    },
    {
      name: 'Nettle',
      color: '#006400',
    },
    {
      name: 'Oak Galls',
      color: '#A52A2A',
    },
    {
      name: 'Onion Skin',
      color: '#FFA500',
    },
    {
      name: 'Osage Orange',
      color: '#FF4500',
    },
    {
      name: 'Paprika',
      color: '#FF4500',
    },
    {
      name: 'Pecan Shells',
      color: '#966F33',
    },
    {
      name: 'Pomegranate',
      color: '#FFD700',
    },
    {
      name: 'Purple Carrot',
      color: '#FF4500',
    },
    {
      name: 'Quebracho',
      color: '#E30022',
    },
    {
      name: 'Red Cabbage',
      color: '#8A2BE2',
    },
    {
      name: 'Red Onions',
      color: '#8A2BE2',
    },
    {
      name: 'Red Sandalwood',
      color: '#8B0000',
    },
    {
      name: 'Rhubarb',
      color: '#D2691E',
    },
    {
      name: 'Rose Petals',
      color: '#FF007F',
    },
    {
      name: 'Safflower',
      color: '#FFD700',
    },
    {
      name: 'Sorrel',
      color: '#DB7093',
    },
    {
      name: 'Sunflower',
      color: '#FFDB58',
    },
    {
      name: 'Tansy',
      color: '#DAA520',
    },
    {
      name: 'Tea',
      color: '#008080',
    },
    {
      name: 'Turmeric',
      color: '#FFD700',
    },
    {
      name: 'Walnut',
      color: '#77202F',
    },
    {
      name: 'Weld',
      color: '#8A2BE2',
    },
  ];

  const x = 0;
  // skip first x of array
  const topics = dyes.slice(x);
  // only use first few topics for now
  topics.length = 1;

  const colorThemes = [{ name: 'Indochine and complimentary', colors: ['#CF6B00', '#4F3C28'] }, { name: 'Indochine', colors: ['#CF6B00'] }, { name: 'Razzmatazz and complementary', colors: ['#D10067', '#52293D'] }, { name: 'Razzmatazz', colors: ['#D10067'] }];

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const start = performance.now();

    const colorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

    console.log(`Generating article for ${JSON.stringify(topic.name, null, 2)}...`);

    const colorThemeDescription = colorTheme.colors.length > 1 ? `${colorTheme.colors[0]} and ${colorTheme.colors[1]}` : colorTheme.colors[0]; // eslint-disable-line max-len

    const imagePrompt = `${topic.name} natural dye featured {$topic.color} ${colorThemeDescription} still-life.`;

    const imageModel = 'dall-e-2'; // Math.random() > 0.5 ? 'dall-e-2' : 'dall-e-3';

    const imageSize = '512x512'; // '1024x1024';

    const n = 1;

    // eslint-disable-next-line no-await-in-loop
    const imageUrl = await generateImage.handler(imagePrompt, topic.name, imageModel, n, imageSize);

    const image = {
      imageUrl,
      imagePrompt,
      colorTheme,
      imageModel,
      imageSize,
    };

    const temperature = Math.random() + 0.3;

    const grade = getAGrade();
    const len = getALength(500);

    // eslint-disable-next-line no-await-in-loop
    const response = await generateArticle(`${`${topic.name}`}`, grade, len, topic.color, colorTheme, temperature);
    const end = performance.now();
    const executionTime = `${executionTimeToSeconds(end - start)} seconds`;
    console.log(`Execution time: ${executionTime}`);

    // JSON.stringify({ ...response, executionTime, topic: topic.name }, null, 2);

    // eslint-disable-next-line no-await-in-loop
    await saveArticle('dyes', {
      ...response, image, executionTime, topic: topic.name,
    });
  }

  // await generateJson.handler();

  console.log('Done.');

  return {
    statusCode: 200,
    body: 'Done.',
  };
};

const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const { generateArticles } = require('./netlify/functions/generate-content')
const { handler } = require('./netlify/functions/generate-json')

async function run() {
    //const result = await generateArticles()

    const result2 = await handler()

    process.exit(0)
}

run()

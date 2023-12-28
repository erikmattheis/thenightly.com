const { generateArticles } = require('./generate-content')

// eslint-disable-next-line func-names
exports.handler = async function () {
    const result = await generateArticles()
    return result
}

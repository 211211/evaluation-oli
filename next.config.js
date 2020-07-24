const path = require('path')

module.exports = {
  distDir: 'build',
  webpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  env: {
    BASE_URL: process.env.NEXT_BASE_URL,
    API_SUFFIX: process.env.NEXT_API_SUFFIX,
  }
}

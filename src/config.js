require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Audio Player POC',
    description: 'Micro behavior tracking along with sharing or sections of a particular audio file',
    head: {
      titleTemplate: 'Audio Player POC: %s',
      meta: [
        {name: 'description', content: 'Micro behavior tracking along with sharing or sections of a particular audio file.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Audio Player POC'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Audio Player POC'},
        {property: 'og:description', content: 'Micro behavior tracking along with sharing or sections of a particular audio file.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);

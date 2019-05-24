const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const TEST = process.env.TEST

module.exports = {
  'process.env.REACT_APP_API_ENV': REACT_APP_API_ENV,
  'process.env.TEST': TEST,
}

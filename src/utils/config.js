const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const isProd = process.env.NODE_ENV === 'production'
const TEST = process.env.TEST || '0'
const PORT = parseInt(`3${TEST.padStart(3, '0')}`, 10) || 3000

module.exports = {
  PORT,
  isProd,
  ENV: REACT_APP_API_ENV,
  IMG_HOST: '//img2.xianghuanji.com',
  assetPrefix: {
    dev: isProd ? `http://localhost:${PORT}` : '',
    test: isProd ? `//test${TEST}.mmstatic.t.xianghuanji.com/react` : '',
    stage: isProd ? `//stage${TEST}.mstatic.stage.xianghuanji.com/react` : '',
    beta: isProd ? '//mstatic.beta.xianghuanji.com/react' : '',
    prod: isProd ? '//mstaticc.xianghuanji.com/react' : '',
  }[REACT_APP_API_ENV],
  baseURL: {
    dev: `http://localhost:${PORT}/`,
    test: `http://test${TEST}.mm.t.xianghuanji.com/`,
    stage: `http://stage${TEST}.m.stage.xianghuanji.com/`,
    beta: 'http://m.beta.xianghuanji.com/',
    prod: 'https://m.xianghuanji.com/',
  }[REACT_APP_API_ENV],
}

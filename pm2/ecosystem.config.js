const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const TEST = process.env.TEST || ''
const PORT = parseInt(`3${TEST.padStart(3, '0')}`, 10) || 3000

function getName () {
  if (REACT_APP_API_ENV === 'test') {
    return `test${TEST}`
  }
  if (REACT_APP_API_ENV === 'stage') {
    return `mobile-stage-${TEST}`
  }
  return `mobile-${REACT_APP_API_ENV}`
}

console.log(`start: pm2 name: ${getName()}, REACT_APP_API_ENV: ${REACT_APP_API_ENV}, PORT: ${PORT}`)

const betaOrProd = REACT_APP_API_ENV === 'beta' || REACT_APP_API_ENV === 'prod'
const baseURL = betaOrProd ? '/code/www/deploy/webroot/mobile-nextjs' : '.'

module.exports = {
  apps: [{
    name: getName(),
    cwd: betaOrProd ? `${baseURL}/current` : `${baseURL}/`,
    script: './build/backend/server/index.js',
    max_memory_restart: '500M',
    watch: false,
    // watch: [
    //   'build',
    // ],
    // ignore_watch: [
    //   'node_modules',
    //   'logs',
    //   'static',
    // ],
    exec_mode: 'cluster',
    // log_file: `./logs/${REACT_APP_API_ENV}/combined.outerr.log`,
    error_file: betaOrProd ? '/var/log/pm2/app-err.log' : `${baseURL}/logs/app-err.log`,
    out_file: betaOrProd ? '/var/log/pm2/app-out.log' : `${baseURL}/logs/app-out.log`,
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    // source_map_support: true,
    merge_logs: true,
    log_type: 'json',
    instances: betaOrProd ? 'max' : 1,
    env: {
      NODE_ENV: 'production',
      REACT_APP_API_ENV,
    },
  }],
}

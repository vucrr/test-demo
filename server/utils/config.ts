import os from 'os'

const homedir = os.homedir()
const name = homedir.replace('/Users/', '')
const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const TEST = process.env.TEST || ''
export const isProd = REACT_APP_API_ENV === 'prod' // 发布环境编辑
export const isDev = process.env.NODE_ENV !== 'production' // 调试环境变量

const configLocalPath = `${homedir}/airent/${name}/config-local/`

interface Redis {
  host: string
  port: number
  db: number
  password: string
  prefix: string
  version: string
  isDebug: boolean
}

interface RSAKey {
  private: string
  public: string
}

interface Config {
  host: string
  host2: string
  host3: string
  rsaKey: RSAKey
  rsaKeyForBFA: RSAKey
  redis: Redis
  riskControlHost: string
  easeuHost: string
}

type Configs = {
  [index: string]: Config
}

const configs: Configs = {
  dev: {
    host: 'http://test12.mm.t.xianghuanji.com/',
    host2: 'http://test12.bfa.t.xianghuanji.com/',
    host3: 'http://test5.bfa.flow.t.xianghuanji.com/',
    rsaKey: {
      private: `${configLocalPath}/mobile_new/config/link_rsa/private.pem`,
      public: `${configLocalPath}/mobile_new/config/link_rsa/public.pem`,
    },
    rsaKeyForBFA: {
      private: `${configLocalPath}/bbf/config/xhj_app/private.pem`,
      public: `${configLocalPath}/bbf/config/xhj_app/public.pem`,
    },
    redis: {
      host: '47.110.141.101',
      port: 6379,
      db: 15,
      password: 'testx1An9huaMjI',
      prefix: 'Airent-Node-',
      version: '-10000',
      isDebug: true,
    },
    riskControlHost: 'http://test7.riskc.t.xianghuanji.com/',
    easeuHost: 'http://test7.easeua.t.xianghuanji.com/',
  },
  test: {
    host: `http://test${TEST}.mm.t.xianghuanji.com/`,
    host2: `http://test${TEST}.bfa.t.xianghuanji.com/`,
    host3: `http://test${TEST}.bfa.flow.t.xianghuanji.com/`,
    rsaKey: {
      private: `/code/www/deploy/webroot/test${TEST}/config-local/mobile_new/config/link_rsa/private.pem`,
      public: `/code/www/deploy/webroot/test${TEST}/config-local/mobile_new/config/link_rsa/public.pem`,
    },
    rsaKeyForBFA: {
      private: `/code/www/deploy/webroot/test${TEST}/config-local/bbf/config/xhj_app/private.pem`,
      public: `/code/www/deploy/webroot/test${TEST}/config-local/bbf/config/xhj_app/public.pem`,
    },
    redis: {
      host: '47.110.141.101',
      port: 6379,
      db: 15,
      password: 'testx1An9huaMjI',
      prefix: 'Airent-Node-',
      version: '-10000',
      isDebug: true,
    },
    riskControlHost: `http://test${TEST}.riskc.t.xianghuanji.com/`,
    easeuHost: `http://test${TEST}.easeua.t.xianghuanji.com/`,
  },
  stage: {
    host: `http://stage${TEST}.m.stage.xianghuanji.com/`,
    host2: `http://stage${TEST}.bfa.stage.xianghuanji.com/`,
    host3: `http://stage${TEST}.bfa.flow.stage.xianghuanji.com/`,
    rsaKey: {
      private: `/code/www/deploy/webroot/stage${TEST}/config-stage/mobile_new/config/link_rsa/private.pem`,
      public: `/code/www/deploy/webroot/stage${TEST}/config-stage/mobile_new/config/link_rsa/public.pem`,
    },
    rsaKeyForBFA: {
      private: `/code/www/deploy/webroot/stage${TEST}/config-stage/bbf/config/xhj_app/private.pem`,
      public: `/code/www/deploy/webroot/stage${TEST}/config-stage/bbf/config/xhj_app/public.pem`,
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 15,
      password: 'stagex1An9huaMjI',
      prefix: 'Airent-Node-',
      version: '-10000',
      isDebug: false,
    },
    riskControlHost: `http://stage${TEST}.riskc.stage.xianghuanji.com/`,
    easeuHost: `http://stage${TEST}.easeuali.stage.xianghuanji.com/`,
  },
  beta: {
    host: 'http://m.beta.xianghuanji.com/',
    host2: 'http://bfa.beta.xianghuanji.com/',
    host3: 'http://bfa.flow.beta.xianghuanji.com/',
    rsaKey: {
      private: '/code/www/deploy/webroot/config_online/current/mobile_new/config/link_rsa/private.pem',
      public: '/code/www/deploy/webroot/config_online/current/mobile_new/config/link_rsa/public.pem',
    },
    rsaKeyForBFA: {
      private: '/code/www/deploy/webroot/config_online/current/bbf/config/xhj_app/private.pem',
      public: '/code/www/deploy/webroot/config_online/current/bbf/config/xhj_app/public.pem',
    },
    redis: {
      host: '114.55.8.32',
      port: 6379,
      db: 15,
      password: 'betax1An9huaMjI',
      prefix: 'Airent-Node-',
      version: '-10000',
      isDebug: false,
    },
    riskControlHost: 'http://riskp.beta.xianghuanji.com/',
    easeuHost: 'http://easeuali.beta.xianghuanji.com/',
  },
  prod: {
    host: 'https://m.xianghuanji.com/',
    host2: 'https://bfa.xianghuanji.com/',
    host3: 'http://bfa.flow.xianghuanji.com/',
    rsaKey: {
      private: '/code/www/deploy/webroot/config_online/current/mobile_new/config/link_rsa/private.pem',
      public: '/code/www/deploy/webroot/config_online/current/mobile_new/config/link_rsa/public.pem',
    },
    rsaKeyForBFA: {
      private: '/code/www/deploy/webroot/config_online/current/bbf/config/xhj_app/private.pem',
      public: '/code/www/deploy/webroot/config_online/current/bbf/config/xhj_app/public.pem',
    },
    redis: {
      host: 'r-bp17cbfff8f8d674.redis.rds.aliyuncs.com',
      port: 6379,
      db: 15,
      password: 'x1An9huaMjI',
      prefix: 'Airent-Node-',
      version: '-10000',
      isDebug: false,
    },
    riskControlHost: 'https://riskp.xianghuanji.com/',
    easeuHost: 'http://easeuali.xianghuanji.com/',
  },
}

export default configs[REACT_APP_API_ENV]

import Routes from 'next-routes'

const routes = new Routes()

const APP_ROUTES = [
  {
    name: 'index',
    page: 'index',
    pattern: '/',
  },
  {
    name: 'help',
    page: 'help/index',
    pattern: '/help/index',
  },
  {
    name: 'samsung',
    page: 'help/index',
    pattern: '/help/samsung/index',
  },
  {
    name: 'detail',
    page: 'product/detail',
    pattern: '/product/index',
  },
  {
    name: 'trade',
    page: 'trade/index',
    pattern: '/trade/index',
  },
  {
    name: 'appdownload',
    page: '/site/appdownload',
    pattern: '/site/appdownload/:utm_source',
  },
  {
    name: 'easeu-trade-index',
    page: 'easeu/trade/index',
    pattern: '/easeu/trade/index/:flow_code',
  },
  {
    name: 'easeu-trade-success',
    page: 'easeu/trade/success',
    pattern: '/easeu/trade/success/:flow_code',
  },
  {
    name: 'easeu-trade-success2',
    page: 'easeu/trade/success',
    pattern: '/easeu/trade/success/:flow_code/:payNo/:orderNo',
  },
  {
    name: 'easeu-creditcard',
    page: 'easeu/creditcard/index',
    pattern: '/easeu/creditcard/index/:flow_code',
  },
  {
    name: 'returncost',
    page: '/returnflow/returncost',
    pattern: '/returnflow/returncost/:trade_no',
  },
  {
    name: 'returndetail',
    page: '/returnflow/detail',
    pattern: '/returnflow/detail/:trade_no',
  },
  {
    name: 'returnsuccess',
    page: '/returnflow/success',
    pattern: '/returnflow/success/:pay_no/:trade_no',
  },
  // 去掉重定向
  // {
  //   name: 'bind-phone',
  //   page: '/myaccount/bind/bind-phone',
  //   pattern: '/myaccount/bind-phone',
  // },
  // {
  //   name: 'change-phone',
  //   page: '/myaccount/bind/change-phone',
  //   pattern: '/myaccount/change-phone',
  // },
  {
    name: 'certification',
    page: '/mytrade/certification/certify',
    pattern: '/mytrade/certification/certify/auth/zhima',
  },
]

APP_ROUTES.forEach(route => routes.add(route))

export default routes

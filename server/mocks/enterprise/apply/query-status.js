export default {
  '/enterprise/apply/result-status': () => ({
    authenticated: 2,
    account: '181****1025',
    enterprise_name: 'xxx科技有限公司',
    privileges: [{
      title: '押金全免',
      sub_title: '押金全免，0押金租机',
      icon: 'https://img.xianghuanji.com/cms/e2ba4a54fa73f0389d9ef521ccefb76c.png',
    },
    {
      title: '押金全免',
      sub_title: '押金全免，0押金租机',
      icon: 'https://img.xianghuanji.com/cms/e2ba4a54fa73f0389d9ef521ccefb76c.png',
    },
    {
      title: '押金全免',
      sub_title: '押金全免，0押金租机',
      icon: 'https://img.xianghuanji.com/cms/e2ba4a54fa73f0389d9ef521ccefb76c.png',
    },
    {
      title: '押金全免',
      sub_title: '押金全免，0押金租机',
      icon: 'https://img.xianghuanji.com/cms/e2ba4a54fa73f0389d9ef521ccefb76c.png',
    },
    {
      title: '押金全免',
      sub_title: '押金全免，0押金租机',
      icon: 'https://img.xianghuanji.com/cms/e2ba4a54fa73f0389d9ef521ccefb76c.png',
    },
    ],
  }),
  'POST /enterprise/apply/verify-email': () => ({
    partner_enterprise: 1,
    form_field: {
      employee_no: 1,
      idcard: 1,
      employee_card: 1,
    },
  }),
}

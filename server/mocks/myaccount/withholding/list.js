export default {
  '/myaccount/withholding/list': {
    data: {
      page_title: '租金代扣管理',
      current_title: '工商银行代扣(8021)',
      current_doc: '您目前使用的租金代扣方式',
      list_title: '已签订以下代扣服务',
      list_doc: '优先使用您选择的代扣方式扣款，如代扣失败将尝试按照以下排列顺序扣款',
      list: [
        {
          code: 'cup',
          type: 2,
          title: '工商银行代扣(8021)',
          agreement_no: '201273891749127491',
          icon: 'https://img2.xianghuanji.com/image/product/e63837abf448df7c88af954e8f1299ea.png',
        },
        {
          code: 'alipay',
          type: 1,
          title: '支付宝代扣',
          agreement_no: '20171222378261689885',
          icon: 'https://img2.xianghuanji.com/image/product/b0d6244e8162ba8d82b695b91ce5efc0d29dff6d.png',
        },
      ],
      popup: {
        title: '选择新增的代扣方式',
        doc: '选择以下代扣方式，会优先代扣最新开通/绑定那一张哦',
        list: [
          {
            code: 'alipay',
            title: '支付宝代扣',
            tips: '需开通支付宝免密支付',
            icon: 'https://img2.xianghuanji.com/image/product/392a48c169fca052afd23479d9982eb8.png',
            type: 1, // 1支付宝
          },
          {
            code: 'cup',
            title: '银行卡代扣',
            tips: '需要绑定一张银行卡',
            icon: 'https://img2.xianghuanji.com/image/product/703d6054d1757558eb36568e4018f1721e1f',
            type: 2, // 2银行卡
          },
        ],
      },
    },
  },
}

export default {
  '/myaccount/return/store/detail': {
    data: {
      return_route_list: [
        {
          code: 1,
          name: '门店还机',
          s_select: false,
        },
        {
          code: 2,
          name: '邮寄还机',
          is_select: true,
        },
      ],
      user_phone: '17717547951',
      return_end_date: '2020-03-16 23:59:59',
      return_end_day: 374,
      return_end_hour: 14,
      trade_type: 1,
      guarantee_mode: 'ca06',
      total_installments_number: 12,
      trade_end_date: '2020-03-09 23:59:59',
      sku_info: {
        sku_img: 'http://img2.xianghuanji.com/image/product/08758763e5595cdeb91da890f029875e443b6729.jpg@100w_100h_1e_1c.jpg',
        sku_name: '三星 三星Galaxy S9+ 谜夜黑 64G 全网通 国行 全新',
      },
      ignored_info: {
        ignored_num: 0,
      },
      price_info: {
        actual_return_price: '191.06',
      },
      price_list: [
        {
          name: '提前还机服务费',
          amount: '11.00',
        },
        {
          name: '未付租金',
          amount: '180.06',
        },
      ],
      tips_info: {
        title: '还机仅剩 5 天 5 时。为确保还机成功，请务必关闭锁屏密码，并退出设备账户ID',
        content: '请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。其他用户请根据自身机型进行操作。还有疑问',
      },
    },
  },
  '/myaccount/return/store/apply': {
    data: {
      sub_trade_no: '13123131',
    },
  },
  '/myaccount/return/store/result': {
    data: {
      trade_no: '20190307144905968137',
      sub_trade_no: '2019030714490596813774630',
      logistics_no: '9999',
      user_phone: '18717867715',
      return_end_date: '2019-04-06 23:59:59',
      return_end_day: 29,
      return_end_hour: 14,
      trade_type: 1,
      guarantee_mode: 'ca06',
      total_installments_number: 12,
      trade_end_date: '2019-03-30 23:59:59',
      sku_info: {
        sku_img: 'http://img2.xianghuanji.com/image/product/b337ab12093c623a1210fe81626b8f92581f421b.jpg@100w_100h_1e_1c.jpg',
        sku_name: '苹果 iPhone 8 银色 64G 全网通 全新',
      },
      price_info: {
        actual_return_price: '191.06',
      },
      tips_info: {
        title: '还机仅剩 5 天 5 时。为确保还机成功，请务必关闭锁屏密码，并退出设备账户ID',
        content: '请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。其他用户请根据自身机型进行操作。还有疑问',
      },
      price_list: [
        {
          name: '提前还机服务费',
          amount: '11.00',
        },
        {
          name: '未付租金',
          amount: '180.06',
        },
      ],
      store_info: {
        city_id: '1',
        region_id: '3',
        store_id: '357',
        store_name: '测试门店2018',
        address: '三三四四三三四四三三四四三三四四三三四四三三四四三三四四三三四四三三四四三三四四三三四四三三四四',
        phone: '1212',
      },
    },
  },
  '/myaccount/return/store/cancel': {
    data: {
      handle_result: 'fail',
    },
  },
}

export default {
  '/myaccount/return/express/getNo': {
    data: {
      sub_trade_no: '13123131',
    },
  },
  '/myaccount/return/express/cancel': {
    data: {
      handle_result: 'fail',
    },
  },
  '/myaccount/return/express/getReturnDetail': {
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
      express_type_list: [
        {
          code: 1,
          name: '自寄',
          is_select: true,
        },
        {
          code: 2,
          name: '上门取件',
          is_select: true,
        },
      ],
      user_phone: '17717547951',
      return_end_date: '2020-03-16 23:59:59',
      return_end_day: 374,
      return_end_hour: 14,
      trade_type: 1,
      guarantee_mod: 'ca06',
      total_installments_number: 12,
      trade_end_dat: '2020-03-09 23:59:59',
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
      pickup_info: '',
    },
  },
  '/myaccount/return/express/getApplyResult': {
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
      deliverInfo: {
        name: '张三',
        phone: '13310000001',
        province: '上海',
        city: '上海市',
        county: '杨浦区',
        address: '军工路516号',
        ordered_time: '2019-03-18 11:00:00',
        status: 10,
        statusTxt: '上门取件预约成功',
        statusMsg: '取件员将在 1月4日 15:00-16:00 上门取件，请保持手机畅通',
      },
      express_type: 2,
    },
  },
  '/myaccount/return/express/getTime': {
    data:
      [
        {
          date: '今天',
          time: [
            {
              start_time: 'now',
              display_str: '一小时内',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
          ],
        },
        {
          date: '明天',
          time: [
            {
              start_time: 'now',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
          ],
        },
        {
          date: '后天',
          time: [
            {
              start_time: 'now',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
            {
              start_time: '2019-03-06 16:00:00',
              display_str: '16:00 ~ 16:30',
            },
          ],
        },
      ],
  },
  '/myaccount/return/express/isAddressAvailable': {
    data: {
      is_valid: true,
      error_reason: '',
    },
  },
  '/myaccount/return/express/getRoute': {
    data: {
      express_number: '13131231',
      express_route: [
        {
          happened_time: '2018-05-02 12:01:44',
          happened_address: '广东省深圳市软件产业基地',
          desc: '已签收,感谢使用顺丰,期待再次为您服务（测试数据）',
          tag: 4,
          time: '12:01',
          date: '2018.05.02',
          isReceived: 1,
          isSigned: 0,
        },
        {
          happened_time: '2018-05-02 12:01:40',
          happened_address: '广东省深圳市软件产业基地',
          desc: '已签收,感谢使用顺丰,期待再次为您服务（测试数据）',
          tag: 4,
          time: '12:00',
          date: '2018.05.02',
          isReceived: 0,
          isSigned: 1,
        },
      ],
      product_info: {
        sku_img: 'https://img2.xianghuanji.com/image/product/9c6d83301f81c59d239489fb2d1c6302f8369781.jpg@100w_100h_1e_1c.jpg',
        sku_name: '苹果 iPhone 7 Plus 金色 128G 国行',
      },
    },
  },
}

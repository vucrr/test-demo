export default {
  '/mytrade/assess/result': {
    "appraise_type": 1,
    "prepaid_price": "0.00",
    "appraise_title": "经评估，您OK呦",
    "prepaid_desc": "您可以更换担保方式下单哦",
    "prepaid_tips": "包含第0期租金和其他服务费",
    "prepaid_text": "首期费用",
    "agreement_info": {
      "agreement_msg": "我已阅读并同意",
      "agreement_name": "《租赁服务协议》",
      "agreement_url": "",
      "agreement_title": "融资租赁合同"
    },
    "appraise_remark": "",
    "rent_info": [
      {
        "name": "月租",
        "amount": "¥ 1.00"
      },
      {
        "name": "极速发货",
        "amount": "¥ 1.00"
      },
      {
        "name": "隐私擦除",
        "amount": "¥ 0.00"
      }
    ],
    "charge_info": {
      "p_title": "支付费用明细",
      "trade_no": "1231231",
      "price_info": [
        {
          "title": "首期月租",
          "content": "300.00"
        },
        {
          "title": "意外维修服务费",
          "content": "200.00"
        },
        {
          "title": "定制手机壳+钥匙链",
          "content": "200.00"
        },
        {
          "title": "腾讯视频无线流量卡",
          "content": "200.00"
        }
      ],
      "total_text": "总计",
      "total_price": "1000.00",
    },
    "fund_id": 0,
    "authorize_info": {
      "name": "信用评估免押",
      "icon": "https://img2.xianghuanji.com/image/product/392a48c169fca052afd23479d9982eb8.png",
      "ept_title": "您已选择$0作为押金担保",
      "amount_title": "授权金额"
    },
    "step_doc": "离完成订单只差以下1步了哦",
    "step_list": [
      {
        "step_no": "1",
        "step_title": "已开通租金代扣",
        "step_info": "每期自动扣除租金，无需担心忘记还款带来的麻烦。",
        "step_code": 'payFirstCharge',
        "step_status": 1,
        "withhold_first": "共",
        "info": {
          "title": "租金代扣方式",
          "context": "您已开通以下租金代扣方式，将会按照下面排列顺序扣款，若要更改代扣方式，可以到“我的”→“租金代扣管理”内操作。",
          "list": [
            {
              "name": "支付宝代扣",
              "icon": "https://img2.xianghuanji.com/image/product/b0d6244e8162ba8d82b695b91ce5efc0d29dff6d.png"
            }
          ]
        }
      },
      {
        "step_no": "2",
        "step_title": "支付首期费用",
        "step_info": "共$0，包含第1期租金和其他服务费。",
        "step_status": 0
      }
    ],
    "step_bar": [
      {
        "step_title": "选择押金方式",
        "is_show": 1
      },
      {
        "step_title": "免押/预授权",
        "is_show": 0
      },
      {
        "step_title": "绑定还款方式",
        "is_show": 0
      },
      {
        "step_title": "完成下单",
        "is_show": 0
      }
    ]

  }
}

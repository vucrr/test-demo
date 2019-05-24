export default {
  '/mytrade/fundsUnion/confirm': {
    "authorize_info": {
      "title": "担保方式",
      "name": "信用评估免押",
      "icon": "https://img2.xianghuanji.com/image/product/392a48c169fca052afd23479d9982eb8.png",
      "ept_title": "您已选择$0作为押金担保",
      "amount_title": "授权金额",
      "amount": 4679,
      "tips": "信用好可全免押金"
    },
    "agreement_info": {
      "agreement_msg": "我已阅读并同意",
      "agreement_name": "《租赁服务协议》",
      "agreement_url": "",
      "agreement_title": "融资租赁合同"
    },
    "appraise_remark": "",
    "fund_id": 0,
    "agreement_btn": "下一步",
    "authorize_text": "请确认授权信息",
    "step_doc": "离完成订单只差以下1步了哦",
    "step_list": [
      {
        "step_no": "1",
        "step_title": "已开通租金代扣",
        "step_info": "每期自动扣除租金，无需担心忘记还款带来的麻烦。",
        "step_code": 'bindWithhold',
        "step_status": 1,
        "withhold_first": "支付宝代扣>",
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
        "step_code": '',
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

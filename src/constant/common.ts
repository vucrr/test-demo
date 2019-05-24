export const FLOW_SUB_CODE = {
  XhjRiskRealTrait: 'XhjRiskRealTrait', // 实名流程
  XhjRiskStepTrait: 'XhjRiskStepTrait', // 评估流程
  RiskResult: 'RiskResult', // 评估结果
  WithHoldAndPayTrait: 'WithHoldAndPayTrait', // 签约代扣
  XhjFreezeBalanceTrait: 'XhjFreezeBalanceTrait', // 支付冻结
}

export const SMS_TYPES = {
  BindPhone: 'bindPhone',
  ChangePhone: 'changePhone',
  ChangeBind: 'changeBind',
  QsyReturnPhone: 'qsyReturnPhone',
}

export const BUTTON_TYPE = {
  CANCEL_NO_SHIPPED: 1, // 待发货取消
  CANCEL_UNDER_REVIEW: 2, // 审核中取消
  TERMINATION_SERVICE: 3, // 终止服务
  REPAIR_APPLY: 4, // 申请售后
  EXCHANGE_DO: 5, // 立即换机
  // '': 6, // 提前还款
  // '': 7, // 取消换机
  // '': 8, // 继续申请
  // '': 9, // 去支付(服务费用)
  // '': 10, // 还机详情
  // '': 11, // 维修详情
  // '': 12, // 去授权
  // '': 14, // 换机继续申请
  // '': 15, // 去支付(赔偿费用)
  // '': 16, // 取消还机
  RETUREN_APPLY: 17, // 还机申请
  BUY_OUT_APPLY: 18, // 立即买断
  // '': 19, // 申请退货
  // '': 20, // 物流信息
}

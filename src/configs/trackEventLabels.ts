export const TrackEventHome = {
  Category: 'Home',
  AdvertModal: {
    Redirect: 'Ht01',
    Close: 'Htc01',
  },
  TopDownload: {
    Close: 'Hc01',
    Download: 'Hd01',
  },
  BannerNav: {
    Carousel: 'Lb',
  },
  BannerBox: {
    ItemBox1: 'Sl01',
    ItemBox2: 'Sr01',
    ItemBox3: 'Sr02',
    BottomBanner: 'Z01',
  },
  BrandIcon: {
    BrandIcon: 'BrandIcon',
    MoreIconOpen: 'MoreIconOpen',
    MoreIconClose: 'MoreIconClose',
  },
  NewOldUser: {
    NewOldBannerLeft: 'NewOldBannerLeft',
    NewOldBannerRight: 'NewOldBannerRight',
  },
  ActivityList: {
    Topic: 'Topic',
  },
  OrderTips: {
    Link: 'ContinueToPlaceOrders',
  },
}

export const TrackEventCategory = {
  Category: 'Classify',
  Tabs: {
    CategoryHengF: 'CategoryHengF',
    CategoryZongF: 'CategoryZongF',
  },
  Banner: {
    CategoryBanner: 'CategoryBanner',
  },
  Product: {
    CategoryProduct: 'CategoryProduct',
  },
}

export const TrackEventTabBar = {
  Category: 'TabBar',
}

export const TrackEventBrand = {
  Category: 'BrandPage',
  Tab: {
    BrandPageHengF: 'BrandPageHengF',
  },
  Product: {
    BrandPageProduct: 'BrandPageProduct',
  },
}

export const TrackEventProductDetail = {
  Name: 'ProductDetail',
  PlanBox: {
    Item1: 'ViewSchemeDetails',
    ABTest: 'SchemeDetailsCate',
  },
  Content: {
    Item1: 'ViewMoreReviews',
  },
  Bottom: {
    Help: 'HelpDetail',
    Remind: 'PriceReducedRemind',
    Item1: 'SkuSelectorStart',
  },
  PopupModal: {
    SkuSelectorStart: 'SkuSelectorStart',
    SkuSelectorEnd: 'SkuSelectorEnd',
  },
}
export const TrackEventTradeDev = {
  // 确认订单页面
  DetailModal: {
    Name: 'RentDetail',
    Item1: 'ViewRentDetails',
    Item2: 'RentDetailsclosed',
  },
  ExtraRentBox: {
    Name: 'FutureplanDetail',
    Item1: 'ViewFutureplans',
    Item2: 'FutureplansClosed',
  },
  //
  SubmitBottom1: {
    Name: 'CheckAgreement ',
    Item1: 'UncheckedAgreement',
    Item2: 'CheckedAgreement',
  },
  SubmitBottom2: {
    Name: 'Agreement ',
  },
  Submission: {
    Name: 'Submission',
    Item: 'Placeorder',
  },
  SubmissionSuccess: {
    Name: 'Submission',
    Item: 'SubmitOrderSuccess',
  },
  // 担保方式页面
  PaymentCode: {
    Name: 'PaymentCode',
  },
  GuaranteeSubmit: {
    Name: 'GuaranteeSubmit',
  },
  Frame: {
    Name: 'Frame',
    Item: 'HuabeiFailureFrame',
  },
  // 在担保页和结果页
  GuaranteeMode: {
    Name: 'GuaranteeMode',
    Item: 'ReplaceGuaranteeMode',
  },
  // 评估结果页面
  Prepay: {
    Name: 'Prepay',
    Item: 'PrepayRent',
  },
  // 收货地址页
  address: {
    Name: 'DeliveryPage',
    Item: 'DeliveryInfoSave',
  },
  // 补充资料页
  ExtraInfo: {
    Name: 'SupplementaryInformation',
    Item: 'Save',
  },
  // 信用评估确认页
  CreditEvaluation: {
    Name: 'CreditEvaluation',
    AuthorizationZHIMA: 'AuthorizationZHIMA',
    GetLocation: 'GetLocation',
    AddEmergencyContact: 'AddEmergencyContact',
    ToEvaluate: 'ToEvaluate',
  },
}

export const TrackEventFundsUnion = {
  Submission: {
    Name: 'Submission',
    Item1: 'RealName',
    Item2: 'Placeorder',
  },
  CheckCardContinue: {
    Name: 'Continue',
    Item: 'CardVerification',
  },
  Confirm: {
    Name: 'Confirm',
    Item1: 'PhoneNumberVerification',
    Item2: 'ConfirmDeparture',
  },
  CheckAgreement: {
    Name: 'CheckAgreement',
    Item1: 'CheckedAgreement',
    Item2: 'UncheckedAgreement',
  },
  ChooseCard: {
    Name: 'Choose',
  },
  AddCard: {
    Name: 'Add',
    Item: 'ChooseAnotherCard',
  },
  Frame: {
    Name: 'Frame',
    Item1: 'ChooseAnotherCardFrame',
    Item2: 'CardVerificationDeparture',
  },
  Cancel: {
    Name: 'Cancel',
    Item1: 'CancelDeparture',
  },
  RentDetailModal: {
    Name: 'Check',
    Item: 'CheckRentDetails',
  },
  RentDetailModalClose: {
    Name: 'Close',
    Item: 'CloseRentDetails',
  },
}

export const TrackEventMyCenter = {
  // 个人中心页，点击【立即享受一站式用机服务】，埋点事件发送
  Order: {
    category: 'Order',
    label: 'Order',
  },
  // 个人中心页，点击【设置】，埋点事件发送
  Setting: {
    category: 'Setting',
    label: 'Setting',
  },
  // 个人中心页，点击【查看全部】，埋点事件发送
  ViewAllOrders: {
    category: 'ViewAll',
    label: 'ViewAllOrders',
  },
  // 个人中心页，点击SKU区域，埋点事件发送
  // 服务列表页，点击SKU区域，埋点事件发送
  Commodity: {
    category: 'Commodity',
    label: 'Commodity',
  },
  // 个人中心页，点击专属权益栏的【全部】，埋点事件发送
  ViewAllRights: {
    category: 'ViewAll',
    label: 'ViewAllRights',
  },
  // 个人中心页，点击专属权益栏的ICON，埋点事件发送
  Right: {
    category: 'Right',
  },
  // 个人中心页，点击【卡券】，埋点事件发送
  ViewCards: {
    category: 'Cards',
    label: 'ViewCards',
  },
  // 个人中心页，点击【余额】，埋点事件发送
  ViewBalance: {
    category: 'Balance',
    label: 'ViewBalance',
  },
  // 个人中心页，点击【信用足迹】，埋点事件发送
  ViewCredit: {
    category: 'Credit',
    label: 'ViewCredit',
  },
  // 个人中心页，点击【帮助中心】，埋点事件发送
  HelpCenter: {
    category: 'HelpCenter',
    label: 'HelpCenter',
  },
  // 个人中心页，点击热门推荐的商品，埋点事件发送
  Recommendation: {
    category: 'Recommendation',
  },
  // 服务列表页，点击【历史服务】，埋点事件发送
  HistoricalOrder: {
    category: 'HistoricalOrder',
    label: 'HistoricalOrder',
  },
  // 历史服务页列表页，点击SKU区域，埋点事件发送
  HistoricalOrderCommodity: {
    category: 'Commodity',
    label: 'HistoricalOrderCommodity',
  },
  // 下单记录页，点击【租金明细】，埋点事件发送
  RentDetail: {
    category: 'RentDetail',
    label: 'ViewRentDetails',
  },
  // 服务详情页，点击【在线客服】，埋点事件发送
  OnlineService: {
    category: 'OnlineService',
    label: 'OnlineService',
  },
  // 服务详情页，点击【电话客服】，埋点事件发送
  PhoneService: {
    category: 'PhoneService',
    label: 'PhoneService',
  },
  // 专属权益页，点击button，埋点事件发送
  RightButton: {
    category: 'RightButton',
  },
  // 还款计划页，点击【立即还款】，埋点事件发送
  RealRepayment: {
    category: 'Payment',
    label: 'RealRepayment',
  },
  // 详情页，table切换时埋点
  Table: {
    category: 'Table',
    label: 'TableSwitch',
  },
  // 服务详情页，点击【冻结押金说明图标】，埋点事件发送
  Deposit: {
    category: 'Deposit',
    label: 'DepositDescription',
  },
  // 服务详情页，关闭【押金明细】，埋点事件发送
  DepositDetails: {
    category: 'Details',
    label: 'DepositDetails',
  },
  // 服务详情页，点击【我的发票】，埋点事件发送
  Invoice: {
    category: 'Invoice',
    label: 'Invoice',
  },
  // 服务详情页，点击【我的服务协议】，埋点事件发送
  Contract: {
    category: 'Contract',
    label: 'Contract',
  },
  // 操作的按钮事件
  Termination: {
    category: 'Termination',
    label: 'Termination',
  },
  ApplyForRemand: {
    category: 'Remand',
    label: 'ApplyForRemand',
  },
  Buyout: {
    category: 'Buyout',
    label: 'ApplyForBuyout',
  },
  Cancel: {
    category: 'Cancel',
    label: 'Cancel',
  },
  ApplyAfterSale: {
    category: 'ApplyAfterSale',
    label: 'ApplyAfterSale',
  },
  Maintenance: {
    category: 'Maintenance',
    label: 'MaintenanceRecords',
  },
  Change: {
    category: 'Change',
    label: 'Change',
  },
  Repayment: {
    category: 'Payment',
    label: 'Repayment',
  },
  Continue: {
    category: 'Continue',
    label: 'Continue',
  },
  Payment: {
    category: 'Payment',
    label: 'Pay',
  },
  RemandDetails: {
    category: 'Remand',
    label: 'RemandDetails',
  },
  RemandCancel: {
    category: 'Cancel',
    label: 'RemandCancel',
  },
  ApplyForReturn: {
    category: 'Return',
    label: 'ApplyForReturn',
  },
  ApplyForBuyout: {
    category: 'Buyout',
    label: 'ApplyForBuyout',
  },
  ApplyForWithHold: {
    category: 'MemberCenter',
    label: 'Continue',
  },
  ExtraInfo: {
    category: 'MemberCenter',
    label: 'ToSupplementaryInformation',
  },
}

export const TrackEventRiskFlowStep = {
  // 添加经过风控路径的完结事件发送
  RiskEvaluatedEnd: {
    category: 'FlowStep',
    label: 'RiskEvaluatedEnd',
  },
}

export const TrackEventExchange = {
  Remind: {
    category: 'ReplacementRemind',
    // 点击“换机须知”文字链,
    name1: 'ReplacementInsructions',
    // 点击"还机费用"后的问号 + 订单号
    name2: 'NotesForReturnFeeReplacementRemind',
    // 点击【暂不换，继续下单】按钮
    name3: 'OrderContinue',
    // 点击【确认换机】按钮
    name4: 'ReplacementConfirmed',
    // 勾选选择订单 + 订单号
    name5: 'OrderChoose',
  },
  OrderConfirmed: {
    category: 'ReplacementOrderConfirmed',
    // 点击地址编辑
    name1: 'AddressEdited',
    // 点击“增值服务”下拉展开
    name2: 'VASDetailsReplacementOrderConfirmed',
    // 点击确定
    name3: 'ConfirmedReplacementOrderConfirmed',
  },
  ReturnWayChoose: {
    category: 'ReplacementReturnWayChoose',
    // 点击“还机费用”后的问号
    name1: 'NotesForReturnFeeReturnWayChoose',
    // 点击“最后归还日”后的问号
    name2: 'NotesForReturnDeadline',
    // 点击【门店还机】选项卡
    name3: 'ReturnInStoreReplacementReturnWayChoose',
    // 点击【邮寄还机】选项卡
    name4: 'ReturnByMailReplacementReturnWayChoose',
    // 点击【请选择门店地址】区域
    name5: 'StoreAddressChooseReplacementReturnWayChoose',
    // 点击“还机标准”区域
    name6: 'ReturnRuleReplacementReturnWayChoose',
    // 点击“还机须知”区域
    name7: 'ReturnNoteReplacementReturnWayChoose',
    // 点击【提交】按钮
    name8: 'CommitReplacementReturnWayChoose',
  },
}

export const TrackEventRentWithholding = {
  // 授权确认页，点击【支付宝代扣/银行卡代扣】时，埋点事件发送
  AuthorizationConfirm: {
    category: 'AuthorizationConfirm',
    label: 'ViewRentMethodDetail',
  },
  // 评估结果页，点击【支付宝代扣/银行卡代扣】时，埋点事件发送
  EvaluationResult: {
    category: 'EvaluationResult',
    label: 'ViewRentMethodDetail',
  },
  RentMethod: {
    category: 'RentMethod',
  },
  RentMethodManagement: {
    category: 'RentMethodManagement',
  },
  AddRentMethod: {
    category: 'AddRentMethod',
  },
}

// 信用卡预授权LBF
export const TrackEventLBF = {
  // 担保方式页
  Guarantee: {
    category: 'Guarantee',
    // 点击查看【冻结预授权】
    name: 'AuthorizationIntroduction',
  },
  // 冻结信用卡额度页，
  CardInformation: {
    category: 'CardInformation',
    // 点击查看【持卡人】说明
    name1: 'Name',
    // 点击查看【安全码】说明
    name2: 'CVN2',
    // 勾掉“我已阅读并同意《乐百分条款》”
    name3: 'UncheckedAgreement ',
    // 勾选“我已阅读并同意《乐百分条款》”
    name4: 'CheckedAgreement',
    // 点击《乐百分条款》
  },
  // 验证信息页，点击【立即冻结额度】
  SMSVerification: {
    category: 'SMS-Verification',
    name: 'Freeze',
  },
  // 办理结果页
  ResultPage: {
    category: 'ResultPage',
    // 点击【查看订单】
    name1: 'CheckOrder',
    // 点击【重新冻结】
    name2: 'Refreeze',
  },
}

export const TrackEventEnterPrise = {
  Category: 'AccessariesSelected',
  Search: {
    NumberSearch: 'NumberSearch',
    Switching: 'Switching',
    NumberSearchCancel: 'NumberSearchCancel',
  },
  Btns: {
    NumberConfirmed: 'NumberConfirmed',
    ReturnHomelnAccessariesSelected: 'ReturnHomelnAccessariesSelected',
    ContactCustomerService: 'ContactCustomerService',
  },
}

export const TrackEventMyAccountReturn = {
  // 还机申请页
  Apply: {
    category: 'ReplacementReturnApply',
    // 还机Tab
    name1: 'ReturnTypeChange',
    // 顶部Tab下的公告栏
    name2: 'BulletinBoardInReplacementReturn',
    // “更改寄件方式”文字链
    name3: 'ReplacementReturnChange',
    // 取件时间区域
    name4: 'PickupTimeAppointment',
    // 取件地址区域
    name5: 'PickupAddress',
    // 支付金额右侧注释问号
    name6: 'ReplacementReturnFeeExplanation',
    // 还机标准区域
    name7: 'RuleOfReplacementReturn',
    // 还机须知区域
    name8: 'NoticeOfReplacementReturn',
    // 寄件方式弹层上的取件区域
    name9: 'Delivery',
    // 寄件方式弹层上的【确定】按钮
    name10: 'ConfirmedOnShipment',
    // 【提交申请】按钮
    name11: 'ReplacementReturnSubmit',
    // 申请失败弹层上的【好的】按钮
    name12: 'ReplacementReturnUnsuccessful',
  },
  // 还机详情页
  Detail: {
    category: 'ReplacementReturnDetail',
    // 申请成功弹层上的【暂不】按钮
    name1: 'UnneededInReplacementReturnDetail',
    // 申请成功弹层上的【选新机】按钮
    name2: 'ChooseNewMachineInReplacementReturnDetail',
    // 【取消还机】按钮
    name3: 'ReplacementReturnCancel',
    // 【修改取件时间】按钮
    name4: 'PickupTimeAppointmentAmend',
    // 取消申请弹层上的【暂不取消】按钮
    name5: 'CancelUnneededInReplacementReturnDetail',
    // 取消申请弹层上的【确定】按钮
    name6: 'CancelConfirmedInReplacementReturnDetail',
    // 【呼叫小哥】按钮
    name7: 'CallTheCourier',
    // 【查看物流】按钮
    name8: 'TrackingTheShipmend',
    // 【重新申请】按钮
    name9: 'ReplacementReturnReapplyment ',
  },
}

export const TrackEventTradeAssess = {
  result: {
    category: 'EvaluationResult',
    // 点击查看“首期费用明细”
    name1: 'FirstFeeBreakdown',
    // 勾掉“我已阅读并同意《XX条款》”
    name2: 'UncheckedAgreement',
    // 勾选“我已阅读并同意《XX条款》”
    name3: 'CheckedAgreement',
    // 点击《XX条款》
    // 点击“下一步”
    name4: 'Nextstep',
  },
}

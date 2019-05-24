import { Toast } from 'antd-mobile'

interface AlipayTradePayReturn {
  resultCode: string // 支付结果状态码
  callbackUrl: string // 交易成功后应跳转的url,一般为空，除非交易有特殊配置
  memo: string // 收银台服务端返回的momo字符串
  result: string // 收银台服务端返回的result字符串
}

const AlipayTradePayCode = {
  success: '9000', // 订单支付成功
  handle: '8000', // 正在处理中
  failed: '4000', // 订单支付失败
  cancel: '6001', // 用户中途取消
  networkError: '6002', // 网络连接出错
  forgetPassword: '99', // 用户点击忘记密码导致快捷界面退出(only iOS)
}

function AlipayTradePay({ orderStr }: { orderStr: string }) {
  return new Promise<{ code: string; result: AlipayTradePayReturn }>(resolve => {
    AlipayJSBridge.call('tradePay', { orderStr }, async (data: AlipayTradePayReturn) => {
      const code = data.resultCode
      if (code === AlipayTradePayCode.failed) {
        Toast.info('支付失败，请重试')
      } else if (code === AlipayTradePayCode.networkError) {
        Toast.info('网络连接出错，请重试')
      }
      resolve({ code, result: data })
    })
  })
}

export { AlipayTradePayCode, AlipayTradePay }

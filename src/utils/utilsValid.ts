export const isValidPhone = (value: string) => Boolean(/^1[3456789]\d{9}$/.test(value.replace(/\s/g, '')))

export function validPhone(_: any, value: string, callback: Function) {
  if (value && !/^1[3456789]\d{9}$/.test(value.replace(/\s/g, ''))) {
    callback('手机号码格式不正确')
  } else {
    callback()
  }
}

export function validTrim(_: any, value: string, callback: Function) {
  if (value && !(value.replace(/\s+/g, '').length > 0)) {
    callback('不能为空哦')
  } else {
    callback()
  }
}
export function validTaxerNo(_: any, value: string, callback: Function) {
  if (
    value &&
    !(
      value.replace(/\s/g, '').length === 15 ||
      value.replace(/\s/g, '').length === 18 ||
      value.replace(/\s/g, '').length === 20
    )
  ) {
    callback('纳税人识别号格式不正确，请重试')
  } else {
    callback()
  }
}
export function validEmail(_: any, value: string, callback: Function) {
  if (value && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
    callback('电子邮箱格式不正确，请重试')
  } else {
    callback()
  }
}

export function validIDCard(_: any, value: string, callback: Function) {
  if (
    value &&
    !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value.replace(/\s/g, ''),
    )
  ) {
    callback('身份证号码格式不正确')
  } else {
    callback()
  }
}
// 信用卡
export function validBankCard(_: any, value: string, callback: Function) {
  if (value && !/^\d{14,16}$/.test(value.replace(/\s/g, ''))) {
    callback('信用卡格式不正确')
  } else {
    callback()
  }
}

// 银行卡卡号校验——Luhn算法(模10算法)
export function validUnionBankCard(_: any, value: string, callback: Function) {
  const cardNumber = value && value.replace(/\s/g, '')
  if (cardNumber && !/^\d{16,19}$/.test(cardNumber)) {
    callback('银行卡格式不正确')
    return false
  }
  let sum = 0
  const evenArr: number[] = []
  const oddArr: number[] = []
  const numArr: string[] = cardNumber.split('').reverse()
  for (let i = 0; i < numArr.length; i++) {
    i % 2 !== 0 ? evenArr.push(+numArr[i] * 2) : oddArr.push(+numArr[i])
  }
  for (let x = 0; x < evenArr.length; x++) {
    evenArr[x] > 9 ? (sum += evenArr[x] - 9) : (sum += evenArr[x])
  }
  for (let k = 0; k < oddArr.length; k++) {
    sum += +oddArr[k]
  }
  if (sum % 10 !== 0) {
    callback('银行卡格式不正确')
  } else {
    callback()
  }
}

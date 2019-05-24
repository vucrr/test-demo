type DicUtmToChannelId = {
  [index: string]: number
}

export const dicUtmToChannelId: DicUtmToChannelId = {
  'zhima|alipay|429': 1, // activity429

  'zhima|alipay|517': 2, // activity517

  'zhima|alipay|66': 3, // activity66

  'anlaiye|anlaiye|anlaiye': 4, // anlaiye

  'yiqifa|yiqifa|yiqifa': 5, // yiqifa

  'huanbei|huanbei|huanbei': 8, // huanbei

  'huabei||': 9,
  'huabei|huabei|group_a': 9, // group_a
  'huabei|huabei|group_b': 9, // group_b
  'huabei|huabei|group_c': 9, // group_c
  'huabei|huabei|onepay_a': 9, // onepay_a
  'huabei|huabei|onepay_b': 9, // onepay_b
  'huabei|huabei|huabeifq': 9, // huabeifq

  'zhima||': 10, // zhima

  'xindanCooperation|xindanCooperation|activity': 11, // xindanCooperation

  'xindan|xindan|zengxian': 12, // xindan

  'xhj_app||': 15, // xhj_app

  'ahs_app||': 16, // ahs_app

  'flytea|m|8thanniversary': 17, // feike

  'kakadai|kakadai|kakadai': 18, // kkdai

  'xhj_ios_app||': 19, // xhj_ios_app

  'zhifubao_app||': 20, // zhifubao_life_no

  'easeu|easeu|easeu': 21, // easeu

  'xhj_andriod_app|xhj_andriod_app|xhj_andriod_app': 22, // xhj_andriod_app

  'ahslifenumber||': 24, // ahs_zfb_life

  'samsung||': 23, // xhj_samsung

  'samsungwx|smswx|': 25, // xhj_samsung_wx

  'samsungzs|samsungzs|samsungzs': 28, // xhj_samsung_app

  'ahs_xiaohuangren_app||': 27, // ahs_xiaohuangren_app

  'cmblife||': 29, // cmb

  'samsungestore||': 30, // samsung_estore

  'changyou|changyou|changyou': 35, // xhj_changyou

  'daxueshenghuo|daxueshenghuo|daxueshenghuo': 38, // dxsh

  'sichuan_yidong||': 40, // sichuan_yidong

  'wacaiapp|wacaiapp|wacaiapp': 42,

  'samsungtrail||': 43, // 三星 Note 9 0元试用

  'dxsh||': 44, // 大学生活渠道

  'gzyd||': 45, // 广州移动

  'hnyd||': 47, // 湖南移动

  'onerentprice||': 48, // 一元租机

  'one_price_rent||': 49, // 2019年前一元租机活动
}

export default function({
  utm_source: utmSource = '',
  utm_medium: utmMedium = '',
  utm_campaign: utmCampaign = '',
}): number {
  const key3 = `${utmSource}|${utmMedium}|${utmCampaign}`
  const key2 = `${utmSource}|${utmMedium}|`
  const key1 = `${utmSource}||`
  return dicUtmToChannelId[key3] || dicUtmToChannelId[key2] || dicUtmToChannelId[key1]
}

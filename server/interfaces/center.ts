export interface CenterReturns {
  userInfo: UserInfo
  tradeCount: TradeCount
  // userIdentiInfo: UserIdentiInfo
  // channelId:      number
  mpActivityInfo: Array<MpActivityInfo[]>
}

interface MpActivityInfo {
  id: number
  title: string
  imgUrl: string
  price: number
}

interface TradeCount {
  unpay_count: number
  rent_list_count: number
  pending_list_count: number
  // shiped_count:        number;
  // repair_return_count: number;
}

// interface UserIdentiInfo {
// 	id:             number;
// 	user_id:        number;
// 	name:           string;
// 	identi_card:    string;
// 	phone:          string;
// 	address:        string;
// 	zhima_scope:    number;
// 	zhima_open_id:  string;
// 	dt_created:     string;
// 	dt_updated:     string;
// 	is_del:         number;
// 	alipay_user_id: string;
// }

interface UserInfo {
  // id:                  string;
  // nickname:            string;
  // source_type:         number;
  // name:                string;
  // identi_card:         string;
  // is_sign:             boolean;
  // pending_list_count: number
  // rent_list_count: number
  phone: string
  // alipay_user_id:      string;
  // is_bind_phone:       boolean;
  // is_bind_alipay:      boolean;
  coupon_list_count: number
  // all_list_count:      number;

  // unpaied_list_count:  number;
  // shiped_list_count:   number;
  // repair_return_count: number;
  user_balance: number
}
export interface CenterReturnsAll {
  userInfo: UserInfoAll
  tradeCount: TradeCountAll
  userIdentiInfo: UserIdentiInfo
  channelId: number
  mpActivityInfo: Array<MpActivityInfo[]>
}

interface TradeCountAll {
  unpay_count: number
  rent_list_count: number
  pending_list_count: number
  shiped_count: number
  repair_return_count: number
}

interface UserIdentiInfo {
  id: number
  user_id: number
  name: string
  identi_card: string
  phone: string
  address: string
  zhima_scope: number
  zhima_open_id: string
  dt_created: string
  dt_updated: string
  is_del: number
  alipay_user_id: string
}

interface UserInfoAll {
  id: string
  nickname: string
  source_type: number
  name: string
  identi_card: string
  is_sign: boolean
  phone: string
  alipay_user_id: string
  is_bind_phone: boolean
  is_bind_alipay: boolean
  coupon_list_count: number
  all_list_count: number
  pending_list_count: number
  rent_list_count: number
  unpaied_list_count: number
  shiped_list_count: number
  repair_return_count: number
  user_balance: number
  show_credit_entry: boolean
}

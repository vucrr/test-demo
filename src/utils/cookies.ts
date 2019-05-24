import Cookies from 'js-cookie'

// 对于 user_id_v2 和 user_token 需要调用此方法，需要加上 domain，domain 是 getDomain
const cookies = Cookies.withConverter({
  read(value) {
    return value
  },
  write(value) {
    return encodeURIComponent(value)
  },
})

export default cookies

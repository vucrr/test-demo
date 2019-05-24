import { EXCHANGE_PRIVILEGE, FETCH_PRIVILEGE_LIST, FETCH_USER_PRIVILEGE_LIST } from 'constant/index'
import { PrivilegeTypes } from 'containers/Account/Privilege/UserPrivilegeItem'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialPrivilege = {
  list: [],
  userList: [],
}

const privilege = handleActions(
  {
    [FETCH_PRIVILEGE_LIST]: (state, { payload }) => state.set('list', fromJS(payload)),
    [FETCH_USER_PRIVILEGE_LIST]: (state, { payload }) => state.set('userList', fromJS(payload)),
    [EXCHANGE_PRIVILEGE]: (state, { payload }) => {
      const item = state.getIn(['userList', payload.index])
      const newItem = item.set('redeem_code', payload.data.redeem_code).set('type', PrivilegeTypes.Exchanged)
      return state.setIn(['userList', payload.index], newItem)
    },
  },
  fromJS(initialPrivilege),
)

export default privilege

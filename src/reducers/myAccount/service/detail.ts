import { FETCH_SERVICE_DETAIL } from 'constant/index'
import { fromJS } from 'immutable'
import { ServiceDetail } from 'interfaces/account/service/detail'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  // detail: {},
}

const serviceDetail = handleActions(
  {
    [FETCH_SERVICE_DETAIL](state, { payload }) {
      const {
        contract_info,
        deposit_info,
        button_list,
        return_machine_list,
        replacement_list,
        sku_info,
        contract_other_list,
        tips_info,
        contract_detail,
      }: ServiceDetail = payload
      return state
        .set('contract_info', fromJS(contract_info))
        .set('deposit_info', fromJS(deposit_info))
        .set('button_list', fromJS(button_list))
        .set('return_machine_list', fromJS(return_machine_list))
        .set('replacement_list', fromJS(replacement_list))
        .set('sku_info', fromJS(sku_info))
        .set('contract_other_list', fromJS(contract_other_list))
        .set('tips_info', fromJS(tips_info))
        .set('contract_detail', fromJS(contract_detail))
    },
  },
  fromJS(initialReturn),
)

export default serviceDetail

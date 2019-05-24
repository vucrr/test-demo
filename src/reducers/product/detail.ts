import {
  CHANGE_POPUP_MODAL_ID,
  CHANGE_PROPERTY_ITEM,
  CHANGE_PROPERTY_ITEM_DEFAULT_SELECTED,
  CHANGE_VAS_LIST_SELECTED,
  GET_PRODUCT_DETAIL_INFO,
  GET_PRODUCT_PROPERTY,
} from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialDetail: any = {
  idActivity: '',
  baseInfo: {
    imageList: [],
    rentPlan: {},
    discountList: [],
    promotionList: [],
    servicePromise: {},
    rentProcess: {},
    commonQuestionList: [],
    productParam: {},
    detailImageList: [],
    newOrderInfo: [],
    info: {},
  },
  property: {
    popupModalId: 0, // 0： sku选择；1：服务介绍；
    curRent: null, // 当前选中的合约
    hasStock: true, // 当前合约的库存状态
    propertyList: [], // 属性列表
    checkList: {}, // 合法属性列表
    rentList: {}, // 合约列表
    stockDic: {}, // 库存 dic
    info: {}, // 其他展示信息
    selectedList: {}, // 已选中的dic： { pid: id }
  },
}

const detail = handleActions(
  {
    [GET_PRODUCT_DETAIL_INFO](state, { payload }) {
      return state.set('baseInfo', fromJS(payload))
    },
    [CHANGE_POPUP_MODAL_ID](state, { payload: { id } }) {
      return state.setIn(['property', 'popupModalId'], id)
    },
    [GET_PRODUCT_PROPERTY](state, { payload }) {
      const {
        property: { propertyList, checkList, rentList, stockList, vasList, info },
        idActivity,
      } = payload

      // 已选中的dic： { pid: id }
      const selectedList: any = {}

      const stockDic: any = {}

      stockList.forEach((item: any) => {
        stockDic[item.sku_id] = item.quantity
      })

      // 默认选中0元的服务
      vasList.forEach((item: any) => {
        item.selected = parseInt(item.price, 10) === 0
      })

      return state
        .set('idActivity', idActivity)
        .setIn(['property', 'curRent'], null)
        .setIn(['property', 'hasStock'], true)
        .setIn(['property', 'selectedList'], fromJS(selectedList))
        .setIn(['property', 'propertyList'], fromJS(propertyList))
        .setIn(['property', 'checkList'], fromJS(checkList))
        .setIn(['property', 'vasList'], fromJS(vasList))
        .setIn(['property', 'rentList'], fromJS(rentList))
        .setIn(['property', 'stockDic'], fromJS(stockDic))
        .setIn(['property', 'info'], fromJS(info))
    },
    [CHANGE_PROPERTY_ITEM](state, { payload: { pid, id, selected } }) {
      const selectedList = state.getIn(['property', 'selectedList'])
      // 新的选择列表
      const newSelectedList = selected ? selectedList.delete(pid) : selectedList.set(pid, id)
      // 需要改变的属性字典
      const diffPatch = { [pid]: id }

      const newPropertyList = modifyPropertyList(state, newSelectedList, diffPatch)

      const { curRent, hasStock, selectedListKey } = modifyCurRentAndHasStock(state, newSelectedList)

      return state
        .setIn(['property', 'propertyList'], newPropertyList)
        .setIn(['property', 'selectedList'], newSelectedList)
        .setIn(['property', 'selectedListKey'], selectedListKey)
        .setIn(['property', 'curRent'], curRent)
        .setIn(['property', 'hasStock'], hasStock)
    },
    [CHANGE_PROPERTY_ITEM_DEFAULT_SELECTED](state, { payload: { selectedList } }) {
      // 新的选择列表
      let newSelectedList: any = fromJS({})
      // 需要改变的属性字典
      const diffPatch: any = {}

      const selectedListArr = selectedList.split(';')

      for (const keyValue of selectedListArr) {
        const [pid, id] = keyValue.split(':')
        newSelectedList = newSelectedList.set(+pid, +id)
        diffPatch[+pid] = +id
      }

      const newPropertyList = modifyPropertyList(state, newSelectedList, diffPatch)

      const { curRent, hasStock } = modifyCurRentAndHasStock(state, newSelectedList)

      return state
        .setIn(['property', 'propertyList'], newPropertyList)
        .setIn(['property', 'selectedList'], newSelectedList)
        .setIn(['property', 'curRent'], curRent)
        .setIn(['property', 'hasStock'], hasStock)
    },
    [CHANGE_VAS_LIST_SELECTED](state, { payload: { index } }) {
      return state.updateIn(['property', 'vasList', index], (item: any) => {
        const selected = item.get('selected') || false
        return item.set('selected', !selected)
      })
    },
  },
  fromJS(initialDetail),
)

/* modify 数据处理方法 */

// 根据新的diffPatch 生成新的propertyList 并对新的selectedList做检测
function modifyPropertyList(state: any, newSelectedList: any, diffPatch: any) {
  // 所有合法的合约列表
  const checkList = state.getIn(['property', 'checkList'])

  const propertyList = state.getIn(['property', 'propertyList'])

  // 设置默认selected选中状态及默认disabled禁选状态
  return propertyList.map((propertyItem: any) => {
    const valueList = propertyItem.get('value_list')

    // 生成新的valueList
    const pid = propertyItem.get('id')
    const newValueList = valueList.map((item: any) => {
      // 当点击的属性在当前属性列表内，只修改selected选中状态，不影响当前行的disabled状态
      const id = item.get('id')
      if (diffPatch.hasOwnProperty(pid)) {
        const selected = id === diffPatch[pid] ? !item.get('selected') : false
        return item.set('selected', selected)
      }

      // 修改/新增 newSelectedList
      const curSelectedList = newSelectedList.set(pid, id).toJS()
      const canICheck = fromJS(Object.keys(curSelectedList).map((key: string) => `${key}:${curSelectedList[key]}`))
      let disabled = true
      for (const ck of checkList) {
        // 待验证的列表是否为所有合法的合约列表的子集
        if (canICheck.isSubset(ck)) {
          disabled = false
          break
        }
      }
      return item.set('disabled', disabled)
    })

    return propertyItem.set('value_list', newValueList)
  })
}

// 根据新的 selectedList 获取相应合约明细 及 库存状态
function modifyCurRentAndHasStock(state: any, selectedList: any) {
  // 根据sku选择列表中的id计算合约列表中相应的key
  const computeSelectedListKey = (obj: any) => {
    const list = []
    for (const key of Object.keys(obj).sort((a: string, b: string) => parseInt(a, 10) - parseInt(b, 10))) {
      list.push(`${[key]}:${obj[key]}`)
    }
    return list.join(';')
  }

  // 使用计算出的key获取当前相应的合约明细
  const selectedListKey = computeSelectedListKey(selectedList.toJS())
  const curRent = state.getIn(['property', 'rentList', selectedListKey])
  // 有库存判断条件：sku没有全选时 || stockDic 里有对应库存的量
  const hasStock = !curRent || state.getIn(['property', 'stockDic', curRent.get('sku_id').toString()]) > 0
  return {
    curRent,
    hasStock,
    selectedListKey,
  }
}

export default detail

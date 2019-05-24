import { ReceiptInvoiceActions } from 'actions/myAccount/receipt/index'
import { ListView } from 'components'
import Router from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Detail.less'
import Share from './Share'

interface ListProps {
  data: any
  count: number
  fetchList: Function
  current_page: number
  contract_no: any
  email: string
  isAndroidApp: boolean
  isWechat: boolean
}

const RecordList = ({
  data,
  count,
  fetchList,
  current_page,
  contract_no,
  email,
  isAndroidApp,
  isWechat,
}: ListProps) => {
  const Row = (item: any, index: string | number) => {
    const sendEmail = async (recordId: string) => {
      await Router.push({
        pathname: '/myaccount/receipt/send-email',
        query: {
          record_id: recordId,
          email: email,
        },
      })
    }
    const sendPDF = (url: string) => {
      const href = isAndroidApp
        ? 'https://xianghuanji-invoice.oss-cn-hangzhou.aliyuncs.com/pdfjs-2.0.943-dist/web/viewer.html?file=' +
          encodeURIComponent(url)
        : url
      location.href = href
    }
    return (
      <div className={styles.receive} key={index}>
        <h3>
          {item.open_type === 'merge' && <span className={styles.hebing}>合并开票</span>}
          {item.open_type === 'stage' && <span>按期开票</span>}
          {item.invoice_sku}
        </h3>
        <p>发票抬头：{item.invoice_title}</p>
        <p>发票金额：¥{item.invoice_amount}</p>
        <p>开票时间：{item.dt_created}</p>
        {item.invoice_vol && <p>开票期数：{item.invoice_vol}期</p>}
        <p className={styles.btn}>
          <span onClick={() => sendPDF(item.invoice_file)}>查看发票</span>
          <span onClick={() => sendEmail(item.id)}>发到邮箱</span>
          {!isWechat && <Share url={item.invoice_file} />}
        </p>
      </div>
    )
  }

  const viewListProps = {
    dataSource: data,
    hasMore: data.length < count,
    Row,
    className: styles.sb,
    pageSize: 5,
    email: email,
    queryMoreList() {
      const querys = {
        current_page: ++current_page,
        contract_no: contract_no,
      }
      fetchList({ query: querys }, true)
    },
  }
  return <ListView {...viewListProps} />
}
const mapStateToProps = (state: any) => ({
  data: state.getIn(['myAccount', 'receipt', 'invoice', 'data']).toJS(),
  count: state.getIn(['myAccount', 'receipt', 'invoice', 'count']),
  current_page: state.getIn(['myAccount', 'receipt', 'invoice', 'current_page']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(ReceiptInvoiceActions, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordList as any) as React.ReactType

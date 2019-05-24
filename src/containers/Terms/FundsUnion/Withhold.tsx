import React from 'react'
import styles from '../common.less'

const Withhold: React.FunctionComponent<{ info: any }> = ({ info }) => {
  const userInfo = info.get('user_info')
  const accountInfo = info.get('account_info')
  return (
    <div className={styles.container}>
      <p>附件二：委托代扣授权书</p>
      <h2 className={styles.center}>委托代扣授权书</h2>
      <p>
        <b>重要提示：</b>
      </p>
      <p>
        <b>
          为了保障您的合法权益，您应当阅读并遵守本授权书，请您务必审慎阅读、充分理解本授权书条款内容，特别是免除或者减轻众联融资租赁（上海）有限公司（以下简称为“众联租赁”）、
          晋松（上海）网络信息技术有限公司（以下简称“服务方”）（以下合称为“受托人”）责任，或限制您权利的条款，其中免除或者减轻责任条款已经以加粗形式提示您特别关注。
        </b>
      </p>
      <p>
        <b>
          除非您已阅读并同意本授权书所有条款，否则您无权使用融资租赁相关产品服务。您的登录、使用等行为即视为您已阅读并同意接受本授权书条款的约束。
        </b>
      </p>
      <p>
        委托人（承租人）：<span className={styles.fill}>{userInfo.get('user_name')}</span>
      </p>
      <p>
        身份证号码：<span className={styles.fill}>{userInfo.get('user_id_card')}</span>
      </p>
      <p>
        电话：<span className={styles.fill}>{userInfo.get('user_phone')}</span>
      </p>
      <p>
        受托人：
        <span className={styles.fill}>众联租赁（以下简称“众联租赁”）</span>
        <br />
        <span className={styles.fill}>晋松（上海）网络信息技术有限公司（以下简称“服务方”）</span>
      </p>
      <br />
      <p>
        委托人与众联租赁于<span className={styles.fill}>{info.get('year')}</span>年<span className={styles.fill}>
          {info.get('month')}
        </span>月<span className={styles.fill}>{info.get('day')}</span>日签订了合同编号为<span
          className={styles.fill}
        />的《融资租赁合同》。根据该合同的约定，委托人应向众联租赁支付租金。
      </p>
      <p>
        委托人在此特别授权并不可撤销地同意各受托人或受托人合作的清算机构及第三方支付机构均有权从委托人专用账户中，将委托人应付的违约金（若有）、应还利息、应还本金、保险费等款
        项直接扣划至受托人的对应银行账户或受托人开立在第三方支付机构商户号中。
      </p>
      <p>
        <b>委托人专用账户信息如下：</b>
      </p>
      <p>
        开户名：<span className={styles.fill}>{accountInfo.get('user_name')}</span>
      </p>
      <p>
        开户行：<span className={styles.fill}>{accountInfo.get('account_name')}</span>
      </p>
      <p>
        账号：<span className={styles.fill}>{accountInfo.get('account_no')}</span>
      </p>
      <p>
        预留手机号：<span className={styles.fill}>{accountInfo.get('phone')}</span>
      </p>
      <p>
        委托人确保专用账户资料（包括：卡号、姓名、证件号码、预留手机号码等）为您本人持有的真实、完整、准确、合法、有效的银行卡信息，并同意由受托人将以上信息送至发卡银行进行核验。
        委托人确保在应付款项之日，上述专用账户状态正常（即非冻结、销户、挂失等）且余额充足，受托人可实现成功扣款。因委托人专用账户状态不正常或者账户内余额不足导致扣款不成功的，
        由此产生的逾期违约金均由委托人承担。
      </p>
      <p>
        如因第三方支付机构或银行限额、系统故障等原因导致扣款失败，受托人将通知委托人，委托人需在2日内将该笔款项一次性主动划款至对应受托人指定对公账户。因支付清算机构或发卡银
        行原因导致扣款错误或延迟，给您造成损失的，由过错方承担责任，委托扣款方将协助您向其追究相应责任。
      </p>
      <p>
        委托人同意：委托人在各受托人或受托人合作的业务入口申请变更委托人专用账户，经受托人确认变更的，变更后的委托人专用账户委托事项与本授权书中全部委托事项一致。
      </p>
      <p>
        本授权书项下的委托期限自《融资租赁合同》签订日起至委托人在《融资租赁合同》项下约定的各项欠款本息等款项全部偿付完毕之日止。委托人在此特别声明：委托人对于受托人在本授权书
        项下对委托人专用账户中款项的划扣，不提出任何异议。
      </p>
    </div>
  )
}

export default Withhold

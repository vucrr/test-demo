import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Content.less'

const Content = () => {
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>机器出现以下任意一种情况，均不允许还机</p>
      <ul>
        <li className={styles.list}>
          <p className={styles.subtitle}>· 边框背板</p>
          <ul className={styles.listItems}>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard1} />
              <p>缺角</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard2} />
              <p>断裂</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard3} />
              <p>机身弯曲</p>
            </li>
          </ul>
        </li>
        <li className={styles.list}>
          <p className={styles.subtitle}>· 屏幕外观</p>
          <ul className={styles.listItems}>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard4} />
              <p>缺角</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard5} />
              <p>碎裂</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard6} />
              <p>内屏损伤</p>
            </li>
          </ul>
        </li>
        <li className={styles.list}>
          <p className={styles.subtitle}>· 屏幕显示</p>
          <ul className={styles.listItems}>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard7} />
              <p>错乱</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard8} />
              <p>漏液</p>
            </li>
            <li className={styles.listItem}>
              <img src={AssetImage.MyAccount.Return.standard9} />
              <p>无法正常显示</p>
            </li>
          </ul>
        </li>
        <li className={styles.list}>
          <p className={styles.subtitle}>· 其他功能性问题</p>
          <table>
            <tbody>
              <tr>
                <td>充电不正常</td>
                <td>通话功能不正常</td>
              </tr>
              <tr>
                <td>触摸功能不正常</td>
                <td>指纹功能不正常</td>
              </tr>
              <tr>
                <td>无线不正常</td>
                <td>按键功能不正常</td>
              </tr>
              <tr>
                <td>无法正常开机</td>
                <td>指南针功能不正常</td>
              </tr>
              <tr>
                <td>机身进水</td>
                <td>iCloud无法注销</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  )
}

export default Content

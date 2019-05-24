import { selectNewPhone } from 'actions/myTrade/hunanMobile'
import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './List.less'

interface Props {
  list: any
  newNumber: any
  searchValue: any
  changeNewPhone: Function
}

class List extends React.Component<Props, any> {
  handleClick = (value: any) => {
    this.setState({
      selectedValue: value,
    })
    this.props.changeNewPhone(value)
  }

  render() {
    const { list, newNumber, searchValue } = this.props
    return (
      <ul className={styles.list}>
        {list.map((value: any, index: number) => {
          let valueItem
          if (searchValue) {
            valueItem = value.replace(new RegExp(searchValue, 'g'), '<i>' + searchValue + '</i>')
          } else {
            valueItem = value
          }
          return (
            <li
              className={classnames(styles.item, newNumber === value && styles.active)}
              key={index}
              onClick={() => this.handleClick(value)}
              dangerouslySetInnerHTML={{ __html: valueItem }}
            />
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state: any) => ({
  newNumber: state.getIn(['myTrade', 'hunanMobile', 'phone']),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeNewPhone: bindActionCreators(selectNewPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

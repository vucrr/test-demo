import { GetInitialPropsContext } from '@@types/next'
import { fetchInfo } from 'actions/product/brands'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import Top from './Top'

export interface Query {
  brand_id: string
  tag_id?: string
}

export interface BrandsProps extends ErrorObject {
  brands: any
  query: Query
}

class Brands extends React.Component<BrandsProps> {
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    const data = await store.dispatch(fetchInfo({ query, req }))
    if (data.status) {
      return { error: data }
    }
  }

  render() {
    const { error, query, brands } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headTop = brands.get('headTop')

    const headerProps = {
      hidden: true,
      backTop: true,
    }

    const containerProps = {
      renderHeader: (
        <Header mode="light" {...headerProps}>
          {brands.getIn(['headTop', 'title'])}
        </Header>
      ),
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <Top headImage={headTop.get('head_image')} auth={headTop.get('auth')} descList={headTop.get('auth_desc')} />
        <List query={query} tags={headTop.get('tag_list')} products={brands.get('products')} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  brands: state.getIn(['product', 'brands']),
})

export default connect(mapStateToProps)(Brands)

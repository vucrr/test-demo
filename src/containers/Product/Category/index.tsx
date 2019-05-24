import * as categoryActions from 'actions/product/category'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import selector from '../../../selectors/product/category'
import BrandTabs from './BrandTabs'
import CategoryTabs from './CategoryTabs'
import OrderTips from './OrderTips'
import Products from './Products'

interface CategoryProps extends ErrorObject {
  query: {
    tag_id?: string
    brand_id?: string
  }
  category: any
  selectedBrandId: number
  products: any
  onDetailActions: any
}

class Category extends React.Component<CategoryProps> {
  static defaultProps = {
    query: {},
  }

  static getInitialProps = async ({ store, query, req }: any) => {
    const data = await store.dispatch(categoryActions.fetchInfo({ query, req }))
    if (data.status) {
      return { error: data }
    }
    return { query }
  }

  render() {
    const { error, query, category, products, onDetailActions } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header hidden={true}>分类</Header>,
      renderTabBar: <TabBar selectedTab="product" />,
      fixedTabBar: true,
    }

    return (
      <Container {...containerProps}>
        <CategoryTabs brand={category.get('brand')} list={category.get('tag_list')} tag={query.tag_id} />
        <BrandTabs
          tag={query.tag_id}
          list={category.get('brand_list')}
          brand={query.brand_id || '0'}
          onChangeBrand={onDetailActions.changeBrandId}
        />
        <Products advert={category.get('category_ad')} products={products} />
        <OrderTips />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onDetailActions: bindActionCreators(categoryActions, dispatch),
})

export default connect(
  selector,
  mapDispatchToProps,
)(Category)

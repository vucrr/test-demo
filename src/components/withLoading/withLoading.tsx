import { Loading } from 'components'
import React from 'react'
import { Subtract } from 'utility-types'
import { delayHandle } from 'utils/tools'

function getDisplayName<T>(UnwrappedComponent: React.ComponentType<T>) {
  return UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component'
}

interface WithLoadingProps {
  loading: boolean
  setLoading: (disabled: boolean) => void
  setAsyncLoading: (disabled: boolean) => void
}

interface WithLoadingState {
  loading: boolean
}

function withLoading<T extends WithLoadingProps>(UnwrappedComponent: React.ComponentType<T>) {
  class WithLoading extends React.Component<Subtract<T, WithLoadingProps>, WithLoadingState> {
    readonly state: Readonly<WithLoadingState> = {
      loading: true,
    }
    displayName = `HocWithLoading(${getDisplayName(UnwrappedComponent)})`

    isCancelled = false

    async componentDidMount() {
      this.setState({ loading: false })
    }

    componentWillUnmount() {
      this.setState({ loading: false })
      this.isCancelled = true
    }

    render() {
      const ownProps: WithLoadingProps = {
        loading: this.state.loading,
        setLoading: (loading: boolean) => {
          !this.isCancelled && this.setState({ loading })
        },
        setAsyncLoading: async (loading: boolean) => {
          await delayHandle(0)
          !this.isCancelled && this.setState({ loading })
        },
      }
      return (
        <>
          {/*https://github.com/Microsoft/TypeScript/issues/28938*/}
          <UnwrappedComponent {...ownProps} {...this.props as T} />
          <Loading loading={this.state.loading} />
        </>
      )
    }
  }

  return WithLoading
}

export default withLoading

import withLoading from './withLoading'

export type withLoadingProps = {
  loading: boolean
  setLoading: (disabled: boolean) => void
  setAsyncLoading: (disabled: boolean) => void
}

export default withLoading

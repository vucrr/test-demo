import withSource, { SourceProps } from '../withSource'

const BrandText = ({ utm }: SourceProps) => utm.get('brand')

export default withSource<{}>(BrandText)

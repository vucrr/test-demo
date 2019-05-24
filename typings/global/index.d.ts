declare module '*.less' {
  const styles: any
  export default styles
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  jsObj: any
  webkit: any
  AMap: any
  [index: string]: any
  chooseResult(stringkey: string, stringjson: string): void
}

declare type AccordionProps = Partial<{
  activeKey: string | string[]
  onAccordionChange: (x: any) => void
  children: any
  utm: any
}>

declare let NTKF: any
declare let _paq: any
declare let AlipayJSBridge: any
declare let AMap: any
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

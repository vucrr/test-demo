declare module 'rc-form' {
  import React from 'react'
  function createFormField(field): any
  function createForm(option = {}): (Component) => React.ComponentType<any> | React.FunctionComponent<any>
}

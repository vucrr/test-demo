import React from 'react'

const AccordionList = ({ children, activeKey, onAccordionChange }: AccordionProps) => {
  return (
    <>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          activeKey,
          onAccordionChange,
        })
      })}
    </>
  )
}

export default AccordionList

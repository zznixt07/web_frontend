import React, { SVGProps } from 'react'

export function FeatherCompass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16.24 7.76l-2.12 6.36l-6.36 2.12l2.12-6.36l6.36-2.12z"></path></g></svg>
  )
}
export default FeatherCompass
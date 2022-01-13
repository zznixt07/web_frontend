import React, { SVGProps } from 'react'

export function FeatherMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"></path><path d="M3 6h18"></path><path d="M3 18h18"></path></g></svg>
  )
}
export default FeatherMenu
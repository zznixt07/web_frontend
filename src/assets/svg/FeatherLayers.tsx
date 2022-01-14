import React, { SVGProps } from 'react'

export function FeatherLayers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5l10-5l-10-5z"></path><path d="M2 17l10 5l10-5"></path><path d="M2 12l10 5l10-5"></path></g></svg>
  )
}
export default FeatherLayers
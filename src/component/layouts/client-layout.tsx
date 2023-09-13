import React from 'react'

export default function ClientLayoutComponent({ children }: { children: React.ReactNode; }) {
  
  return ( 
  <>
    <div style={{width: '100vw' ,minHeight: '72px', background: '#fff'}}/>
      { children }
  </>
  )
}

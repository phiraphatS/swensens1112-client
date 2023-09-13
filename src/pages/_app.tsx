import ClientLayoutComponent from '@/component/layouts/client-layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ClientLayoutComponent>
      <Component {...pageProps} />
    </ClientLayoutComponent>
  )
}

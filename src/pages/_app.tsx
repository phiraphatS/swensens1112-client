import ClientLayoutComponent from '@/component/layouts/client-layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
       <title>Swensens App</title>
      </Head>
      <ClientLayoutComponent>
        <Component {...pageProps} />
      </ClientLayoutComponent>
    </>
  )
}

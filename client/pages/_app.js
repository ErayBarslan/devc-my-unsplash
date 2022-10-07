import Head from 'next/head'
import { GlobalStyles } from '../styles/Global'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Unsplash | DevC</title>
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
}

export default MyApp
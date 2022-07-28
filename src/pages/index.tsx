import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/App/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Coding Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Coding Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header />
      <h1>Deneckere Blog</h1>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '@/components/App/Header'
import Hero from '@/components/App/Hero'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Coding Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
    </div>
  )
}

export default Home

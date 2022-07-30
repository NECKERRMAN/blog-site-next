import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '@/components/App/Header'
import Hero from '@/components/App/Hero'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from 'typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
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

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
    }, 
   description,
   mainImage,
   slug
  }`;

  const posts = await sanityClient.fetch(query)


}
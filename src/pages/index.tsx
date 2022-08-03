import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/App/Header";
import Hero from "@/components/App/Hero";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "typings";
import Link from "next/link";

interface Props {
    posts: [Post];
}

export default function Home({ posts }: Props) {
    return (
        <>
            <Head>
                <title>Coding Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Hero />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
                {posts.map((post) => (
                    <Link key={post._id} href={`/post/${post.slug.current}`}>
                        <div className="cursor-pointer group border overflow-hidden rounded-lg">
                            <img
                                className="w-full object-cover h-60 group-hover:scale-105 transistion-transform duration-200 ease-in-out"
                                src={urlFor(post.mainImage).url()}
                                alt={post._id}
                            />
                            <div className="flex justify-between p-5 bg-white">
                                <div>
                                    <p className="font-bold">{post.title}</p>
                                    <p className="text-xs">
                                        {post.description} by{" "}
                                        <span className="underline font-bold">
                                            {post.author.name}
                                        </span>
                                    </p>
                                </div>

                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={urlFor(post.author.image).url()}
                                    alt={post.author.name}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
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

    const posts = await sanityClient.fetch(query);

    return {
        props: {
            posts,
        },
    };
};

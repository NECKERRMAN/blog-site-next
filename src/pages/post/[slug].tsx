import formatDate from '@/core/utils/formatDate';
import { GetStaticProps } from 'next'
import { Post } from 'typings'
import { sanityClient, urlFor } from '../../../sanity'
import Header from '../../components/App/Header';
import PortableText from 'react-portable-text'
import Form from '@/components/App/Form';

interface Props {
    post: Post
}

function Post({ post }: Props) {
    return (
    <main>
        <Header />

        {/* <img className='w-full h-20 object-cover' src={urlFor(post.mainImage).url()} alt={post.title} /> */}
        <article className='max-w-3xl mx-auto p-5 pt-0'>
          <div className="mb-3">
            <h1 className='text-3xl mt-10 mb-1'>{ post.title }</h1>
            <p className='text-xs mb-3'>By <span className="underline">{ post.author.name }</span>, posted on { formatDate(post._createdAt)}</p>
            <h2 className='text-xl font-light text-gray-500'>{ post.description }</h2>
          </div>
          <div className='mb-8'>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h2 className="my-5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc" {...children}></li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
                p: ({children}: any) => (
                  <p className='mb-2'>{ children }</p>
                ),
                figure: ({children}: any) => (
                  <figure className='my-2'>{ children }</figure>
                ),
              }}
            />
          </div>
          <div className="p-5 bg-blue-400 text-white">
            <h3 className='font-bold mb-2 text-xl'>{ post.author.name }</h3>
            <div className="flex flex-row gap-4 items-start">

                <img className='w-20 h-20 rounded-full object-cover mr-4' src={urlFor(post.author.image).url()} alt={post.author.name} />
              <div className='border-l pl-4'>
                <PortableText
                   dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                   projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                   content={post.author.bio}
                  />
              </div>
            </div>
          </div>
        </article>
        <Form post={post} />
    </main>
    )
}

export default Post

export const getStaticPaths = async () => {
  // Fetch only id, slug and image
  const query = `*[_type == "post"]{
        _id,
        slug {
            current
        },
        mainImage
    }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Query to fetch all post details
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        author -> {
            name,
            image,
            bio
        },
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
        description,
        mainImage,
        slug,
        body,
        _createdAt
    }`
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  //  Return 404 page
  // TODO: create adequate 404
  if (!post) {
    return {
      notFound: true,
    }
  }

  // Retutn post
  return {
    props: {
      post,
    },
    // Cache gets updated after 1h 60 * 60sec
    revalidate: 3600,
  }
}
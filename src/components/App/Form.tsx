import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Post } from 'typings'

interface Props {
    post: Post
  }

interface IFormInput {
    _id: string
    name: string
    email: string
    comment: string
  }
  
const Form = ({ post }: Props) => {
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
        })
        .then(() => {
            setSubmitted(true)
        })
        .catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    }

  return (
    submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col items-center rounded-xl bg-blue-500 py-10 text-white">
          <h3 className="font-serif text-3xl font-bold">
            Thank you for submitting your comment
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-blue-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block ">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
              placeholder="Saul Goodman"
              type="text"
            ></input>
          </label>
          <label className="mb-5 block ">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
              placeholder="saul@lwyrup.com"
              type="email"
            ></input>
          </label>
          <label className="mb-5 block ">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
              placeholder="An interesting comment..."
              rows={6}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email Field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                - The Comment Field is required
              </span>
            )}
          </div>

          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold text-white shadow hover:opacity-80 focus:outline-none"
          />
        </form>
      )
  )
}

export default Form
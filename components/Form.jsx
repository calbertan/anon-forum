import { useState } from 'react'
import Link from 'next/link'


const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  const [checked, setChecked] = useState(true)

  console.log(post.anon)

  const setAnon = () => {
    setChecked(!checked)
    setPost({...post, anon: checked})
    console.log(checked)
  } 
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Takes</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} your innermost, unhinged takes anonymously or proudly owned.
      </p>
      
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Takes
          </span>
          <textarea
            value={post.take}
            onChange={(e) => setPost({...post, take: e.target.value})}
            placeholder="Write your takes here..."
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className='font-normal'>(#general, #food, #programming)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder="#general"
            required
            className='form_input'
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 mt-3">
            Post Anonymously
          </span>
          
          {/* https://stackoverflow.com/questions/43476729/react-checkbox-does-not-update */}
          <input
            type='checkbox'
            value={ checked }
            onChange={ setAnon }
            key={Math.random()}
            defaultChecked={ post.anon }
            className='ml-1'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `$type...` : type}
          </button>
        </div>
      </form>
      
    </section>
  )
}

export default Form
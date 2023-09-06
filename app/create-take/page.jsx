'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreateTake = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    take: '',
    tag: '',
    anon: false
  })

  const createTake = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    try{
      const response = await fetch('/api/takes/new',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          take: post.take,
          tag: post.tag,
          anon: post.anon
        })
      })

      if(response.ok) {
        router.push('/')
      }
    }catch(error){
      console.log(error)
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Post"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTake}  
    />
  )
}

export default CreateTake
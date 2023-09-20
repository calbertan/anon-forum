'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams} from 'next/navigation'

import Form from '@components/Form'

const EditTake = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const takeId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    take: '',
    tag: '',
    anon: false
  })

  useEffect(() => {
    const getTakeDetails = async () =>{
      const response = await fetch(`/api/takes/${takeId}`)
      const data = await response.json()

      setPost({
        take: data.take,
        tag: data.tag,
        anon: data.anon,
      })
    }

    if(takeId) getTakeDetails()
  }, [takeId])

  const editTake = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!takeId) return alert("Take ID not found")

    try{
      const response = await fetch(`/api/takes/${takeId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editTake}  
    />
  )
}

export default EditTake
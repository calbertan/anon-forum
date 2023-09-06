'use client'

import {useState, useEffect} from 'react'
import TakeCard from './TakeCard'

const TakeCardList = ({ data, handleTagClick }) => {
  console.log(data)
  return (
    <div className='mt-16 take_layout'>
      {data.map((post) => (
        <TakeCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
} 

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/takes')
      const data = await response.json()
      
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <TakeCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
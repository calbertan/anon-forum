'use client'

import {useState, useEffect} from 'react'
import TakeCard from './TakeCard'

const TakeCardList = ({ data, handleTagClick }) => {
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
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterTakes = (searchtext) => {
    // 'i' flag for case-insensitive search
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) => 
        regex.test(item.creator.username) && !item.anon ||
        regex.test(item.tag) ||
        regex.test(item.take)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTakes(e.target.value)
        setSearchedResults(searchResult)
      })
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterTakes(tagName)
    setSearchedResults(searchResult)
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/takes')
    const data = await response.json()

    console.log(data)
    
    setPosts(data)

    console.log(data)
  }

  useEffect(() => {
    fetchPosts()
    console.log("fetched posts")
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

      { searchText ? (
        <TakeCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ):(
        <TakeCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed
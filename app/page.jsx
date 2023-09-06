import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Share & Unearth
        {/* <br className="max-md:hidden"/> */}
        <br></br>
        <span className="orange_gradient text-center"> 
          Unhinged Takes
        </span>
      </h1>
      <p className="desc text-center">
        Share your innermost, unhinged takes anonymously 
        or proudly owned.
      </p>

      <Feed/>
    </section>
  )
}

export default Home
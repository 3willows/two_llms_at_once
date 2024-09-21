import { createPost } from "./createPost"

const Home = async () => {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <form action={createPost} className="flex flex-col gap-y-2">
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Home

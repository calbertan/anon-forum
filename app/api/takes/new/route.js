import { connectToDB } from "@utils/database"
import Take from "@models/take"

export const POST = async (req) => {
  const { userId, take, tag, anon } = await req.json()

  try{
    await connectToDB()
    const newTake = new Take({
      creator: userId,
      take,
      tag,
      anon
    })

    await newTake.save()
    return new Response(JSON.stringify(newTake), {status: 201})

  } catch(error){
    console.log(error)
  }
  
}
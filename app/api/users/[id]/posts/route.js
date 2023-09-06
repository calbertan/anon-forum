import { connectToDB } from "@utils/database"
import Take from "@models/take"

export const GET = async (req, { params }) => {
  try{
    await connectToDB()

    const takes = await Take.find({
      creator: params.id
    }).populate('creator')

    return new Response(JSON.stringify(takes), {status: 200})

  } catch(error){
    return new Response("Failed to fetch Takes", {status: 500})
  }
  
}
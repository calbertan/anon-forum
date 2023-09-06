import { connectToDB } from "@utils/database"
import Take from "@models/take"
import { connect } from "mongoose"

// GET (READ)
export const GET = async (req, { params }) => {
  try{
    await connectToDB()

    const take = await Take.findById(params.id).populate('creator')

    if (!take) return new Response("Take not found", {status: 404})

    return new Response(JSON.stringify(take), {status: 200})
  } catch(error){
    return new Response("Failed to fetch Takes", {status: 500})
  }
  
}

// PATCH (UPDATE)
export const PATCH = async (req, { params }) => {
  const { take, tag, anon } = await req.json()
  try{
    await connectToDB()

    const existingTake = await Take.findById(params.id)

    if (!existingTake) return new Response("Take not found", {status: 404})

    existingTake.take = take
    existingTake.tag = tag
    existingTake.anon = anon

    await existingTake.save()

    return new Response("Successfully updated Takes", {status: 200})
  } catch(error){
    return new Response("Failed to edit Take", {status: 500})
  }
}

// DELETE
export const DELETE = async (req, { params }) => {
  try{
    await connectToDB()

    await Take.findByIdAndRemove(params.id)

    return newResponse("Take deleted", {status: 200})
  }catch{
    return new Response("Failed to delete Take", {status: 500})
  }
}
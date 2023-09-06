import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String
  }
})

// backend is not always running, so you need extra check for if "User" exists or not
// models keeps reloading, so this check is required
const User = models.User || model("User", UserSchema)

export default User
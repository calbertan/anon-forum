import { Schema, model, models } from 'mongoose'

const TakeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  take: {
    type: String,
    require: [true, "Take is required"]
  },
  tag: {
    type: String,
    required: [true, 'Tag is required']
  },
  anon:{
    type: Boolean
  }
})

const Take = models.Take || model('Take', TakeSchema)
export default Take
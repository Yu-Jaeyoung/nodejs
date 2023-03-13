import mongoose, {Schema} from "mongoose";

const {Types: {ObjectId}} = Schema;
const chatSchema = new Schema({
  room: {
    type: ObjectId,
    required: true,
    ref: "Room",
  },
  user: {
    type: String,
    required: true,
  },
  chat: String,
  gif: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Chat", chatSchema);
export default model;
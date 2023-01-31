/*const mongoose = require('mongoose');*/
import mongoose from "mongoose";


const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*module.exports = mongoose.model('Comment', commentSchema);*/
export default mongoose.model('Comment', commentSchema);
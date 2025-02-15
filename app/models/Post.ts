import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  recipe: {
    name: String,
    ingredients: [String],
    instructions: [String],
    additionalIngredients: [String],
    preparationTime: String,
    difficultyLevel: String,
    healthNotes: String,
    allergyNotes: String
  },
  image: String,
  author: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    text: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema); 
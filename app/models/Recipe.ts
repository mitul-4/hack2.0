import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    name: String,
    quantity: Number,
    unit: String
  }],
  instructions: [String],
  healthInfo: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  cookingTime: Number,
  shares: [{
    platform: String,
    message: String,
    likes: { type: Number, default: 0 },
    sharedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Create indexes for efficient queries
RecipeSchema.index({ userId: 1, name: 1 });
RecipeSchema.index({ userId: 1, difficulty: 1 });
RecipeSchema.index({ 'shares.platform': 1 });

export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema); 
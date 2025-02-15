import mongoose from 'mongoose';

const InventoryItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  barcode: String,
  expiryDate: Date
}, {
  timestamps: true
});

// Create compound index for efficient queries
InventoryItemSchema.index({ userId: 1, name: 1 });

export const InventoryItem = mongoose.models.InventoryItem || mongoose.model('InventoryItem', InventoryItemSchema); 